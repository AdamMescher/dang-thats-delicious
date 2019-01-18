const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: '📛 Please enter a restaurant name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: '⛔ You must supply coordinates!'
        }],
        address: {
            type: String,
            required: '⛔ You must supply an address!'
        }
    },
    photo: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: '✍️ You must supply an author!'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

storeSchema.index({
    name: 'text',
    description: 'text'
})

storeSchema.index({ location: '2dsphere' });

storeSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storeWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (storeWithSlug.length) {
        this.slug = `${this.slug}-${storeWithSlug.length + 1}`;
    }
    next();
})

storeSchema.statics.getTagsList = function() {
    return this.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } }},
        { $sort: { count: -1 }}
    ]);
}

storeSchema.statics.getTopStores = function() {
    return this.aggregate([
        // Lookup Stores and populate their reviews
        { $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'store',
                as: 'reviews'
            }
        },
        // Filter for only items that have 2 or more reviews
        { $match: { 'reviews.1': { $exists: true }}},
        // Add the average reviews field
        { $project: {
            photo: '$$ROOT.photo',
            name: '$$ROOT.name',
            reviews: '$$ROOT.reviews',
            slug: '$$ROOT.slug',
            averageRating: { $avg: '$reviews.rating' }
        }},
        // Sort by new avg reviews field
        { $sort: { averageRating: -1 }},
        // Limit to 10 at most
        { $limit: 10 }
    ]);
}

storeSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'store'
});

function autoPopulate(next) {
    this.populate('reviews');
    next();
}

storeSchema.pre('find', autoPopulate);
storeSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Store', storeSchema);

const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const Store = mongoose.model('Store');
const User = mongoose.model('User');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(request, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        isPhoto ? next(null, true) : next ({message: 'That file type is not accepted'}, false);
    }
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (request, response, next) => {
    if (!request.file) {
        next();
        return;
    }
    const extension = request.file.mimetype.split('/')[1];
    request.body.photo = `${uuid.v4()}.${extension}`;
    const photo = await jimp.read(request.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${request.body.photo}`);
    next();
}

exports.homePage = (request, response) => {
    response.render('index');
}

exports.addStore = (request, response) => {
    response.render('editStore', { title: '➕ Add Restaurant' });
}

exports.createStore = async (request, response) => {
    request.body.author = request.user._id;
    const store = await (new Store(request.body)).save();
    request.flash('success', `✔️ Successfully created ${store.name}. Care to leave a review?`);
    response.redirect(`/store/${store.slug}`);
}

exports.getStoreBySlug = async (request, response) => {
    const store = await Store.findOne({ slug: request.params.slug }).populate('author');
    if (!store) {
        next();
        return;
    }
    response.render('store', {store, title: store.name})
}

exports.getStores = async (request, response) => {
    const stores = await Store.find();
    response.render('stores', { title: '🥡 Restaurants', stores });
}

const confirmOwner = (store, user) => {
    if (!store.author.equals(user._id)) {
        throw Error('❌ You must own a store in order to edit it');
    }
}

exports.editStore = async (request, response) => {
    const store = await Store.findOne({ _id: request.params.id });
    confirmOwner(store, request.user);
    response.render('editStore', { title: `✏️ Edit ${store.name}`, store });
}

exports.updateStore = async (request, response) => {
    request.body.location.type = 'Point';
    const store = await Store.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true}).exec();
    request.flash('success', `✔️ Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
    response.redirect(`/stores/${store._id}/edit`);
}

exports.getStoresByTag = async (request, response) => {
    const tag = request.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({ tags: tagQuery })
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
    response.render('tag', { tags, title: '🔖Tags', tag, stores });
}

exports.searchStores = async (request, response) => {
    const stores = await Store
        .find({
            $text: {
                $search: request.query.q
            }
        },
        { score: { $meta: 'textScore' }})
        .sort({
            score: { $meta: 'textScore' }
        })
        .limit(5);
        response.json(stores);
}

exports.mapStores = async (request, response) => {
    const coordinates = [request.query.lng, request.query.lat].map(parseFloat);
    const q = {
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates
                },
                $maxDistance: 10000
            }
        }
    }
    const stores = await Store
        .find(q)
        .select('slug name description location photo')
        .limit(10);
    response.json(stores)
}

exports.mapPage = (request, response) => {
    response.render('map', { title: '🗺️ Map' });
}

exports.heartStore = async (request, response) => {
    const hearts = request.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(request.params.id) ? '$pull' : '$addToSet';
    const user = await User
        .findByIdAndUpdate(request.user._id,
            { [operator]: { hearts: request.params.id }},
            { new: true }
        );
    response.json(user);
}

exports.getHearts = async (request, response) => {
    if (!user) return
    const stores = await Store.find({
        _id: { $in: request.user.hearts }
    });
    response.render('stores', { title: '🧡 Your Favorites', stores });
}
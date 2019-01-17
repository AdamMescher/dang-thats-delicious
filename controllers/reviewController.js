const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (request, response) => {
    request.body.author = request.user._id;
    request.body.store = request.params.id;
    const newReview = new Review(request.body);
    await newReview.save();
    request.flash('success', '✔️💾 Review Saved!');
    response.redirect('back');
}
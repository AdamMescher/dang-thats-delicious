const mongoose = require('mongoose');

// Reference to Store.js Schema. Available via module.exports of Store.js
const Store = mongoose.model('Store');

exports.homePage = (request, response) => {
    request.flash('error', 'Something Happened!')
    request.flash('info', 'Something Happened!')
    request.flash('warning', 'Something Happened!')
    request.flash('success', 'Something Happened!')
    response.render('index');
}

exports.addStore = (request, response) => {
    response.render('editStore', { title: 'Add Store' });
}

exports.createStore = async (request, response) => {
    const store = await (new Store(request.body)).save();
    request.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
    response.redirect(`/store/${store.slug}`);
}
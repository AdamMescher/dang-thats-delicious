const mongoose = require('mongoose');

// Reference to Store.js Schema. Available via module.exports of Store.js
const Store = mongoose.model('Store');

exports.homePage = (request, response) => {
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

exports.getStores = async (request, response) => {
    // 1. query database for a list of all stores
    const stores = await Store.find();
    console.log(stores);
    response.render('stores', {
        title: 'Stores',
        stores
     });
}
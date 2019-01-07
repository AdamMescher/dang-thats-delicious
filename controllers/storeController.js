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
    response.render('stores', { title: 'Stores', stores });
}

exports.editStore = async (request, response) => {
    const store = await Store.findOne({ _id: request.params.id });
    response.render('editStore', { title: `Edit ${store.name}`, store });
    // response.render('editStore', {title: `Edit ${store.name}`, store});
}

exports.updateStore = async (request, response) => {
    // .findOneAndUpdate(query, data, options)
    const store = await Store.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true}).exec();
    response.json(store)
    // request.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`)
    // response.redirect(`/stores/${store._id}/edit`);
}
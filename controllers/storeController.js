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
    const store = new Store(request.body);
    await store.save();
    response.redirect('/');
}
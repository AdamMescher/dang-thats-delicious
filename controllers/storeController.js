const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

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
    response.render('editStore', { title: 'Add Store' });
}

exports.createStore = async (request, response) => {
    const store = await (new Store(request.body)).save();
    request.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
    response.redirect(`/store/${store.slug}`);
}

exports.getStoreBySlug = async (request, response) => {
    const store = await Store.findOne({ slug: request.params.slug });
    if (!store) return next();
    response.render('store', {store, title: store.name})
    response.redirect(`store/${store.slug}`)
}

exports.getStores = async (request, response) => {
    const stores = await Store.find();
    response.render('stores', { title: 'Stores', stores });
}

exports.editStore = async (request, response) => {
    const store = await Store.findOne({ _id: request.params.id });
    response.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.updateStore = async (request, response) => {
    request.body.location.type = 'Point';
    const store = await Store.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true}).exec();
    request.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
    response.redirect(`/stores/${store._id}/edit`);
}
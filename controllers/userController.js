const mongoose = require('mongoose');

exports.login = (request, response) => {
    response.render('login', {title: 'Login'});
}
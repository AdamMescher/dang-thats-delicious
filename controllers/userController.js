const mongoose = require('mongoose');

exports.login = (request, response) => {
    response.render('login', {title: 'Login'});
};

exports.register = (request, response) => {
    response.render('register', {title: 'Register'});
};

exports.validateRegister = (request, response, next) => {
    request.checkBody('name', 'You must supply a name!').notEmpty();
    request.sanitizeBody('name');
    request.checkBody('email', 'That email address is not valid!').notEmpty().isEmail();
    request.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    request.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    request.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    request.checkBody('password-confirm', 'Oops! Your Passwords do not match!').equals(request.body.password);

    const errors = request.validationErrors();

    if (errors) {
        request.flash('error', errors.map(err => err.msg));
        response.render('register', {
            title: 'Register',
            body: request.body,
            flashes: request.flash()
        });
        return;
    };
    next();
};


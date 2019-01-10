const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: '🔓 You are now logged in! '
});

exports.logout = (request, response) => {
    request.logout();
    request.flash('success', 'You are now logged out! 👋');
    response.redirect('/');
}

exports.isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
        return;
    }
    request.flash('error', 'Oops! 😬 You must be logged in to do that!');
    response.redirect('/login');
}
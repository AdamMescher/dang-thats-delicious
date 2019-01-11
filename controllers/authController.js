const mongoose = require('mongoose');
const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: '🔓 You are now logged in! '
});

exports.logout = (request, response) => {
    request.logout();
    request.flash('success', '👋 You are now logged out!');
    response.redirect('/');
}

exports.isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
        return;
    }
    request.flash('error', '😬 Oops!  You must be logged in to do that!');
    response.redirect('/login');
}

exports.forgot = async (request, response) =>{
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
        request.flash('error', '⛔ No account with that email address exists!');
        response.redirect('/login');
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordTokenExpires = Date.now() + 360000;
    await user.save();
    const resetURL = `http://${request.headers.host}/account/reset/${user.resetPasswordToken}`;
    request.flash('success', `📮 You have been emailed a password reset link. ${resetURL}`);
    response.redirect('/login');
}

exports.reset = async (request, response) => {
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        request.flash('error', '⛔ Password is invalid or has expired.');
        return response.redirect('/login');
    }

    response.render('reset', {title: 'Reset Password'})
}

exports.confirmedPasswords = (request, response, next) => {
    if (request.body.password === request.body['password-confirm']) {
        next();
        return;
    }
    request.flash('error', '⛔ Passwords do not match!');
    response.redirect('back');
}

exports.update = async (request, response) => {
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        request.flash('error', '⛔ Password is invalid or has expired.');
        return response.redirect('/login');
    }

    const setPassword = promisify(user.setPassword, user);
    await setPassword(request.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    const updatedUser = await user.save();
    await request.login(updatedUser);
    request.flash('success', '💃 Nice! Your password has been reset! You are now logged in!');
    return response.redirect('/');
}
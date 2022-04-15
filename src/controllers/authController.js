const { validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
require('../config/passport_local')(passport);

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors);
    }else{
        const user = await User.create({ email: req.body.email, username: req.body.username, name: req.body.name, password: req.body.password });
        res.json("Kayıt başarılı, lütfen giriş yapınız.");
    }
}

const login = (req, res, next) => {
    try {
        passport.authenticate('local', {
            badRequestMessage: 'Lütfen gerekli alanları doldurunuz',
            failureFlash: true,
        })(req, res, next);
    } catch (error) {
        res.json(error)
    }
}

const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((erroy) => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    })
}

const check_auth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.json({
            "is_authenticated": true,
            "user": req.user
        });
    }else{
        res.json({
            "is_authenticated": false,
            "user": null
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    check_auth
}
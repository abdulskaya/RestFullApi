const {body, checkSchema, validationResult} = require('express-validator');
const User = require('../models/user');

const register_schema = {
    name: {
        trim: true,
        notEmpty: true,
        errorMessage: "İsim alanı gerekli",
    },
    username: {
        trim: true,
        custom: {
            options: async (value) => {
                if(value == '')  return Promise.reject('Kullanıcı adı alanı gerekli')
                if(value.length < 4)  return Promise.reject('Kullanıcı adı 4 karakterden küçük olamaz')
                await User.findAll({
                    where: { 
                        username: value
                    }
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Kullanıcı adı zaten kayıtlı')
                    }
                    return true
                })
            }
        },
    },
    password: {
        trim: true,
        custom: {
            options: (value) => {
                if(value == '')  return Promise.reject('Şifre alanı gerekli');
                else if(value.length < 8)  return Promise.reject('Şifre 8 karakterden küçük olamaz');
                return true
            }
        }
    },
    password_verification: {
        trim: true,
        custom: {
            options: (value, { req }) => {
                if(value == '')  return Promise.reject('Şifre onaylama alanı gerekli');
                else if(req.body.password != value)  return Promise.reject('Şifreler uyuşmuyor');
                else return true
            }
        }
        
    },
    email: {
        trim: true,
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: "Email alanı gerekli",
        custom: {
            options: async (value) => {
                return await User.findAll({
                    where: { 
                        email: value
                    }
                }).then(user => {
                    if (user.length > 0 && value != '@') {
                        return Promise.reject('E-Mail zaten kayıtlı');
                    }else return true
                })
            }
        }
    }
    
}

const create_post_schema = {
    post_title: {
        trim: true,
        custom: {
            options: (value, { req }) => {
                if(value == '')  return Promise.reject('Başlık alanı gerekli.');
                if(value.length < 5)  return Promise.reject('Başlık 5 karakterden kücük olmaz.');
                else return true
            }
        }
    },
    post_face: {
        custom: {
            options: (value, { req }) => {
                if(value == '')  return Promise.reject('Gönderi resmi alanı gerekli.');
                return true
            }
        }
    },
    content: {
        trim: true,
        custom: {
            options: (value, { req }) => {
                if(value == '')  return Promise.reject('İçerik alanı gerekli.');
                return true
            }
        }
    },
    read_time: {
        custom: {
            options: (value, { req }) => {
                if(value == null)  return Promise.reject('Okuma süresi alanı gerekli.');
                return true
            }
        }
    },
    categories: {
        custom: {
            options: (value, { req }) => {
                if(value == null)  return Promise.reject('Kategori alanı gerekli.');
                return true
            }
        }
    }
}


module.exports = {
    register_schema,
    create_post_schema
}
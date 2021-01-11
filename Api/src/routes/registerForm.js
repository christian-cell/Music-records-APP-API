const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middelwares/authentication');
const RegisterForm = require('../models/RegisterForm');
const registerFormRouter = express.Router();
const fs = require('fs-extra');
const cloudinary = require('cloudinary').v2;

let multer = require('multer');

const VALID_FILE_TYPE = ['image/jpg', 'image/png', 'image/jpeg'];
const IMAGES_URL_BASE = "/ProfileImages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const fileFilter = (req, file, cb) => {
    console.log(file);
    if (!VALID_FILE_TYPE.includes(file.mimetype)) {
        cb(new Error('Invalid type of file'))
    } else {
        cb(null, true)
    }
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public' + IMAGES_URL_BASE)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage, fileFilter: fileFilter });

/////////////////////////////////login route///////////////////////////////////////////////////////////////
registerFormRouter.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    RegisterForm.findOne({ email: email })

        .then((usuario) => {
            if (usuario) {
                bcrypt.compare(password, usuario.password, function (err, result) {
                    if (result) {
                        console.log(result)

                        const accessToken = jwt.sign(
                            {
                                usuarioId: usuario.__id, firstName: usuario.firstName
                            },
                            process.env.JWT_SECRET
                        );

                        return res.json({ logged: true, token: accessToken, usuario: usuario });
                    }
                    else {
                        console.log(err)
                        return res.status(404).json({ logged: false })
                    }
                })
            } else {
                console.log('no match')
                return res.status(404).json({ logged: false, mensaje: "the user you trying loggin is not registered" })
            }
        })
        .catch((err) => {
            console.log('no encontrado')
            return res.status(404).json({ logged: false, mensaje: "error total" })
        })

})

////////////////////////////////register route/////////////////////////////////////////////////////////////
registerFormRouter.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        const registerForm = new RegisterForm;

        registerForm.firstName = firstName;
        registerForm.lastName = lastName;
        registerForm.email = email;
        registerForm.password = hash;
        registerForm.address = address;
        registerForm.phoneNumber = phoneNumber;

        registerForm.save()
            .then((newRegisterForm) => {
                res.json(newRegisterForm)
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    })
})

registerFormRouter.get('/', (req, res) => {
    RegisterForm.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((datoUsuario) => {
            res.set("Content-type", "application/json; charset=utf-8")
                .send(JSON.stringify({ datoUsuario }, null, 2));
        }).catch((err) => {
            res.status(500).send(err)
        })
})

registerFormRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    RegisterForm.find({ _id: id }, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((datoUsuario) => {
            res.send(datoUsuario)
        }).catch((err) => {
            res.status(500).send(err)
        })
})

registerFormRouter.post('/profileImage/:id', /* authenticateJWT ,*/upload.single('avatar'), (req, res) => {
    const id = req.params.id;

    const result1 = cloudinary.uploader.upload(req.file.path, (error, result) => {
        console.log(result, id, `the url of image is ${result.url}`);
        RegisterForm.findByIdAndUpdate({ _id: id }, { imagen: result.url })
            .then((uploadedUser, err) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.send("image updated")
                }
            }).catch((err) => {
                console.log('llegaste pero no actulizaste')
            })
        fs.unlink(req.file.path)

    })
})

module.exports = registerFormRouter;
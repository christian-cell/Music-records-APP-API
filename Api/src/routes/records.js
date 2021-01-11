const express = require('express');
const Records = require('../models/Records');
const recordsRouter = express.Router();
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


recordsRouter.post('/', (req, res) => {
    const record = req.body.record;
    const artist = req.body.artist;
    const year = req.body.year;
    const style = req.body.style;
    const added = req.body.added;
    const image = req.body.image;
    const date = req.body.date;

    const records = new Records();

    records.record = record;
    records.artist = artist;
    records.year = year;
    records.style = style;
    records.added = added;
    records.image = image;
    records.date = date;

    records.save()
        .then((newRecord) => {
            res.json(newRecord)
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.post('/userPost', upload.single('image'), (req, res) => {
    
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        // console.log(result.url);
        const image = result.url;
        const year = req.body.year;
        const style = req.body.style;
        const artist = req.body.artist;
        const url = req.body.url;

        const records = new Records();

        records.url = url;
        records.image = image;
        records.year = year;
        records.artist = artist;
        records.style = style;

        records.save()
            .then((newRecords) => {
                res.json(newRecords)
            })
            .catch((error) => {
                res.status(500).send(error)
            })
    })


})

recordsRouter.get('/', (req, res) => {
    Records.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }).sort({"_id": -1})
        .then((records) => {
            res.json(records)
            // res.set("Content-type", "application/json; charset=utf-8")
            //     .send(JSON.stringify({ records }, null, 2));
        }).catch((error) => {
            res.status(500).send(error)
        })
})



recordsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    Records.findById(id, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((record) => {
            res.json(record)
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.get('/getByStyle/:style' , (req,res)=>{
    const style = req.params.style;
    Records.find( { style: style } , { __v:0 ,createdAt:0 , updatedAt:0 } )
    .then((recordByStyle)=>{
        res.json(recordByStyle)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

recordsRouter.delete('/', (req, res) => {
    Records.deleteMany({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((allRecordsDeleted) => {
            res.send({ message: 'All records were deleted successfully' })
        })
})


recordsRouter.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Records.findByIdAndDelete(id)
        .then((recordDeleted) => {
            res.send({ message: `deleted by id : ${id} successfully` })
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.put('/:id', (req, res) => {

    const id = req.params.id;

    const record = req.body.record;
    const artist = req.body.artist;
    const year = req.body.year;
    const style = req.body.style;
    const added = req.body.added;
    const image = req.body.image;
    const date = req.body.date;
    const url = req.body.url;

    Records.findByIdAndUpdate(id, {
        record: record,
        artist: artist,
        year: year,
        style: style,
        added: added,
        image: image,
        date: date,
        url: url,
    })

        .then(() => {
            return Records.findById(id)
        }).then((recordUpdated) => {
            res.send(recordUpdated)
        }).catch((error) => {
            res.status(500).send(error)
        })

})

module.exports = recordsRouter
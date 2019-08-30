import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { dictionaryUpload, dictionarySearch } from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// file upload logic
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

//file type validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('Only .txt file format is supported'), false);
  }
};

const upload = multer({
  storage: storage,
  limit:{fileSize: 209715200}, //200 mb in bytes
  fileFilter
});

//endpoints ex: /dictionary/upload

((dictionary) => {

app.post(`${dictionary}/upload`, upload.single('dictionaryTxt'), dictionaryUpload);
app.get(`${dictionary}/search/:searchKey`, dictionarySearch);

})('/dictionary');

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

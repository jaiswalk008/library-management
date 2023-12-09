
const express = require('express');

const router = express.Router();
const libraryController = require('../controllers/library');

router.post('/add-book',libraryController.addBook);
router.get('/get-books',libraryController.getBooks);
router.get('/return-book',libraryController.returnBook);


module.exports = router;

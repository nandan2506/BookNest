const { allBooks, deleteBook, addBook, borrowBook, book, returnBook } = require("../controllers/book.controller")
const express = require("express")
const router = express.Router()
const authentication = require("../middlewares/authentication");


router.post("/borrow/:bookId", authentication, borrowBook);
router.post("/return/:bookId", authentication, returnBook);
router.get("/all", allBooks);
router.get("/book/:bookId", book);
router.post("/add", addBook);
router.post("/delete", deleteBook);

module.exports = router






const bookModel = require("../models/book.model");
const borrowBooksModel = require("../models/borred.books.model");
const userModel = require("../models/user.model");


// ✅ GET all books
const allBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        return res.status(200).json({ books: books, message: 'books found successfully' });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books" });
    }
};

// ✅ GET single book by ID
const book = async (req, res) => {
    try {
        const { bookId } = req.params;

        const foundBook = await bookModel
            .findById(bookId)
            .populate("borrowed_by", "username email role"); // only specific fields

        if (foundBook) {
            return res.status(200).json({ book: foundBook, message: "Book found successfully" });
        }

        return res.status(404).json({ message: "Book not found" });
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Error fetching book" });
    }
}

// ✅ DELETE a book by ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book" });
    }
};

// ✅ ADD a new book
const addBook = async (req, res) => {
    try {
        const { title, author, publication_year, genre, description, cover_image, is_available } = req.body;
        const existingBook = await bookModel.findOne({ title, author });

        if (existingBook) {
            return res.status(400).json({ message: "Book already exists" });
        }

        await bookModel.create({
            title,
            author,
            publication_year,
            genre,
            description,
            cover_image,
            is_available: is_available ?? true
        });

        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Error adding book", error });
    }
};

// ✅ BORROW a book
const borrowBook = async (req, res) => {
    try {
        const { userId } = req.user;
        const { bookId } = req.params;
        const { dueDate } = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.isVerified)
            return res.status(403).json({ message: "User not verified" });

        if (user.borrowedBooks.length >= 3)
            return res
                .status(400)
                .json({ message: "Borrowing limit reached (3 books max)" });

        const book = await bookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (!book.is_available)
            return res.status(400).json({ message: "Book already borrowed" });

        console.log("Creating borrowed book...");
        const borrowedBook = await borrowBooksModel.create({
            userId,
            bookId,
            dueDate,
        });

        // Update book and user
        book.is_available = false;
        book.borrowed_by = userId;
        user.borrowedBooks.push(bookId);

        await book.save();
        await user.save();

        return res
            .status(200)
            .json({ message: "Book borrowed successfully", book, borrowedBook });
    } catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// ✅ RETURN a book
const returnBook = async (req, res) => {
    try {
        const { userId } = req.user;
        const { bookId } = req.params;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const book = await bookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Remove book from user
        user.borrowedBooks.pull(bookId);
        user.returnedBooks.push(bookId);
        book.is_available = true;

        await user.save();
        await book.save();

        res.status(200).json({ message: "Book returned successfully!" });
    } catch (error) {
        console.error("Error returning book:", error);
        res.status(500).json({ message: "Error returning book" });
    }
};

module.exports = {
    allBooks,
    book,
    addBook,
    deleteBook,
    borrowBook,
    returnBook
};

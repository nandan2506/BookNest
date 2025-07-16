const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publication_year: { type: Number, required: true },
    genre: { type: [String], required: true },
    description: { type: String, required: true },
    cover_image: { type: String, required: true },
    is_available: { type: Boolean, default: true },
    pages: { type: Number },
    publisher: { type: String },
    language: { type: String },
    borrowed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

const bookModel = mongoose.model("Book", bookSchema)
module.exports = bookModel;

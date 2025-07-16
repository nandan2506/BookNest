
const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowedAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedAt: { type: Date },
  fine: { type: Number, default: 0 },
  status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
})

const borrowBooksModel = mongoose.model("borrowBook", borrowSchema);
module.exports = borrowBooksModel;

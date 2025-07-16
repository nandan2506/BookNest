const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    returnedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    wishedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    commentsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    verificationCode: { type: Number },
    otpExpiry: Date

});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;




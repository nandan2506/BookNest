const authentication = require("../middlewares/authentication")
const express = require("express");
const { userRegister, userLogin, allUsers, borrowBook, getBorrowedBooks, verifyOtp, userInfo } = require("../controllers/user.controller");
const userRoutes = express.Router();

// Define routes
userRoutes.get("/all", allUsers);
userRoutes.get("/userById", authentication, userInfo);
userRoutes.put("/verify-otp", verifyOtp)
userRoutes.post("/login", userLogin);
userRoutes.post("/signup", userRegister);
userRoutes.post("/borrow", authentication, borrowBook);
userRoutes.get("/borrowed-books", authentication, getBorrowedBooks);

module.exports = userRoutes






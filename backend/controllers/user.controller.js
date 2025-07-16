const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const BorrowedBookModel = require("../models/borred.books.model");
const jwt = require("jsonwebtoken")
const { transporter } = require('../middlewares/email.config')



const allUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    if (!users.length) {
      return res.status(200).json({ message: "No users found", data: [] })
    }

    res.status(200).json({ message: "Users retrieved successfully", data: users })
  } catch (error) {
    console.log("error while fetching users", error)
    res.status(404).json("error while fetching users")
  }
}

const userInfo = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel
      .findById(userId)
      .populate("borrowedBooks")
      .populate("returnedBooks")
      .populate("wishedBooks");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error while fetching user:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: error.message,
    });
  }
};


const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User already exists, please login." });
      } else {
        return res.status(403).json({ message: "User exists but not verified. Please verify your email." });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      verificationCode: otp,
      otpExpiry,
      isVerified: false
    });



    await transporter.sendMail({
      from: `"BookNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - BookNest",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>👋 Hello ${username},</h2>
          <p>Thank you for registering on <strong>BookNest</strong>!</p>
          <p>Your OTP for verifying your email is:</p>
          <h1 style="letter-spacing: 5px; color: #01BFBD;">${otp}</h1>
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
        </div>
      `
    });

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: newUser._id,
      email: newUser.email
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ msg: 'OTP not received' });

    const user = await userModel.findOne({ verificationCode: otp });

    if (!user) return res.status(404).json({ msg: "Invalid OTP" });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ msg: "OTP has expired" });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ msg: "Email verified successfully" });

  } catch (error) {
    console.log("Error while verifying email:", error);
    return res.status(500).json({ msg: "Internal server error during verification" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const userExist = await userModel.findOne({ email: email })
    if (userExist) {
      const isPasswordCorrect = bcrypt.compareSync(password, userExist.password)

      if (isPasswordCorrect) {
        const token = jwt.sign(
          { userId: userExist._id, role: userExist.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        ); return res.status(200).json({ message: "user login successfully", token, userExist })
      }
    }

    return res.status(404).json({ message: "user not found, please register " })

  } catch (error) {
    res.status(404).json({ message: "error while login" })
    console.log("error while login", error)
  }
}

const borrowBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const userId = req.user._id; // Get userId from JWT

    const newBorrow = new BorrowedBookModel({ userId, bookId, dueDate });
    await newBorrow.save();

    res.status(201).json({ success: true, message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from JWT

    // Fetch user and populate borrowed books
    const user = await UserModel.findById(userId).populate("borrowedBooks");

    res.json({ success: true, borrowedBooks: user.borrowedBooks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching borrowed books" });
  }
};




module.exports = { userInfo, userRegister, verifyOtp, userLogin, allUsers, borrowBook, getBorrowedBooks }
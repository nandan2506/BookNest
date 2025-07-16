const express = require("express");
const app = express();
const connection = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const adminRoutes = require("./routes/admin.routes");


// Routes
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/admin", adminRoutes);



app.listen(PORT, () => {
    connection()
    console.log("listening on port", PORT)
})
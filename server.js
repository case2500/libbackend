const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const categoryRoute = require("./routes/categoryRoute.js");

const checkbookrouter = require("./routers/checkbookrouter.js");
//memberRoute
const memberRoute = require("./routes/memberRoute.js");

const borrowRouter = require("./routers/borrowRouter.js");
const transactionsRouter = require("./routers/transactionsRouter.js");
const transactionreturnsRouter = require("./routers/transactionreturnsRouter.js");

const dashboardRouter = require("./routers/dashboardRouter.js");

const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors(
    {
    origin: ["http://localhost:5173","http://localhost:3000","http://localhost:3001", "https://pinvent-app.vercel.app"],
    credentials: true,
  }
)
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/transactions", transactionsRouter);
app.use("/api/transactionreturns", transactionreturnsRouter);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/members", memberRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/category", categoryRoute);

app.use("/api/checkbook", checkbookrouter);

app.use("/api/borrow", borrowRouter);
app.use("/api/dashboard",dashboardRouter);



// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`+`mongodb://127.0.0.1:27017/inventary`);
    });
  })
  .catch((err) => console.log(err));

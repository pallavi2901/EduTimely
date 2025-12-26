const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Models
const Grade = require("./models/Grade");
const Task = require("./models/Task");

// Routes
const gradeRoutes = require("./routes/gradesRoutes");
const taskRoutes = require("./routes/taskRoutes");
const googleCalendarRoutes = require("./routes/googleCalendarRoutes");
const deadlineRoutes = require("./routes/deadlineRoutes");
const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const calendarEventRoutes = require("./routes/calendarEventRoutes");

const app = express();

/* =======================
   Middleware
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (safe for local + deploy)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   MongoDB Connection
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

/* =======================
   Routes
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/calendar", googleCalendarRoutes);
app.use("/api/deadlines", deadlineRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/events", calendarEventRoutes);

/* =======================
   Test Routes
======================= */
app.get("/api/test", async (req, res) => {
  try {
    const grades = await Grade.find();
    res.status(200).json({
      message: "MongoDB connection is working",
      grades,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error connecting to MongoDB",
      error: error.message,
    });
  }
});

app.post("/api/test", (req, res) => {
  console.log("Test Route Received:", req.body);
  res.status(200).json({ message: "Test POST successful" });
});

// Update task
app.put("/api/tasks/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// Create task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({
      message: "Error saving task",
      error: err.message,
    });
  }
});

/* =======================
   Server Start
======================= */
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

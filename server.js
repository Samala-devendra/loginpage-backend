

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Client } = require("pg");

const JWT_SECRET = "e25566739b137dc0db5fd851e365e33e398c6ff7b26c12cbe30cf1077dba3acd";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Initialize the PostgreSQL Client
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "loginpage", // Use your database name here
  password: "1918108588", // Use your password here
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err.stack);
  });

// Function to ensure the users table exists
const createTablesIfNeeded = async () => {
  try {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL
      );
    `;
    await client.query(createUsersTableQuery);
    console.log("Users table created");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

createTablesIfNeeded(); // Ensure the tables exist

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to authorize role
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
    next();
  };
};

// User Registration
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route: User (accessible to all logged-in users)
app.get("/user", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, user with ID: ${req.user.userId}, role: ${req.user.role}` });
});

// Protected Route: Admin (accessible to users with 'admin' role)
app.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: `Welcome, admin with ID: ${req.user.userId}, role: ${req.user.role}` });
});

// Start the server
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown to ensure connections are closed properly
process.on("SIGTERM", () => {
  console.log("Closing database connection...");
  client.end(() => {
    console.log("Database connection closed.");
    process.exit(0);
  });
});

const express = require("express");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
require("dotenv").config();
const employeerouter = require("./Routes/EmployeeRoute");
const complainrouter = require("./Routes/ComplainRoute");
const router=require("./Routes/UserRoutes_A")
const jwt = require("jsonwebtoken");
const authenticateToken = require("./Middlewares/auth");

const app = express();
const cors = require("cors");

// Disable the X-Powered-By header for security
app.disable('x-powered-by');

// Configure CORS options
const corsOptions = {
  origin: ['http://localhost:3000'], // Replace with trusted origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies or other credentials to be sent
};


//Middelware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/employees", authenticateToken, employeerouter);
app.use("/complains", authenticateToken, complainrouter);
app.use("/users_A", authenticateToken, router)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

//Call Register Model
require("./Models/Register");
const User = mongoose.model("UserRegister");
app.post("/register", async (req, res) => {
  const { full_name, email, phone, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: "err", message: "User already registered" });
    }

    // Create the new user
    await User.create({
      full_name,
      email,
      phone,
      password,
    });
    res.send({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "err", message: "Server Error" });
  }
});

//Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    if (user.password === password) {
      // Generate a JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );

      // Send the user's role back along with the status
      return res.status(200).json({ status: "ok", token, role: user.role });
    } else {
      return res.status(400).json({ error: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});


const Issue = require('./Models/ComplainModel'); // Import the model for the complaint
const chartrouter = express.Router(); // Router for chart-related routes

/// Route to get the count of issues by type
chartrouter.get('/issues/count-by-type', async (req, res) => {
  try {
    const result = await Issue.aggregate([
      { $group: { _id: "$issue_type", count: { $sum: 1 } } } // Group by 'issue_type' and count occurrences
    ]);
    res.json(result); // Send the aggregated result back to the client
  } catch (error) {
    console.error('Error fetching issue count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/// Route to get the count of complaints by issue type and status
chartrouter.get('/issues/count-by-type-and-status', async (req, res) => {
  try {
    const result = await Issue.aggregate([
      { 
        $group: {
          _id: { issue_type: "$issue_type", status: "$status" },
          count: { $sum: 1 }
        }
      },
      { 
        $project: {
          issue_type: "$_id.issue_type",
          status: "$_id.status",
          count: 1,
          _id: 0
        }
      }
    ]);
    res.json(result); // Send the aggregated result back to the client
  } catch (error) {
    console.error('Error fetching issue count by type and status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

chartrouter.get('/issues/count-by-month', async (req, res) => {
  try {
    const currentMonth = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(currentMonth.getMonth() - 1);

    const result = await Issue.aggregate([
      {
        $match: {
          createdAt: { // Assuming 'createdAt' stores the issue's creation date
            $gte: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
            $lte: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
          },
        },
      },
      {
        $group: {
          _id: {
            issue_type: "$issue_type",
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the result into a more frontend-friendly structure
    const formattedResult = result.reduce((acc, item) => {
      const { issue_type, month } = item._id;
      if (!acc[issue_type]) {
        acc[issue_type] = { currentMonth: 0, previousMonth: 0 };
      }
      if (month === currentMonth.getMonth() + 1) {
        acc[issue_type].currentMonth = item.count;
      } else if (month === previousMonth.getMonth() + 1) {
        acc[issue_type].previousMonth = item.count;
      }
      return acc;
    }, {});

    res.json(formattedResult);
  } catch (error) {
    console.error('Error fetching issue count by month:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Use the chartrouter
app.use('/api',chartrouter); // Route is accessible at /api/issues/count-by-type


//Send an email
app.post('/send-email', async (req, res) => {
  const { employeeEmail, employeeName, complainDetails } = req.body;

  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any email provider you use
      auth: {
        user: process.env.SENDERMAIL, // replace with your email
        pass: process.env.PASSWORD, // replace with your email password or app password
      },
      secure: true,
    });

    // Email content
    const mailOptions = {
      from: process.env.SENDERMAIL,
      to: employeeEmail,
      subject: `New Incident Assigned to You`,
      text: `Hi ${employeeName},\n\nYou have been assigned a new incident:\n\n${complainDetails}\n\nPlease log in to the system to review the details.\n\nBest regards,\nSLT Incident Management `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});


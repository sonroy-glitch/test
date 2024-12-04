const express = require('express');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  console.log(code)
  console.log("hi")
  if (!code) {
      return res.status(400).send('Authorization code missing');
  }

  try {
      // Exchange authorization code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Save tokens for future use (e.g., database)
      console.log('Tokens:', tokens);

      res.send('Authentication successful! You can now upload videos.');
  } catch (error) {
      console.error('Error retrieving tokens:', error);
      res.status(500).send('Authentication failed.');
  }
});

app.listen(3000)
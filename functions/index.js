/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Validate the request method
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const { email, message, subject } = req.body;

      if (!email || !message) {
        return res.status(400).send("Missing email or message");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "info@occulinkhealth.com",
          pass: "dyjl roqe sslb gpdg",
        },
      });

      const mailOptions = {
        from: "info@occulinkhealth.com",
        to: email,
        cc: "kelly.herndon@beaumont-aco.com",
        subject: subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  });
});

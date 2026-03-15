import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export async function readLatestRegistrationEmail(): Promise<string | null> {

  const auth = new google.auth.OAuth2();

  auth.setCredentials({
    access_token: process.env.gmail_access_token
  });

  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5
  });

  const messages = res.data.messages;

  if (!messages || messages.length === 0) {
    return null;
  }

  const message = await gmail.users.messages.get({
    userId: "me",
    id: messages[0].id!
  });

  const payload = message.data.payload;

  let bodyData = payload?.body?.data;

  if (!bodyData && payload?.parts) {
    for (const part of payload.parts) {
      if (part.body?.data) {
        bodyData = part.body.data;
        break;
      }
    }
  }

  if (!bodyData) return null;

  const decoded = Buffer.from(bodyData, "base64")
    .toString("utf-8");

  return decoded;
}
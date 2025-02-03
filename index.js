const express = require("express");
const { Scraper } = require("agent-twitter-client");
const schedule = require("node-schedule");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "AviJin029";
const PASSWORD = "Naman@2025";
const MAX_TWEET_LENGTH = 280;

/**
 * Trims tweet text to fit within the 280-character limit.
 */
function formatTweet(text) {
  return text.length > MAX_TWEET_LENGTH ? text.substring(0, MAX_TWEET_LENGTH) : text;
}

/**
 * Logs in and posts a tweet.
 */
async function postTweet(tweetText) {
  const scraper = new Scraper();
  const tweet = formatTweet(tweetText);

  try {
    console.log("Logging in...");
    await scraper.login(USERNAME, PASSWORD);
    console.log("Successfully logged in!");

    console.log("Posting scheduled tweet:", tweet);
    await scraper.sendTweet(tweet);
    console.log("Tweet posted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * Schedule the tweet at a specific date and time.
 */
const scheduleTime = "2025-02-03 13:40"; // Change to your desired date & time (YYYY-MM-DD HH:mm)
schedule.scheduleJob(scheduleTime, function () {
  console.log(`Scheduled tweet running at ${new Date().toLocaleString()}`);
  postTweet(`This is a scheduled tweet using ElizaOS and node-schedule! 🚀 #Automation`);
});

// Express route to trigger posting manually (optional)
app.get("/post-tweet", async (req, res) => {
  const tweetText = req.query.text || "Default tweet text"; // Get tweet text from query or use default
  await postTweet(tweetText);
  res.send("Tweet posted successfully!");
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

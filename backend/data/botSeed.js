const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BotQuestion = require("../models/BotQuestion");
const BotResponse = require("../models/BotResponse");
const BotIntent = require("../models/BotIntent");
const BotEntity = require("../models/BotEntity");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const botIntents = [
  { name: "CheckIn", description: "Checking in on the employee’s current mood and status." },
  { name: "RequestHelp", description: "User is requesting help or assistance." },
  { name: "ProvideFeedback", description: "User is providing feedback on a specific topic." },
  { name: "ReportIssue", description: "User is reporting an issue or concern." },
  { name: "ExpressGratitude", description: "User is expressing gratitude or appreciation." },
  { name: "AskForClarification", description: "User is asking for clarification on a topic or task." },
  { name: "SuggestImprovement", description: "User is suggesting an improvement or change." },
  { name: "SocialChat", description: "Engaging in casual or social conversation." },
];

const botEntities = [
  { name: "Mood", type: "Emotion", value: "stressed" },
  { name: "Mood", type: "Emotion", value: "happy" },
  { name: "Mood", type: "Emotion", value: "frustrated" },
  { name: "Task", type: "Action", value: "help" },
  { name: "Task", type: "Action", value: "support" },
  { name: "Task", type: "Action", value: "guidance" },
  { name: "IssueType", type: "Problem", value: "technical" },
  { name: "IssueType", type: "Problem", value: "interpersonal" },
  { name: "IssueType", type: "Problem", value: "workload" },
  { name: "Appreciation", type: "PositiveFeedback", value: "teamwork" },
  { name: "Appreciation", type: "PositiveFeedback", value: "leadership" },
  { name: "Appreciation", type: "PositiveFeedback", value: "innovation" },
];

const botResponses = [
  { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn" },
  { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn" },
  { responseText: "I need help with something.", action: "request_assistance", intent: "RequestHelp" },
  { responseText: "Not right now, thanks.", action: "end_conversation", intent: "CheckIn" },
  { responseText: "I am facing a technical issue.", action: "log_issue", intent: "ReportIssue" },
  { responseText: "I appreciate the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude" },
  { responseText: "Can you clarify the task details?", action: "provide_clarification", intent: "AskForClarification" },
  { responseText: "I have a suggestion to improve our process.", action: "log_suggestion", intent: "SuggestImprovement" },
  { responseText: "Just wanted to have a quick chat.", action: "social_chat", intent: "SocialChat" },
  { responseText: "I am frustrated with the current workload.", action: "suggest_help", intent: "ReportIssue" },
  { responseText: "The leadership has been excellent.", action: "log_positive_feedback", intent: "ExpressGratitude" },
];

const botQuestions = [
  { questionText: "How are you feeling today?", possibleResponses: [] },
  { questionText: "Is there anything you would like to share?", possibleResponses: [] },
  { questionText: "Would you like to provide any feedback?", possibleResponses: [] },
  { questionText: "Are you facing any challenges at work?", possibleResponses: [] },
  { questionText: "Do you have any suggestions for improvement?", possibleResponses: [] },
  { questionText: "Would you like to chat about something?", possibleResponses: [] },
  { questionText: "Is there anything else I can assist you with?", possibleResponses: [] },
];

const importBotData = async () => {
  try {
      await BotQuestion.deleteMany();
      await BotResponse.deleteMany();
      await BotIntent.deleteMany();
      await BotEntity.deleteMany();
      console.log("Existing bot data removed");

      const createdIntents = await BotIntent.insertMany(botIntents);
      console.log("Bot intents seeded");

      const createdEntities = await BotEntity.insertMany(botEntities);
      console.log("Bot entities seeded");

      const createdResponses = await BotResponse.insertMany(
          botResponses.map((response) => ({
              ...response,
              intent: createdIntents.find((intent) => intent.name === response.intent)._id,
          }))
      );
      console.log("Bot responses seeded");

      // Assign responses to questions
      botQuestions[0].possibleResponses = createdResponses.filter((response) =>
          ["CheckIn"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[1].possibleResponses = createdResponses.filter((response) =>
          ["RequestHelp", "ProvideFeedback"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[2].possibleResponses = createdResponses.filter((response) =>
          ["ProvideFeedback", "ExpressGratitude"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[3].possibleResponses = createdResponses.filter((response) =>
          ["ReportIssue"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[4].possibleResponses = createdResponses.filter((response) =>
          ["SuggestImprovement"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[5].possibleResponses = createdResponses.filter((response) =>
          ["SocialChat", "CheckIn"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);
      botQuestions[6].possibleResponses = createdResponses.filter((response) =>
          ["RequestHelp", "CheckIn"].includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
      ).map((response) => response._id);

      await BotQuestion.insertMany(botQuestions);
      console.log("Bot questions seeded");

      console.log("Bot data imported successfully!");
      process.exit();
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
};

importBotData();

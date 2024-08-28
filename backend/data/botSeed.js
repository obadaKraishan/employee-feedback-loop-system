const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BotQuestion = require("../models/BotQuestion");
const BotResponse = require("../models/BotResponse");
const BotIntent = require("../models/BotIntent");
const BotEntity = require("../models/BotEntity");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const botIntents = require('./botData/intents');
const botEntities = require('./botData/entities');
const botQuestions = require('./botData/questions');
const botResponses = require('./botData/responses');

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

      const createdQuestions = await BotQuestion.insertMany(botQuestions);
      console.log("Bot questions seeded");

      const createdResponses = await BotResponse.insertMany(
          botResponses.map((response) => {
              let followUpQuestion = null;
              if (response.followUpQuestionIndex !== null) {
                  followUpQuestion = createdQuestions[response.followUpQuestionIndex]._id;
              }
              return {
                  ...response,
                  intent: createdIntents.find((intent) => intent.name === response.intent)._id,
                  followUpQuestion: followUpQuestion,
              };
          })
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

      // Update each question with their respective possible responses
      for (let question of botQuestions) {
          await BotQuestion.findByIdAndUpdate(
              createdQuestions[botQuestions.indexOf(question)]._id,
              { possibleResponses: question.possibleResponses },
              { new: true }
          );
      }

      console.log("Bot data imported successfully!");
      process.exit();
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
};

importBotData();

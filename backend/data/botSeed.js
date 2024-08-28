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
        // Clear existing data
        await BotQuestion.deleteMany();
        await BotResponse.deleteMany();
        await BotIntent.deleteMany();
        await BotEntity.deleteMany();
        console.log("Existing bot data removed");

        // Seed intents, entities, and questions
        const createdIntents = await BotIntent.insertMany(botIntents);
        console.log("Bot intents seeded");

        const createdEntities = await BotEntity.insertMany(botEntities);
        console.log("Bot entities seeded");

        const createdQuestions = await BotQuestion.insertMany(botQuestions);
        console.log("Bot questions seeded");

        // Seed responses with follow-up questions and intent references
        const createdResponses = await BotResponse.insertMany(
            botResponses.map((response) => {
                let followUpQuestion = null;
                if (response.followUpQuestionIndex !== null && response.followUpQuestionIndex < createdQuestions.length) {
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
        const assignResponsesToQuestions = (intentNames) => {
            const possibleResponses = createdResponses.filter((response) =>
                intentNames.includes(createdIntents.find((intent) => intent._id.equals(response.intent)).name)
            ).map((response) => response._id);
            return possibleResponses;
        };

        for (let i = 0; i < createdQuestions.length; i++) {
            const question = createdQuestions[i];
            let possibleResponses = assignResponsesToQuestions(botIntents.map(intent => intent.name));

            if (!possibleResponses || possibleResponses.length === 0) {
                console.warn(`Warning: Question "${question.questionText}" has no possible responses assigned.`);
            } else {
                await BotQuestion.findByIdAndUpdate(
                    question._id,
                    { possibleResponses: possibleResponses },
                    { new: true }
                );
                console.log(`Question "${question.questionText}" updated with possible responses.`);
            }
        }

        console.log("Bot data imported successfully!");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importBotData();

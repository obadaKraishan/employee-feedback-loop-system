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

        // First, insert all responses and capture their IDs
        const createdResponses = await BotResponse.insertMany(
            botResponses.map((response) => {
                let followUpQuestion = null;
                if (typeof response.followUpQuestionIndex === 'number' && response.followUpQuestionIndex < botQuestions.length) {
                    followUpQuestion = botQuestions[response.followUpQuestionIndex]._id;
                }
                return {
                    ...response,
                    intent: createdIntents.find((intent) => intent.name === response.intent)._id,
                    followUpQuestion: followUpQuestion,
                };
            })
        );
        console.log("Bot responses seeded");

        // Now, map each question's possibleResponses to the corresponding BotResponse ObjectId
        const createdQuestions = await BotQuestion.insertMany(
            botQuestions.map((question) => {
                const possibleResponses = question.possibleResponses.map(response => {
                    const matchingResponse = createdResponses.find(
                        res => res.responseText === response.responseText && res.intent.toString() === createdIntents.find(intent => intent.name === response.intent)._id.toString()
                    );
                    return matchingResponse ? matchingResponse._id : null;
                }).filter(Boolean); // Remove any null values
                return {
                    ...question,
                    possibleResponses: possibleResponses,
                };
            })
        );
        console.log("Bot questions seeded");

        console.log("Bot data imported successfully!");
        process.exit();
    } catch (error) {
        console.error(`Error during bot data import: ${error.message}`, error);
        process.exit(1);
    }
};

importBotData();

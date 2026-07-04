const OpenAI = require("openai");
const chat=require("../models/Chat");


const askQuestion = async (req, res) => {
    try {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY?.trim(),
            baseURL: "https://openrouter.ai/api/v1"
        });
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({
                success: false,
                messages: "Please Write Question"
            })
        }
        const response = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "you are a helpful teacher.Explain in simple hinglish with examples"
                },
                {
                    role: "user",
                    content: question
                }
            ]
        });
        const answer = response.choices[0].message.content;
       const Chat = require("../models/Chat");

const savedChat = await Chat.create({
  question,
  answer,
});
        res.status(201).json({
            success: true,
            messages: "Ansewer Generated Successfully",
            data: savedChat
        });

    }
    catch (err) {
        console.log("Unable to solve doubt", err);
        res.status(500).json({
            success: false,
            messages: "Unable to generate answer",
            error: err.message
        });
    }
};
const getALLCharts = async (req, res) => {
    try {
        const charts = await chat.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            Message: "All Chart History",
            charts
        })
    }
    catch (err) {
        console.log("Unable to Fetch All charts", err);
        res.status(500).json({
            success: false,
            message: "Unable to Fetch chat history"

        });
    }
};
module.exports = { askQuestion, getALLCharts };
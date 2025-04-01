import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/index.js";

const MODEL_NAME = "gemini-2.0-flash";

export const generateBlog = async (topic) => {
  let data = {
    status: false,
    data: null,
  };
  
  try {
    const genAI = new GoogleGenerativeAI(config.API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Write a short blog post of 10 lines about: ${topic}`;

    const result = await model.generateContent(prompt); 

    if (result && result.response && result.response.text) {
      const text = result.response.text();

      data = {
        status: true,
        data: text,
      };
    }

    return data;
  } catch (err) {
    console.error("Error generating blog:", err);
    return data;
  }
};

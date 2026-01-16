import { GoogleGenAI } from "@google/genai";
import { QuoteRequest } from '../types';

// Initialize the Gemini API client
// Note: process.env.API_KEY is guaranteed to be available in this environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFormattedQuote = async (request: QuoteRequest): Promise<string> => {
  try {
    const prompt = `
      You are a helpful assistant for a professional handyman service.
      Your goal is to take user input and format it into a clean, professional text message that the user can copy and send to the handyman.

      Here is the required format:
      ---
      Location: [City/Zip]
      Job: [1-2 sentences describing the work]
      Materials On-site: [Yes/No - and brief detail if provided]
      Access Notes: [Gate codes, parking, pets, stairs, etc.]
      ---

      Here is the raw user input:
      Location: ${request.location}
      Job Description: ${request.description}
      Materials Status: ${request.materials}
      Access Details: ${request.access}

      Instructions:
      1. Clean up the text to be concise and polite.
      2. If information is missing, put "N/A" or "Not specified".
      3. Do not add any introductory text like "Here is your draft". Just output the formatted message.
      4. Add a polite closing line at the end: "Thanks! I can send photos if needed."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Error generating quote format. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate quote formatting.");
  }
};
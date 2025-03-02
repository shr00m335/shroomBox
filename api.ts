import axios from "axios";

const OPENAI_API_KEY =
  "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"; // NEVER hard-code your API key in production!

// Define a chat message type
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Request type for chat completions
export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
}

// Response types from OpenAI API
export interface ChatChoice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
}

export async function getOpenAIResponse(
  prompt: string
): Promise<OpenAIResponse> {
  const url = "https://api.openai.com/v1/chat/completions";

  // Note the updated payload structure:
  const data: ChatCompletionRequest = {
    model: "gpt-3.5-turbo", // or whichever model you want to use
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    temperature: 0.7, // optional: adjust as needed
  };

  try {
    const response = await axios.post<OpenAIResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response");
  }
}

// ----------------------
// Text-to-Speech Function
// ----------------------

/**
 * Calls the OpenAI text-to-speech endpoint and returns a Buffer containing the audio (MP3).
 *
 * @param input - The text to be converted to speech.
 * @param voice - The voice to be used (default "alloy").
 * @returns A Promise that resolves to a Buffer with the MP3 audio data.
 */
export async function getTextToSpeech(input: string, voice: string = "alloy"): Promise<Blob> {
  // The endpoint for text-to-speech (adjust if needed)
  const url = "https://api.openai.com/v1/audio/speech";
  const data = {
    model: "tts-1",
    voice: voice,
    input: input,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      // Specify responseType to receive binary data
      responseType: "blob",
    });
    // Convert the binary data to a Node Buffer (can be saved or returned)
    return response.data;
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
}

import axios from "axios";

// Remove dotenv - use build-time environment variables instead
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key in environment variables");
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
}

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

  const data: ChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
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

export async function getTextToSpeech(input: string, voice: string = "alloy"): Promise<Blob> {
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
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
}

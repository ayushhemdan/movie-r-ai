import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const getGenAI = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_GEMINI_API_KEY is not configured");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
  });
};

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json();

    if (!preferences || !preferences.trim()) {
      return NextResponse.json({ error: "Movie preferences must be provided" }, { status: 400 });
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemPrompt = `You are an expert movie recommendation system. Based on the user's preferences, recommend 3-5 movies that match their taste.

User Preferences: "${preferences}"

CRITICAL REQUIREMENTS:
- Output ONLY valid JSON, no markdown formatting, no code blocks
- Recommend between 3-5 movies (prefer 5 if possible, but ensure quality)
- Use this exact structure:
{
  "movies": [
    {
      "title": "Movie Title",
      "year": "Release Year (optional, include if you know it)",
      "genre": "Primary Genre (optional)",
      "description": "A brief 2-3 sentence description of the movie plot without spoilers",
      "whyRecommend": "A 1-2 sentence explanation of why this movie matches their preferences"
    },
    ...
  ]
}

- Choose movies that genuinely match the user's preferences
- Include a mix of well-known and potentially lesser-known films when appropriate
- Provide accurate information about movies
- Make descriptions engaging but spoiler-free
- Explain clearly why each movie matches their preferences`;

    const ai = getGenAI();
    // Use new Gemini API models
    const modelNames = ["gemini-3-flash-preview"];
    let text: string | undefined;
    let lastError: Error | null = null;

    const contents = [
      {
        role: "user" as const,
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
    ];

    const config = {
      temperature: 0.8, // Slightly higher for more creative recommendations
    };

    for (const modelName of modelNames) {
      try {
        // Use generateContentStream as shown in the example
        const response = await ai.models.generateContentStream({
          model: modelName,
          config,
          contents,
        });

        // Collect text from stream
        let fullText = "";
        for await (const chunk of response) {
          if (chunk && typeof chunk === "object" && "text" in chunk) {
            fullText += chunk.text || "";
          } else if (typeof chunk === "string") {
            fullText += chunk;
          }
        }
        text = fullText;

        console.log(`Successfully used model: ${modelName}`);
        break; // Success, exit the loop
      } catch (error: any) {
        lastError = error;
        const errorMsg = error.message || error.toString();
        const statusCode = error.status || error.statusCode;

        // Fail fast on auth/quota errors (don't retry)
        if (statusCode === 401 || statusCode === 403 || errorMsg.includes("quota") || errorMsg.includes("API key")) {
          throw error; // Fail immediately, don't try other models
        }

        // Only retry on 404/model not found errors
        if (
          statusCode === 404 ||
          errorMsg.includes("404") ||
          errorMsg.includes("not found") ||
          errorMsg.includes("not available")
        ) {
          console.warn(`Model ${modelName} not available, trying next...`);
          continue; // Try next model
        }

        // For other unexpected errors, fail fast
        throw error;
      }
    }

    if (!text) {
      const errorDetails = lastError?.message || "Unknown error";
      throw new Error(
        `Failed to generate recommendations with any available model. ` +
          `Tried: ${modelNames.join(", ")}. ` +
          `Last error: ${errorDetails}. ` +
          `Please check your API key permissions and available models.`
      );
    }

    // Clean the response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```\n?/g, "").replace(/```\n?/g, "");
    }

    // Parse JSON
    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON response");
      }
    }

    // Validate the response structure
    if (!jsonData.movies || !Array.isArray(jsonData.movies)) {
      throw new Error("Invalid response format from AI");
    }

    return NextResponse.json(jsonData);
  } catch (error: any) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: error.message || "Failed to generate content" }, { status: 500 });
  }
}

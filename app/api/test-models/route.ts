import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Try to test a simple model call to see what works
    const genAI = new GoogleGenerativeAI(apiKey);
    const testModels = ["models/gemini-1.5-flash", "models/gemini-1.5-pro"];
    
    const results: Record<string, string> = {};
    
    for (const modelName of testModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'test'");
        const response = await result.response;
        const text = response.text();
        results[modelName] = `✅ Working: ${text.substring(0, 50)}`;
      } catch (error: any) {
        results[modelName] = `❌ Failed: ${error.message || error.toString()}`;
      }
    }

    return NextResponse.json({
      message: "Model availability test",
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Test failed" }, { status: 500 });
  }
}


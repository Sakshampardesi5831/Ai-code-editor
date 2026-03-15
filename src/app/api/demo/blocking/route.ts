import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

  const response = await generateText({
    model: google("gemini-2.5-flash"),
    prompt,
  });

  return NextResponse.json({ text: response.text });
}

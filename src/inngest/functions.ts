import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const result = await step.run("generate-text", async () => {
      const response = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: "Explain how black holes are formed in 1000 sentences.",
      });
      return response.text;
    });

    await step.sleep("wait-2-mins", "2m");

    const summary = await step.run("summarize-text", async () => {
      const response = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: `Summarize this in one sentence: ${result}`,
      });
      return response.text;
    });

    return { result, summary };
  },
);
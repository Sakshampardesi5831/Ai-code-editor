"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function DemoPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/demo/blocking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.text ?? "");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">AI Demo</h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <textarea
            rows={4}
            placeholder="Enter a prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary resize-none mb-4"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <div className="mt-6 rounded-lg bg-muted p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

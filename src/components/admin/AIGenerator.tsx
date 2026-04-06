
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Copy } from "lucide-react";
import { generateContentDescription } from "@/ai/flows/generate-content-description";
import { useToast } from "@/hooks/use-toast";

interface AIGeneratorProps {
  type: "project" | "blog";
  onGenerated: (content: string) => void;
}

export function AIGenerator({ type, onGenerated }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await generateContentDescription({
        contentType: type,
        input: prompt
      });
      setResult(response.content);
      onGenerated(response.content);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating content. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard."
    });
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI {type === "project" ? "Description" : "Summary"} Assistant
        </CardTitle>
        <CardDescription className="text-xs">
          Enter a few keywords about your {type} and let AI craft the content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`e.g. "NextJS e-commerce site with Stripe integration and custom CRM features"`}
            className="text-xs bg-background/50 border-white/10"
          />
          <Button 
            disabled={loading || !prompt.trim()} 
            onClick={handleGenerate}
            className="bg-primary hover:bg-primary/90 h-auto px-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          </Button>
        </div>

        {result && (
          <div className="relative group p-3 bg-background/80 rounded-lg text-xs leading-relaxed border border-white/5 animate-in fade-in zoom-in-95">
            <p className="pr-8">{result}</p>
            <button 
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded transition-all"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

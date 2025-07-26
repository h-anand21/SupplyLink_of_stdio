"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summarizeProductReviews } from "@/ai/flows/summarize-product-reviews";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "./ui/skeleton";
import type { Review } from "@/lib/types";

interface ReviewSummaryProps {
  productName: string;
  reviews: Review[];
}

export function ReviewSummary({ productName, reviews }: ReviewSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const reviewsText = reviews.map((r) => r.comment).join("\n");

    try {
      const result = await summarizeProductReviews({
        productName: productName,
        productReviews: reviewsText,
      });
      setSummary(result.summary);
    } catch (e) {
      setError("Failed to generate summary. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (reviews.length < 3) {
    return null;
  }

  return (
    <div className="mt-4">
      <Button onClick={handleSummarize} disabled={isLoading}>
        <Wand2 className="mr-2 h-4 w-4" />
        {isLoading ? "Generating..." : "Summarize Reviews with AI"}
      </Button>

      {isLoading && (
         <Alert className="mt-4">
            <Wand2 className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription>
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {summary && (
        <Alert className="mt-4">
            <Wand2 className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription className="pt-2">
                {summary}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

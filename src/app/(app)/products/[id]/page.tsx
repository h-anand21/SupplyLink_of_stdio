import React from 'react';
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Truck, ShoppingCart } from "lucide-react";
import { mockProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewSummary } from "@/components/review-summary";
import type { Review } from "@/lib/types";
import { ProductDetails } from '@/components/product-details';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-primary fill-primary" : "text-muted-foreground/50"
        }`}
      />
    ));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <Image
            alt={product.name}
            className="aspect-square w-full object-cover"
            height="600"
            src={product.imageUrl}
            width="600"
            data-ai-hint={product.category}
          />
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit">{product.category}</Badge>
          <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-muted-foreground">
            Supplied by{" "}
            <a href="#" className="text-primary hover:underline">
              {product.supplierName}
            </a>
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(Math.round(product.rating))}</div>
            <span className="text-muted-foreground text-sm">
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>
        
        <ProductDetails product={product} />
        
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-sm text-muted-foreground">
            {product.description}
          </TabsContent>
          <TabsContent value="reviews">
            {product.reviews.length > 0 ? (
                <>
                <ReviewSummary productName={product.name} reviews={product.reviews} />
                <div className="space-y-6 mt-6">
                    {product.reviews.map((review: Review) => (
                    <div key={review.id} className="flex gap-4">
                        <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${review.vendorId}`} />
                        <AvatarFallback>{review.vendorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{review.vendorName}</p>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

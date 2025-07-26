import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
            <Image
            alt={product.name}
            className="aspect-video w-full object-cover"
            height="225"
            src={product.imageUrl}
            width="400"
            data-ai-hint="product image"
            />
        </Link>
        {!product.availability && (
            <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="grid gap-1.5">
            <Link href={`/products/${product.id}`}>
                <CardTitle className="hover:text-primary">{product.name}</CardTitle>
            </Link>
          <CardDescription>By {product.supplierName}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-2xl font-bold font-headline">${product.price.toFixed(2)}</div>
        <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
        </div>
      </CardFooter>
    </Card>
  );
}

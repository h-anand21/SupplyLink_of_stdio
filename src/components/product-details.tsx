"use client";

import { useRouter } from "next/navigation";
import { Truck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        toast({
            title: "Added to Order",
            description: `${product.name} has been added to your draft order.`,
            action: (
                <Button variant="outline" size="sm" onClick={() => router.push('/orders')}>
                    View Order
                </Button>
            ),
        });
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-3xl font-bold font-headline">₹{product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">per unit</p>
                    </div>
                    <Button size="lg" disabled={!product.availability} onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {product.availability ? "Add to Order" : "Out of Stock"}
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Standard delivery in 2-3 business days.</span>
                </div>
            </CardContent>
        </Card>
    )
}

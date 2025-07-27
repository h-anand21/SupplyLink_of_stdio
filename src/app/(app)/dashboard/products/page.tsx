
"use client";

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts } from "@/lib/data"
import type { Product } from "@/lib/types";

const initialSupplierProducts = mockProducts.filter(p => p.supplierId === 'sup-1');

export default function DashboardProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialSupplierProducts);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'reviews' | 'rating' | 'supplierId' | 'supplierName'>>({
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        availability: true,
        imageUrl: 'https://placehold.co/400x400.png',
        imageHint: 'new product',
        description: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewProduct(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setNewProduct(prev => ({ ...prev, category: value }));
    }

    const handleAddProduct = () => {
        const productToAdd: Product = {
            ...newProduct,
            id: `prod-${Math.random().toString(36).substr(2, 9)}`,
            price: Number(newProduct.price),
            quantity: Number(newProduct.quantity),
            reviews: [],
            rating: 0,
            supplierId: 'sup-1',
            supplierName: 'FarmFresh Co.'
        };
        setProducts(prev => [productToAdd, ...prev]);
        setIsAddProductOpen(false);
        // Reset form
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            quantity: 0,
            availability: true,
            imageUrl: 'https://placehold.co/400x400.png',
            imageHint: 'new product',
            description: '',
        });
    }


    return (
        <>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>My Products</CardTitle>
                        <CardDescription>
                        Manage your products and view their sales performance.
                        </CardDescription>
                    </div>
                    <Button onClick={() => setIsAddProductOpen(true)}>Add New Product</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Stock
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                    <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                        data-ai-hint={product.imageHint}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.name}
                    </TableCell>
                    <TableCell>
                        <Badge variant={product.availability ? 'outline' : 'destructive'}>
                            {product.availability ? 'Available' : 'Out of Stock'}
                        </Badge>
                    </TableCell>
                    <TableCell>₹{product.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        {product.quantity}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </main>

        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new product to your inventory.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={newProduct.name} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Fresh Tomatoes"/>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                         <Select onValueChange={handleSelectChange} value={newProduct.category}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Food">Food</SelectItem>
                                <SelectItem value="Packaging">Packaging</SelectItem>
                                <SelectItem value="Cleaning">Cleaning</SelectItem>
                                <SelectItem value="Stationery">Stationery</SelectItem>
                                <SelectItem value="Beverage">Beverage</SelectItem>
                                <SelectItem value="Spices">Spices</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (₹)</Label>
                        <Input id="price" type="number" value={newProduct.price} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">Stock</Label>
                        <Input id="quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right pt-2">Description</Label>
                        <Textarea id="description" value={newProduct.description} onChange={handleInputChange} className="col-span-3" placeholder="A short description of the product."/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}

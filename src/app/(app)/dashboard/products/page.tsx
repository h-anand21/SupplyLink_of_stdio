
"use client";

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { useState, useMemo } from "react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts } from "@/lib/data"
import type { Product } from "@/lib/types";

const initialSupplierProducts = mockProducts.filter(p => p.supplierId === 'sup-1');

const EMPTY_PRODUCT_FORM = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    availability: true,
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'new product',
    description: '',
};

export default function DashboardProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialSupplierProducts);
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productFormData, setProductFormData] = useState<Omit<Product, 'id' | 'reviews' | 'rating' | 'supplierId' | 'supplierName'>>(EMPTY_PRODUCT_FORM);

    const isEditing = useMemo(() => !!editingProduct, [editingProduct]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProductFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setProductFormData(prev => ({ ...prev, category: value }));
    }

    const handleOpenDialog = (product: Product | null) => {
        if (product) {
            setEditingProduct(product);
            setProductFormData({
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                availability: product.availability,
                imageUrl: product.imageUrl,
                imageHint: product.imageHint,
                description: product.description,
            });
        } else {
            setEditingProduct(null);
            setProductFormData(EMPTY_PRODUCT_FORM);
        }
        setIsProductDialogOpen(true);
    }
    
    const handleCloseDialog = () => {
        setIsProductDialogOpen(false);
        setEditingProduct(null);
        setProductFormData(EMPTY_PRODUCT_FORM);
    }

    const handleSubmitProduct = () => {
        if (isEditing && editingProduct) {
            // Update existing product
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...editingProduct, ...productFormData, price: Number(productFormData.price), quantity: Number(productFormData.quantity) } : p));
        } else {
            // Add new product
            const newProduct: Product = {
                ...productFormData,
                id: `prod-${Math.random().toString(36).substr(2, 9)}`,
                price: Number(productFormData.price),
                quantity: Number(productFormData.quantity),
                reviews: [],
                rating: 0,
                supplierId: 'sup-1',
                supplierName: 'FarmFresh Co.'
            };
            setProducts(prev => [newProduct, ...prev]);
        }
        handleCloseDialog();
    }

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        }
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
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
                    <Button onClick={() => handleOpenDialog(null)}>Add New Product</Button>
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
                            <DropdownMenuItem onClick={() => handleOpenDialog(product)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteClick(product)} className="text-destructive">Delete</DropdownMenuItem>
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

        {/* Add/Edit Product Dialog */}
        <Dialog open={isProductDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this product.' : 'Fill in the details below to add a new product.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={productFormData.name} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Fresh Tomatoes"/>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                         <Select onValueChange={handleSelectChange} value={productFormData.category}>
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
                        <Input id="price" type="number" value={productFormData.price} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">Stock</Label>
                        <Input id="quantity" type="number" value={productFormData.quantity} onChange={handleInputChange} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right pt-2">Description</Label>
                        <Textarea id="description" value={productFormData.description} onChange={handleInputChange} className="col-span-3" placeholder="A short description of the product."/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSubmitProduct}>{isEditing ? 'Save Changes' : 'Add Product'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    product "{productToDelete?.name}".
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )

    
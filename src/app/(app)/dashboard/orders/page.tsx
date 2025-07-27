
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Label } from "@/components/ui/label";
import type { Order, OrderStatus, OrderItem } from "@/lib/types"
import { mockProducts } from "@/lib/data";

const initialOrders: Order[] = [
    {
        id: "ORD002",
        vendorId: "vendor-1",
        items: [{productId: "prod-4", productName: "Idaho Potatoes", quantity: 10, price: 22.00}],
        total: 220.00,
        status: "Pending",
        orderDate: "2023-10-25",
    },
    {
        id: "ORD003",
        vendorId: "vendor-2",
        items: [
            {productId: "prod-2", productName: "Premium Cooking Oil", quantity: 2, price: 45.50},
        ],
        total: 91.00,
        status: "Pending",
        orderDate: "2023-10-26",
    },
    {
        id: "ORD005",
        vendorId: "vendor-3",
        items: [{productId: "prod-1", productName: "Fresh Red Onions", quantity: 10, price: 15.99}],
        total: 159.90,
        status: "Approved",
        orderDate: "2023-10-24",
    },
    {
        id: "ORD006",
        vendorId: "vendor-4",
        items: [{productId: "prod-1", productName: "Fresh Red Onions", quantity: 2, price: 15.99}],
        total: 31.98,
        status: "Shipped",
        orderDate: "2023-10-22",
    },
];

const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case "Shipped":
        return "secondary";
      case "Approved":
        return "default";
      case "Pending":
          return "destructive"
      default:
        return "secondary";
    }
};

export default function DashboardOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    return (
        <>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Incoming Orders</CardTitle>
                        <CardDescription>
                        Approve and manage incoming orders from vendors.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>Vendor #{order.vendorId.split('-')[1]}</TableCell>
                                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    {order.status === 'Pending' && (
                                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(order.id, 'Approved')}>
                                            Approve
                                        </Button>
                                    )}
                                    {order.status === 'Approved' && (
                                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(order.id, 'Shipped')}>
                                            Mark as Shipped
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="ml-2" onClick={() => handleViewDetails(order)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>

             {/* View Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                    Information for order #{selectedOrder?.id}
                    </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="order-id" className="text-right">Order ID</Label>
                        <span id="order-id" className="col-span-3 font-mono text-sm">{selectedOrder.id}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order-date" className="text-right">Date</Label>
                            <span id="order-date" className="col-span-3">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vendor" className="text-right">Vendor</Label>
                            <span id="vendor" className="col-span-3">Vendor #{selectedOrder.vendorId.split('-')[1]}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order-status" className="text-right">Status</Label>
                            <Badge id="order-status" variant={getStatusVariant(selectedOrder.status)} className="w-fit">{selectedOrder.status}</Badge>
                        </div>
                        <div className="mt-2">
                            <h4 className="font-semibold mb-2">Items</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Subtotal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedOrder.items.map(item => (
                                        <TableRow key={(item as OrderItem).productId}>
                                            <TableCell>{(item as OrderItem).productName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">₹{(item.quantity * item.price).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end items-center font-bold text-lg mt-2">
                            <span className="mr-4">Total:</span>
                            <span>₹{selectedOrder.total.toFixed(2)}</span>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

    
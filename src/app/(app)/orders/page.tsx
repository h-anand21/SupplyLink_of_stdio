
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Textarea } from "@/components/ui/textarea";
import { Star, ShoppingCart } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { mockProducts } from "@/lib/data";

const initialOrders: Order[] = [
    {
        id: "ORD001",
        vendorId: "vendor-1",
        items: [{...mockProducts[0], quantity: 5 }],
        total: 79.95,
        status: "Delivered",
        orderDate: "2023-10-20",
        deliveryDate: "2023-10-22"
    },
    {
        id: "ORD002",
        vendorId: "vendor-1",
        items: [{...mockProducts[3], quantity: 10 }],
        total: 220.00,
        status: "Shipped",
        orderDate: "2023-10-25",
    },
    {
        id: "ORD003",
        vendorId: "vendor-1",
        items: [
            {...mockProducts[1], quantity: 2},
            {...mockProducts[2], quantity: 1}
        ],
        total: 116.00,
        status: "Approved",
        orderDate: "2023-10-26",
    },
    {
        id: "ORD004",
        vendorId: "vendor-1",
        items: [{...mockProducts[5], quantity: 3}],
        total: 105.00,
        status: "Pending",
        orderDate: "2023-10-27",
    }
];

const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "default";
      case "Shipped":
        return "secondary";
      case "Approved":
        return "outline";
      case "Pending":
          return "destructive"
      case "Draft":
        return "secondary"
      default:
        return "secondary";
    }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { cartItems, clearCart } = useCart();

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleRateSupplier = (order: Order) => {
    setSelectedOrder(order);
    setRating(0);
    setReviewComment("");
    setIsRatingOpen(true);
  };

  const handleRatingSubmit = () => {
    console.log("Submitting rating for order:", selectedOrder?.id, { rating, reviewComment });
    // Here you would typically call an API to save the review
    setIsRatingOpen(false);
  }

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `ORD${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
      vendorId: "vendor-1",
      items: cartItems.map(item => ({...item, quantity: 1})), // Assuming quantity 1 for now
      total: cartItems.reduce((acc, item) => acc + item.price, 0),
      status: "Pending",
      orderDate: new Date().toISOString().split('T')[0],
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  }

  const renderStars = (currentRating: number, setRating?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < currentRating ? "text-primary fill-primary" : "text-muted-foreground/30"
        } ${setRating ? 'cursor-pointer' : ''}`}
        onClick={() => setRating?.(i + 1)}
      />
    ));
  };
  
  const draftOrder: Order | null = cartItems.length > 0 ? {
    id: "DRAFT-001",
    vendorId: "vendor-1",
    items: cartItems.map(item => ({ ...item, quantity: 1 })),
    total: cartItems.reduce((acc, item) => acc + item.price, 0),
    status: "Draft",
    orderDate: new Date().toISOString().split('T')[0]
  } : null;

  const allOrders = draftOrder ? [draftOrder, ...orders] : orders;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            View your order history and track the status of current orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="mx-auto h-12 w-12" />
              <p className="mt-4">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                        {order.status === 'Draft' ? (
                          <Button size="sm" onClick={handlePlaceOrder}>Place Order</Button>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                                View Details
                            </Button>
                            {order.status === 'Delivered' && (
                                <Button variant="default" size="sm" className="ml-2" onClick={() => handleRateSupplier(order)}>
                                    Rate Supplier
                                </Button>
                            )}
                          </>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

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
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
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

       {/* Rate Supplier Dialog */}
      <Dialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Supplier</DialogTitle>
            <DialogDescription>
              Share your feedback for order #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
                <Label htmlFor="rating" className="mb-2">Your Rating</Label>
                <div className="flex items-center gap-1">
                 {renderStars(rating, setRating)}
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="comment">Comments</Label>
                <Textarea id="comment" placeholder="Tell us about your experience..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleRatingSubmit} disabled={rating === 0}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

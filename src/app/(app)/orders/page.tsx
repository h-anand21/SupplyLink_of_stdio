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
import type { Order, OrderStatus } from "@/lib/types";

const mockOrders: Order[] = [
    {
        id: "ORD001",
        vendorId: "vendor-1",
        items: [{productId: "prod-1", productName: "Fresh Red Onions", quantity: 5, price: 15.99}],
        total: 79.95,
        status: "Delivered",
        orderDate: "2023-10-20",
        deliveryDate: "2023-10-22"
    },
    {
        id: "ORD002",
        vendorId: "vendor-1",
        items: [{productId: "prod-4", productName: "Idaho Potatoes", quantity: 10, price: 22.00}],
        total: 220.00,
        status: "Shipped",
        orderDate: "2023-10-25",
    },
    {
        id: "ORD003",
        vendorId: "vendor-1",
        items: [
            {productId: "prod-2", productName: "Premium Cooking Oil", quantity: 2, price: 45.50},
            {productId: "prod-3", productName: "Organic All-Purpose Flour", quantity: 1, price: 25.00}
        ],
        total: 116.00,
        status: "Approved",
        orderDate: "2023-10-26",
    },
    {
        id: "ORD004",
        vendorId: "vendor-1",
        items: [{productId: "prod-6", productName: "San Marzano Tomatoes", quantity: 3, price: 35.00}],
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
      default:
        return "secondary";
    }
};

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>
          View your order history and track the status of current orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                    {order.status === 'Delivered' && (
                        <Button variant="default" size="sm" className="ml-2">
                            Rate Supplier
                        </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

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
import type { Order, OrderStatus } from "@/lib/types"

const mockOrders: Order[] = [
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
    return (
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
                        {mockOrders.map((order) => (
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
                                    <Button variant="outline" size="sm">
                                        Approve
                                    </Button>
                                )}
                                {order.status === 'Approved' && (
                                     <Button variant="outline" size="sm">
                                        Mark as Shipped
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm" className="ml-2">
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
    )
}


"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const faqs = [
    {
        question: "How do I place an order?",
        answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You will see your draft order on the 'My Orders' page, where you can confirm and place it."
    },
    {
        question: "What are the payment options?",
        answer: "Currently, we operate on a 'payment on delivery' basis. We are working on integrating online payment methods soon."
    },
    {
        question: "How can I track my order?",
        answer: "You can track the status of your order in the 'My Orders' section of your account. The status will be updated from 'Pending' to 'Approved', 'Shipped', and finally 'Delivered'."
    },
    {
        question: "How do I become a supplier?",
        answer: "During signup, you can choose the 'Supplier' role. You will then be able to list and manage your products through the supplier dashboard."
    }
]


export default function SupportPage() {
    const { toast } = useToast();

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Contact form submitted:", data);
        
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. Our support team will get back to you shortly.",
        });

        e.currentTarget.reset();
    }
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
                Find answers to common questions about our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                           {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
                Can't find an answer? Fill out the form below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleContactSubmit}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your Name" required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required/>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="e.g., Order Inquiry" required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message..." required/>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">Send Message</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

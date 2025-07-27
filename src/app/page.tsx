import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SupplyLinkLogo } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SupplyLinkLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">SupplyLink</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
              Fresh Supplies, Delivered Fast.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              SupplyLink connects street food vendors with trusted suppliers for quality raw materials, seamless ordering, and reliable delivery.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started as a Vendor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Join as a Supplier</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold font-headline">Empowering Local Food Businesses</h3>
                <p className="mt-4 text-muted-foreground">
                  From bustling food trucks to neighborhood stalls, we provide the backbone for your business to thrive. No more haggling, no more uncertainty. Just quality ingredients when you need them.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">Verified Suppliers</h4>
                      <p className="text-muted-foreground">Access a network of suppliers vetted for quality and reliability.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">Transparent Pricing</h4>
                      <p className="text-muted-foreground">Browse materials with clear pricing. What you see is what you pay.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">Effortless Ordering</h4>
                      <p className="text-muted-foreground">Place orders in minutes and track them right to your doorstep.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                 <Image src="https://images.unsplash.com/photo-1695654399871-5c42812e30b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxFbXBvd2VyaW5nJTIwTG9jYWwlMjBGb29kJTIwQnVzaW5lc3NlcyUyMHByZXNvbnxlbnwwfHx8fDE3NTM2MzU1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Street food vendor" layout="fill" objectFit="cover" data-ai-hint="food vendor" />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <h3 className="text-3xl font-bold text-center font-headline">How It Works</h3>
            <p className="text-muted-foreground text-center mt-2 max-w-2xl mx-auto">A simple, streamlined process for vendors and suppliers.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Package className="h-8 w-8 text-primary"/>
                            </div>
                        </div>
                        <CardTitle className="text-center">1. Browse & Order</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Vendors browse a wide catalog of raw materials and place orders with just a few clicks.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Truck className="h-8 w-8 text-primary"/>
                            </div>
                        </div>
                        <CardTitle className="text-center">2. Fulfill & Deliver</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Suppliers receive orders instantly, manage inventory, and update delivery status.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Star className="h-8 w-8 text-primary"/>
                            </div>
                        </div>
                        <CardTitle className="text-center">3. Rate & Repeat</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        After delivery, vendors rate suppliers, building a community of trust and ensuring quality.
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SupplyLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Header } from "@/components/header";
import { CartProvider } from "@/context/cart-context";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-secondary/20">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}

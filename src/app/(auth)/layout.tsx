import { SupplyLinkLogo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
        <div className="w-full max-w-sm">
            <div className="mb-6 flex justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <SupplyLinkLogo className="h-10 w-10 text-primary" />
                    <span className="text-2xl font-bold font-headline">SupplyLink</span>
                </Link>
            </div>
            {children}
        </div>
    </div>
  );
}


"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  CircleUser,
  Menu,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SupplyLinkLogo } from "./icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import type { Role } from "@/lib/types"

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data()?.role);
        }
      } else if (!loading) {
        // If not loading and no user, push to login
        // But not if they are already on an auth page
        if (!['/login', '/signup'].includes(pathname)) {
            router.push('/login');
        }
      }
    };
    fetchUserRole();
  }, [user, loading, router, pathname]);

  const vendorLinks = [
    { name: "Browse", href: "/browse" },
    { name: "My Orders", href: "/orders" },
  ];

  const supplierLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Orders", href: "/dashboard/orders" },
  ];

  const navLinks = userRole === 'vendor' ? vendorLinks : (userRole === 'supplier' ? supplierLinks : []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  }

  if (loading || !user) {
      return (
         <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            {/* You could add a skeleton loader here */}
         </header>
      )
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={userRole === 'vendor' ? '/browse' : '/dashboard'}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <SupplyLinkLogo className="h-6 w-6 text-primary" />
          <span className="sr-only">SupplyLink</span>
        </Link>
        {navLinks.map((link) => (
             <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                {link.name}
            </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href={userRole === 'vendor' ? '/browse' : '/dashboard'}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <SupplyLinkLogo className="h-6 w-6 text-primary" />
              <span className="sr-only">SupplyLink</span>
            </Link>
            {navLinks.map((link) => (
             <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                {link.name}
            </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

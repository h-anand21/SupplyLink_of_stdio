
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import type { Role } from "@/lib/types";

// Basic email regex
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Clear mock auth on load
    localStorage.removeItem('userRole');
  }, []);

  const validateForm = () => {
    if (!emailRegex.test(email)) {
        toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive",
        });
        return false;
    }
    if (!password) {
        toast({
            title: "Password Required",
            description: "Please enter your password.",
            variant: "destructive",
        });
        return false;
    }
    return true;
  }

  const handleLogin = () => {
    if (!validateForm()) return;
    setIsLoading(true);

    // Mock login logic
    // We'll use the email to determine the role for this mock.
    // 'vendor@example.com' for vendor, 'supplier@example.com' for supplier
    let role: Role = 'vendor';
    if (email.startsWith('supplier')) {
      role = 'supplier';
    }

    // Store role in localStorage to simulate session
    localStorage.setItem('userRole', role);

    toast({
      title: "Signed In!",
      description: "Welcome back.",
    });

    setTimeout(() => {
        if (role === "supplier") {
            router.push("/dashboard");
        } else {
            router.push("/browse");
        }
        setIsLoading(false);
    }, 1000);
  };


  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Use `vendor@example.com` or `supplier@example.com` to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="vendor@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
        <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
                Sign up
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

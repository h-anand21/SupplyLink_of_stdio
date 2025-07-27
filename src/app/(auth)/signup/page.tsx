
"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import type { Role } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

// Basic email regex
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;


export default function SignupPage() {
  const [role, setRole] = useState<Role>("vendor");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const validateForm = () => {
    if (!name) {
      toast({
        title: "Name Required",
        description: "Please enter your name or your business name.",
        variant: "destructive",
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  const handleCreateAccount = () => {
    if (!validateForm()) return;
    setIsLoading(true);

    // Mock signup logic
    // Store role in localStorage to simulate session
    localStorage.setItem('userRole', role);

    toast({
      title: "Account Created!",
      description: "Welcome to VendorLink Express.",
    });

    // Redirect to dashboard based on role
    setTimeout(() => {
        if (role === "supplier") {
            router.push("/dashboard");
        } else {
            router.push("/browse");
        }
        setIsLoading(false);
    }, 1000)
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Choose your role and enter your details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Label>I am a...</Label>
            <RadioGroup 
              defaultValue="vendor" 
              className="grid grid-cols-2 gap-4"
              onValueChange={(value: Role) => setRole(value)}
              value={role}
            >
                <div>
                    <RadioGroupItem value="vendor" id="vendor" className="peer sr-only" />
                    <Label
                    htmlFor="vendor"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    Vendor
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="supplier" id="supplier" className="peer sr-only" />
                    <Label
                    htmlFor="supplier"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    Supplier
                    </Label>
                </div>
            </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="Taco King" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreateAccount()} />
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
        <Button className="w-full" onClick={handleCreateAccount} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
                Sign in
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

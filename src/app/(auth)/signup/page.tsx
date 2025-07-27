
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";


export default function SignupPage() {
  const [role, setRole] = useState<Role>("vendor");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Save user role in Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role,
        createdAt: new Date()
      });

      toast({
        title: "Account Created!",
        description: "Welcome to SupplyLink.",
      });

      // Redirect to dashboard based on role
      if (role === "supplier") {
        router.push("/dashboard");
      } else {
        router.push("/browse");
      }
    } catch (error: any) {
      console.error("Signup Error: ", error);
      toast({
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
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
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

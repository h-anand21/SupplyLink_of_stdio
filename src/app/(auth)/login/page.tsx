
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
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const docSnap = await getDoc(doc(db, "users", uid));

      if (!docSnap.exists()) {
        throw new Error("No user role found.");
      }
      
      const role = docSnap.data()?.role;

      toast({
        title: "Signed In!",
        description: "Welcome back.",
      });

      if (role === "supplier") {
        router.push("/dashboard");
      } else {
        router.push("/browse");
      }

    } catch (error: any) {
      console.error("Login Error: ", error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
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

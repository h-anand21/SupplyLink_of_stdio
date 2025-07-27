
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { mockUser } from "@/lib/data";
import { useState, useRef } from "react";
import type { User } from "@/lib/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prev => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would upload the new photo and then save the user data.
    const updatedUser = { ...user, avatarUrl: avatarPreview || user.avatarUrl };
    setUser(updatedUser);

    toast({
      title: "Profile Updated",
      description: "Your account information has been saved.",
    });
    console.log("Updated user data:", updatedUser);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Manage your account settings and personal information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarPreview || user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
              <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={user.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user.role} disabled className="capitalize bg-muted/50" />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


'use client';

import { useState, useEffect } from "react";
import ProfileClient from "./ProfileClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, UserCheck, Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/firebase/auth/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfilePage() {
    const { user, isLoading } = useUser();
    const { toast } = useToast();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");


    useEffect(() => {
        if (user) {
            setNewName(user.displayName || "");
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        if (!user) return;
        if (!newName.trim()) {
            toast({
                title: "নাম প্রয়োজন",
                description: "অনুগ্রহ করে একটি নাম লিখুন।",
                variant: "destructive",
            });
            return;
        }

        setIsUpdating(true);
        try {
            const profilePromise = updateProfile(user, {
                displayName: newName,
            });

            const passwordPromise = newPassword.trim() 
                ? updatePassword(user, newPassword) 
                : Promise.resolve();

            await Promise.all([profilePromise, passwordPromise]);
            
            toast({
                title: "সফল",
                description: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
            });
            setIsEditDialogOpen(false);
            setNewPassword("");
        } catch (error: any) {
            console.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে:", error);
             let description = "প্রোফাইল আপডেট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।";
            if (error.code === 'auth/requires-recent-login') {
                description = "এই কাজটি করার জন্য আপনাকে পুনরায় লগইন করতে হবে।";
            }
            toast({
                title: "ত্রুটি",
                description: description,
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const displayName = user?.displayName || "নতুন ব্যবহারকারী";
    const avatarSrc = user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid || 'default'}`;
    const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-12">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="h-40 relative">
                     <Image 
                        src="https://picsum.photos/1200/300"
                        alt="Profile banner"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="abstract background"
                     />
                     <div className="absolute inset-0 bg-black/30" />
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <Avatar className="h-32 w-32 border-4 border-background">
                            {isLoading ? (
                                <Skeleton className="h-full w-full rounded-full" />
                            ) : (
                                <>
                                 <AvatarImage src={avatarSrc} alt={displayName} data-ai-hint="profile person" />
                                 <AvatarFallback>{avatarFallback}</AvatarFallback>
                                </>
                            )}
                        </Avatar>
                     </div>
                </div>
                <div className="text-center pt-20 pb-8 px-6">
                    {isLoading ? (
                        <Skeleton className="h-9 w-48 mx-auto" />
                    ) : (
                        <h1 className="text-3xl font-bold font-headline">{displayName}</h1>
                    )}
                    <p className="text-muted-foreground mt-1">ঢাকা, বাংলাদেশ</p>
                    
                    <div className="mt-6 flex justify-center gap-4 flex-wrap">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                                 <Button variant="outline">
                                    <Edit className="mr-2 h-4 w-4"/> প্রোফাইল সম্পাদনা
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>প্রোফাইল সম্পাদনা</DialogTitle>
                                <DialogDescription>
                                    আপনার প্রোফাইলের তথ্য এখানে পরিবর্তন করুন। পরিবর্তনের পর সংরক্ষণ করুন।
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        নাম
                                        </Label>
                                        <Input
                                        id="name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                        ইমেল
                                        </Label>
                                        <Input
                                        id="email"
                                        type="email"
                                        value={user?.email || ''}
                                        className="col-span-3"
                                        disabled
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                        পাসওয়ার্ড
                                        </Label>
                                        <Input
                                        id="password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="col-span-3"
                                        placeholder="নতুন পাসওয়ার্ড দিন (ঐচ্ছিক)"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                <Button onClick={handleProfileUpdate} disabled={isUpdating}>
                                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    সংরক্ষণ করুন
                                </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button>
                           <Mail className="mr-2"/> বার্তা পাঠান
                        </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 divide-x max-w-sm mx-auto">
                        <div className="px-2">
                            <p className="text-xl font-bold">১২৮</p>
                            <p className="text-sm text-muted-foreground">উত্তর</p>
                        </div>
                         <div className="px-2">
                            <p className="text-xl font-bold">১.৩k</p>
                            <p className="text-sm text-muted-foreground">আপভোট</p>
                        </div>
                         <div className="px-2">
                            <p className="text-xl font-bold">সেরা ৫%</p>
                            <p className="text-sm text-muted-foreground">র‍্যাঙ্ক</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileClient />
        </div>
    </div>
  );
}

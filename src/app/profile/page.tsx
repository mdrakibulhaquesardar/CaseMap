
'use client';

import ProfileClient from "./ProfileClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, UserCheck, Edit } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/firebase/auth/use-user";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const { user, isLoading } = useUser();

    const displayName = user?.displayName || "New User";
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
                    <p className="text-muted-foreground mt-1">Dhaka, Bangladesh</p>
                    
                    <div className="mt-6 flex justify-center gap-4 flex-wrap">
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4"/> Edit Profile
                        </Button>
                        <Button>
                           <Mail className="mr-2"/> Message
                        </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 divide-x max-w-sm mx-auto">
                        <div className="px-2">
                            <p className="text-xl font-bold">128</p>
                            <p className="text-sm text-muted-foreground">Answers</p>
                        </div>
                         <div className="px-2">
                            <p className="text-xl font-bold">1.3k</p>
                            <p className="text-sm text-muted-foreground">Upvotes</p>
                        </div>
                         <div className="px-2">
                            <p className="text-xl font-bold">Top 5%</p>
                            <p className="text-sm text-muted-foreground">Rank</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileClient />
        </div>
    </div>
  );
}

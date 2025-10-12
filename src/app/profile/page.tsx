import ProfileClient from "./ProfileClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, UserCheck } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
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
                            <AvatarImage src="https://picsum.photos/150" alt="User Name" data-ai-hint="profile person" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                     </div>
                </div>
                <div className="text-center pt-20 pb-8 px-6">
                    <h1 className="text-3xl font-bold font-headline">Advocate Rakib</h1>
                    <p className="text-muted-foreground mt-1">Dhaka, Bangladesh</p>
                    
                    <div className="mt-6 flex justify-center gap-4 flex-wrap">
                        <Button variant="outline">
                            <UserCheck className="mr-2"/> Following
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

    

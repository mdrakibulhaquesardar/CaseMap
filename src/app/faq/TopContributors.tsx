
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const dummyContributors = [
    {
        uid: '1',
        displayName: 'অ্যাডভোকেট রাকিব',
        photoURL: 'https://i.pravatar.cc/150?u=rakib',
        points: 1250,
        email: ''
    },
    {
        uid: '2',
        displayName: 'লিগ্যাল ঈগল',
        photoURL: 'https://i.pravatar.cc/150?u=eagle',
        points: 980,
        email: ''
    },
    {
        uid: '3',
        displayName: 'ন্যায়বিচার seeker',
        photoURL: 'https://i.pravatar.cc/150?u=seeker',
        points: 750,
        email: ''
    }
];

export default function TopContributors() {
    const loading = false; // Set to false as we are using dummy data
    const contributors = dummyContributors;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Trophy className="text-accent" />
                    সেরা অবদানকারী
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading && (
                    <>
                        <div className="flex items-center gap-3">
                           <Skeleton className="h-9 w-9 rounded-full" />
                           <div className="space-y-1">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-3 w-16" />
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <Skeleton className="h-9 w-9 rounded-full" />
                           <div className="space-y-1">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-3 w-16" />
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <Skeleton className="h-9 w-9 rounded-full" />
                           <div className="space-y-1">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-3 w-16" />
                           </div>
                        </div>
                    </>
                )}
                {!loading && contributors && contributors.map(contributor => {
                    const user = contributor;
                    return (
                        <div key={user.uid} className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.photoURL} alt={user.displayName} />
                                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{user.displayName}</p>
                                <p className="text-xs text-muted-foreground">{user.points || 0} পয়েন্ট</p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}


'use client';

import { useFirestore } from '@/firebase/provider';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { UserProfile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function TopContributors() {
    const firestore = useFirestore();
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, orderBy('points', 'desc'), limit(3));
    const [contributors, loading] = useCollectionData(q);

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
                    const user = contributor as UserProfile;
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

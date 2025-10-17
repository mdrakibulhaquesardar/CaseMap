
import FaqClient from './FaqClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, Trophy, Users, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Suspense } from 'react';

const popularTags = [
  "সম্পত্তি আইন", "ভাড়াটিয়া অধিকার", "সাইবার ক্রাইম", "ডিজিটাল নিরাপত্তা", "শ্রম আইন", "শ্রমিক অধিকার", "পারিবারিক আইন"
];

const topContributors = [
    { name: "অ্যাডভোকেট রাকিব", points: 1250, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "লিগ্যাল ঈগল", points: 980, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "ন্যায়বিচার seeker", points: 750, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
]

function FaqPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold font-headline">কমিউনিটি প্রশ্নোত্তর</h1>
                <p className="mt-2 text-muted-foreground">
                    আপনার আইনি প্রশ্ন করুন এবং আমাদের AI ও কমিউনিটির কাছ থেকে উত্তর পাবেন।
                </p>
            </div>
            <Button size="lg" asChild>
                <Link href="#ask">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    প্রশ্ন করুন
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            <Suspense fallback={<div className="text-center py-8">লোড হচ্ছে...</div>}>
              <FaqClient />
            </Suspense>
          </main>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">আলোচিত বিষয়</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                            <Button key={tag} variant="outline" size="sm" asChild className="text-xs">
                                <Link href="#">{tag}</Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Trophy className="text-accent" />
                    সেরা অবদানকারী
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topContributors.map(contributor => (
                     <div key={contributor.name} className="flex items-center gap-3">
                       <Avatar className="h-9 w-9">
                         <AvatarImage src={contributor.avatar} alt={contributor.name} />
                         <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-semibold text-sm">{contributor.name}</p>
                         <p className="text-xs text-muted-foreground">{contributor.points} পয়েন্ট</p>
                       </div>
                     </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="text-base">অন্যান্য টুলস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                   <Button variant="ghost" className="w-full justify-start gap-2 text-sm" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI ডকুমেন্ট সারসংক্ষেপ
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2 text-sm" asChild>
                       <Link href="/legal-aid">
                        <MapPin className="w-4 h-4 text-primary"/> আইনি সহায়তা কেন্দ্র
                       </Link>
                   </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;

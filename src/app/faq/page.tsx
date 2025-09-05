import FaqClient from './FaqClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, MapPin, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const popularTags = [
  "সম্পত্তি আইন", "ভাড়াটিয়া অধিকার", "সাইবার অপরাধ", "ডিজিটাল নিরাপত্তা", "শ্রম আইন", "শ্রমিক অধিকার", "পারিবারিক আইন"
];

const topContributors = [
    { name: "অ্যাডভোকেট রাকিব", points: 1250, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "লিগ্যাল ঈগল", points: 980, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "জাস্টিস সিকার", points: 750, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
]

function FaqPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">কমিউনিটি প্রশ্নোত্তর</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন এবং আমাদের AI সহকারী এবং কমিউনিটির কাছ থেকে উত্তর পান।
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>জনপ্রিয় বিষয়</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                            <Button key={tag} variant="outline" size="sm" asChild>
                                <Link href="#">{tag}</Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </aside>
          
          <main className="lg:col-span-2">
            <FaqClient />
          </main>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-accent" />
                    শীর্ষ অবদানকারী
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
                         <p className="text-xs text-muted-foreground">{contributor.points} পয়েন্ট</p>
                       </div>
                     </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>সম্পর্কিত রিসোর্স</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI ডকুমেন্ট সারসংক্ষেপ
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/legal-aid">
                        <MapPin className="w-4 h-4 text-primary"/> আইনি সহায়তা কেন্দ্র
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

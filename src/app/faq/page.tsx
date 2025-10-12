import FaqClient from './FaqClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, MapPin, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const popularTags = [
  "Property Law", "Tenant Rights", "Cybercrime", "Digital Security", "Labor Law", "Worker Rights", "Family Law"
];

const topContributors = [
    { name: "Advocate Rakib", points: 1250, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Legal Eagle", points: 980, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "Justice Seeker", points: 750, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
]

function FaqPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Community Q&A</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Ask your legal questions and get answers from our AI assistant and the community.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Popular Topics</CardTitle>
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
                    Top Contributors
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
                         <p className="text-xs text-muted-foreground">{contributor.points} points</p>
                       </div>
                     </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI Document Summarizer
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/legal-aid">
                        <MapPin className="w-4 h-4 text-primary"/> Legal Aid Centers
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

    
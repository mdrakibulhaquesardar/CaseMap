import LawFinderClient from './LawFinderClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, MessagesSquare, Scale } from 'lucide-react';
import Link from 'next/link';

const popularCategories = [
  "Penal Code, 1860", "Code of Civil Procedure, 1908", "Evidence Act, 1872", "Contract Act, 1872", "Specific Relief Act, 1877", "Digital Security Act, 2018"
];

export default function LawFinderPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Law Section Finder</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Search for any law section of Bangladesh by its number or name to get a detailed explanation in Bangla.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
             <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Scale className="text-primary"/> Popular Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {popularCategories.map(tag => (
                            <Button key={tag} variant="outline" size="sm" asChild>
                                <Link href="#">{tag}</Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </aside>
          
          <main className="lg:col-span-2">
            <LawFinderClient />
          </main>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-accent" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>For best results, be specific. For example, "দন্ডবিধি ৩০২ ধারা".</p>
                    <p>You can also search by topic, like "চুরির শাস্তি".</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Related Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI Document Summarizer
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/faq">
                        <MessagesSquare className="w-4 h-4 text-primary"/> Community Q&A
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

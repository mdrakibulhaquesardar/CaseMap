
import FaqClient from './FaqClient';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import TopContributors from './TopContributors';
import { Skeleton } from '@/components/ui/skeleton';


const popularTags = [
  "সম্পত্তি আইন", "ভাড়াটিয়া অধিকার", "সাইবার ক্রাইম", "ডিজিটাল নিরাপত্তা", "শ্রম আইন", "শ্রমিক অধিকার", "পারিবারিক আইন"
];

const FaqSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        ))}
    </div>
);

function FaqPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            <Suspense fallback={<FaqSkeleton />}>
              <FaqClient />
            </Suspense>
          </main>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <div className="p-4 rounded-lg border">
                    <h3 className="text-base font-semibold mb-4">আলোচিত বিষয়</h3>
                    <div className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                            <Button key={tag} variant="outline" size="sm" asChild className="text-xs">
                                <Link href="#">{tag}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <TopContributors />
               <div className="p-4 rounded-lg border">
                <h3 className="text-base font-semibold mb-4">অন্যান্য টুলস</h3>
                <div className="space-y-1">
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
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;

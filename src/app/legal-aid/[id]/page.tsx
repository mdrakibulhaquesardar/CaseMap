
import LegalAidDetailClient from './LegalAidDetailClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function LegalAidDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">কেন্দ্রের বিবরণ লোড হচ্ছে...</p>
            </div>
        }>
            <LegalAidDetailClient centerId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

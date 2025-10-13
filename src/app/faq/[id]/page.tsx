
import FaqDetailClient from './FaqDetailClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function FaqDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        }>
            <FaqDetailClient faqId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

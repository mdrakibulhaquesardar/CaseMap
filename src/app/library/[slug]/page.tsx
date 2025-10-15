
import { libraryDocuments } from '@/lib/library-data';
import { notFound } from 'next/navigation';
import PdfViewer from './PdfViewer';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export function generateStaticParams() {
  return libraryDocuments.map(doc => ({ slug: doc.slug }));
}

export default function PdfViewPage({ params }: { params: { slug: string } }) {
  const document = libraryDocuments.find(doc => doc.slug === params.slug);

  if (!document) {
    notFound();
  }

  return (
      <Suspense fallback={
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
      }>
        <PdfViewer document={document} />
      </Suspense>
  );
}

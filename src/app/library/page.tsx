
import LibraryClient from './LibraryClient';
import { libraryDocuments } from '@/lib/library-data';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Legal Knowledge Library - CaseMap',
  description: 'Explore laws, rights, and legal resources of Bangladesh — free for everyone.',
};

export default function KnowledgeLibraryPage() {
  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Legal Knowledge Library</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore laws, rights, and legal resources of Bangladesh — free for everyone.
          </p>
        </div>
        <Suspense fallback={
          <div className="flex justify-center items-center h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="ml-4">Loading documents...</p>
          </div>
        }>
          <LibraryClient documents={libraryDocuments} />
        </Suspense>
      </div>
    </div>
  );
}

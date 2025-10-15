
'use client';

import { useRouter } from 'next/navigation';
import { LibraryDocument } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

export default function PdfViewer({ document }: { document: LibraryDocument }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex flex-col p-4 md:p-8 lg:p-16">
      <header className="flex-shrink-0 h-16 bg-card border-b flex items-center justify-between px-4 rounded-t-lg">
        <h2 className="font-semibold text-lg truncate">{document.title}</h2>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a href={document.filePath} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
          <Button size="icon" variant="ghost" onClick={() => router.back()}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 w-full h-full bg-muted">
        <iframe
          src={`${document.filePath}#view=fitH`}
          className="w-full h-full border-0 rounded-b-lg"
          title={document.title}
        />
      </div>
    </div>
  );
}

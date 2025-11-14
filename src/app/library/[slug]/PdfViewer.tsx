
'use client';

import { useRouter } from 'next/navigation';
import { LibraryDocument } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function PdfViewer({ document }: { document: LibraryDocument }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-muted z-50 flex flex-col">
      <div className="container mx-auto flex flex-col flex-1 py-8 h-full">
        <Card className="flex-shrink-0 h-16 flex items-center justify-between px-4 rounded-b-none mb-4">
          <h2 className="font-semibold text-lg truncate">{document.title}</h2>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <a href={document.filePath} download>
                <Download className="mr-2 h-4 w-4" />
                ডাউনলোড
              </a>
            </Button>
            <Button size="icon" variant="ghost" onClick={() => router.back()}>
              <X className="h-5 w-5" />
              <span className="sr-only">বন্ধ করুন</span>
            </Button>
          </div>
        </Card>
        <div className="flex-1 w-full h-full shadow-2xl">
          <iframe
            src={`${document.filePath}#view=fitH`}
            className="w-full h-full border-0 rounded-lg"
            title={document.title}
          />
        </div>
      </div>
    </div>
  );
}

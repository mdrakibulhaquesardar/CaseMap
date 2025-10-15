
'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Download, BookOpen, FileText } from 'lucide-react';
import { LibraryDocument } from '@/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;
const categories = ['সব', 'সংবিধান', 'আইন ও বিধান', 'আইনি সচেতনতা', 'বই / প্রকাশনা', 'অধিকার ও নির্দেশিকা'];

const categoryMapping: { [key: string]: string } = {
  'সব': 'All',
  'সংবিধান': 'Constitution',
  'আইন ও বিধান': 'Law & Acts',
  'আইনি সচেতনতা': 'Legal Awareness',
  'বই / প্রকাশনা': 'Books / Publications',
  'অধিকার ও নির্দেশিকা': 'Rights & Guidelines',
};


export default function LibraryClient({ documents }: { documents: LibraryDocument[] }) {
  const [category, setCategory] = useState('সব');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents;
    
    const englishCategory = categoryMapping[category];
    if (englishCategory !== 'All') {
      filtered = filtered.filter(doc => doc.category === englishCategory);
    }

    // Default sort by newest
    filtered.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

    return filtered;
  }, [documents, category]);

  const totalPages = Math.ceil(filteredAndSortedDocuments.length / ITEMS_PER_PAGE);
  const currentDocuments = filteredAndSortedDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'ghost'}
              size="sm"
              className={cn("rounded-full", category === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
              onClick={() => { setCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button variant="link" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
          পরবর্তী ▸
        </Button>
      </div>

      {currentDocuments.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentDocuments.map(doc => (
            <Card
              key={doc.slug}
              variant="hover"
              className="group relative flex flex-col overflow-hidden transition-shadow border-none shadow-none bg-transparent"
              onMouseEnter={() => setHoveredCard(doc.slug)}
              onMouseLeave={() => setHoveredCard(null)}
            >
                <div className="relative aspect-[2/3] w-full">
                    <Image src={doc.thumbnail || "https://picsum.photos/seed/doc/400/600"} alt={doc.title} layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint="book document" />
                     <AnimatePresence>
                        {hoveredCard === doc.slug && (
                           <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center gap-2 p-4"
                           >
                              <Button asChild className="w-full">
                                <Link href={`/library/${doc.slug}`}>
                                  <BookOpen className="mr-2 h-4 w-4" /> পড়ুন
                                </Link>
                              </Button>
                              <Button asChild variant="outline" className="w-full bg-white/20 text-white border-white/50 backdrop-blur-sm">
                                <a href={doc.filePath} download>
                                  <Download className="mr-2 h-4 w-4" /> ডাউনলোড
                                </a>
                              </Button>
                           </motion.div>
                        )}
                    </AnimatePresence>
              </div>
              <div className="pt-3">
                <h3 className="font-semibold text-sm leading-tight truncate text-foreground">{doc.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{doc.author}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">কোনো নথি পাওয়া যায়নি</h3>
            <p>আপনার ফিল্টার মানদণ্ড পরিবর্তন করার চেষ্টা করুন।</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                className={cn(currentPage === 1 ? "pointer-events-none opacity-50" : "", "hidden")}
              />
            </PaginationItem>
             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                 <PaginationItem key={page}>
                    <Button 
                        variant={currentPage === page ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 rounded-full"
                    >
                        {page}
                    </Button>
                </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                className={cn(currentPage === totalPages ? "pointer-events-none opacity-50" : "", "hidden")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

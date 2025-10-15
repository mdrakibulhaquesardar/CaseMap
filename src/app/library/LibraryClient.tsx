
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, BookOpen, FileText } from 'lucide-react';
import { LibraryDocument } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';
import Image from 'next/image';

const ITEMS_PER_PAGE = 9;
const categories = ['All', 'Constitution', 'Law & Acts', 'Legal Awareness', 'Books / Publications', 'Rights & Guidelines'];

export default function LibraryClient({ documents }: { documents: LibraryDocument[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(doc =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category !== 'All') {
      filtered = filtered.filter(doc => doc.category === category);
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.published).getTime() - new Date(b.published).getTime());
    } else if (sortBy === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [documents, searchTerm, category, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedDocuments.length / ITEMS_PER_PAGE);
  const currentDocuments = filteredAndSortedDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search documents by title..."
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Select value={category} onValueChange={(value) => { setCategory(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-full md:w-[200px] h-12">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-full md:w-[180px] h-12">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Sort by Newest</SelectItem>
            <SelectItem value="oldest">Sort by Oldest</SelectItem>
            <SelectItem value="a-z">Sort by A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDocuments.map(doc => (
            <Card key={doc.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 bg-muted flex items-center justify-center">
                 <Image src={doc.thumbnail || "https://picsum.photos/seed/doc/400/250"} alt={doc.title} layout="fill" objectFit="cover" data-ai-hint="book document" />
                 <div className="absolute inset-0 bg-black/40" />
                 <FileText className="w-16 h-16 text-white/50" />
              </div>
              <CardContent className="p-4 flex-grow">
                <Badge variant="secondary" className="mb-2">{doc.category}</Badge>
                <h3 className="font-semibold text-lg leading-tight">{doc.title}</h3>
              </CardContent>
              <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
                <Button asChild className="w-full">
                  <Link href={`/library/${doc.slug}`}>
                    <BookOpen className="mr-2 h-4 w-4" /> Read Online
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={doc.filePath} download>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Documents Found</h3>
            <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
                <span className="p-2 text-sm">Page {currentPage} of {totalPages}</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

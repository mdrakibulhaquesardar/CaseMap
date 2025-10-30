
import LibraryClient from './LibraryClient';
import { libraryDocuments } from '@/lib/library-data';
import { Suspense } from 'react';
import { Loader2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export const metadata = {
  title: 'আইনি জ্ঞান ভান্ডার - Odhikar',
  description: 'বাংলাদেশের আইন, অধিকার এবং আইনি সংস্থান সম্পর্কে জানুন — সকলের জন্য বিনামূল্যে।',
};

const trendingAuthors = [
    { name: "জেমস এলিজা", avatar: "https://i.pravatar.cc/150?u=author1", following: false },
    { name: "উইলিয়াম হেনরি", avatar: "https://i.pravatar.cc/150?u=author2", following: false },
    { name: "আরিয়া আবিগেল", avatar: "https://i.pravatar.cc/150?u=author3", following: true },
    { name: "মিয়া এভলিন", avatar: "https://i.pravatar.cc/150?u=author4", following: false },
    { name: "মাতেও লেভি", avatar: "https://i.pravatar.cc/150?u=author5", following: false },
]

const popularBlogs = [
    { title: "আপনার যা জানা দরকার, সবই এই সপ্তাহে", author: "শিতা", likes: 122, comments: 44, image: "https://picsum.photos/seed/blog1/100/100" },
    { title: "ডিজাইনারদের জন্য নতুন অ্যাপ সহ মোবাইল", author: "মালিক", likes: 88, comments: 22, image: "https://picsum.photos/seed/blog2/100/100" },
    { title: "ব্যবসায় আরও সময় খুঁজে পাওয়ার পাঁচটি উপায়", author: "সোনিক", likes: 12, comments: 4, image: "https://picsum.photos/seed/blog3/100/100" },
]


export default function KnowledgeLibraryPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <main className="lg:col-span-3">
                 <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="নথি, লেখক বা বিষয় অনুসন্ধান করুন..."
                    className="pl-10 h-11 bg-muted border-none"
                  />
                </div>

                <Suspense fallback={
                  <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="ml-4">নথি লোড হচ্ছে...</p>
                  </div>
                }>
                  <LibraryClient documents={libraryDocuments} />
                </Suspense>

                {/* Optional Bottom List Section */}
            </main>
            <aside className="lg:col-span-1 space-y-8">
                 <div className="bg-muted border-none rounded-lg p-6">
                    <h3 className="text-base font-semibold mb-4">আলোচিত লেখক</h3>
                    <div className="space-y-4">
                        {trendingAuthors.map(author => (
                            <div key={author.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={author.avatar} alt={author.name} />
                                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold text-sm">{author.name}</p>
                                </div>
                                <Button size="sm" variant={author.following ? 'default' : 'outline'} className="text-xs rounded-full h-7 px-4">
                                    {author.following ? 'অনুসরণ করছেন' : 'অনুসরণ করুন'}
                                </Button>
                            </div>
                        ))}
                    </div>
                 </div>
                 <div className="bg-muted border-none rounded-lg p-6">
                    <h3 className="text-base font-semibold mb-4">জনপ্রিয় ব্লগ</h3>
                    <div className="space-y-4">
                        {popularBlogs.map(blog => (
                             <div key={blog.title} className="flex items-start gap-4">
                                <Image src={blog.image} alt={blog.title} width={60} height={60} className="rounded-md" data-ai-hint="article thumbnail" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm leading-tight">{blog.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{blog.author} দ্বারা প্রকাশিত</p>
                                </div>
                             </div>
                        ))}
                    </div>
                 </div>
            </aside>
        </div>
      </div>
    </div>
  );
}

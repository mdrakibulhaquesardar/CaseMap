
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
  title: 'Legal Knowledge Library - CaseMap',
  description: 'Explore laws, rights, and legal resources of Bangladesh — free for everyone.',
};

const trendingAuthors = [
    { name: "James Elijah", avatar: "https://i.pravatar.cc/150?u=author1", following: false },
    { name: "William Henry", avatar: "https://i.pravatar.cc/150?u=author2", following: false },
    { name: "Aria Abigail", avatar: "https://i.pravatar.cc/150?u=author3", following: true },
    { name: "Mia Evelyn", avatar: "https://i.pravatar.cc/150?u=author4", following: false },
    { name: "Mateo Levi", avatar: "https://i.pravatar.cc/150?u=author5", following: false },
]

const popularBlogs = [
    { title: "The Week All you need to know about", author: "Sheita", likes: 122, comments: 44, image: "https://picsum.photos/seed/blog1/100/100" },
    { title: "Mobile with new app for designers", author: "Malik", likes: 88, comments: 22, image: "https://picsum.photos/seed/blog2/100/100" },
    { title: "Five ways to find more time in business", author: "Sonic", likes: 12, comments: 4, image: "https://picsum.photos/seed/blog3/100/100" },
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
                    placeholder="Search documents, authors, or topics..."
                    className="pl-10 h-11 bg-muted border-none"
                  />
                </div>

                <Suspense fallback={
                  <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="ml-4">Loading documents...</p>
                  </div>
                }>
                  <LibraryClient documents={libraryDocuments} />
                </Suspense>

                {/* Optional Bottom List Section */}
            </main>
            <aside className="lg:col-span-1 space-y-8">
                 <Card className="bg-muted border-none">
                    <CardHeader>
                        <CardTitle className="text-base">Trending Author</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                    {author.following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                 </Card>
                 <Card className="bg-muted border-none">
                    <CardHeader>
                        <CardTitle className="text-base">Popular Blogs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {popularBlogs.map(blog => (
                             <div key={blog.title} className="flex items-start gap-4">
                                <Image src={blog.image} alt={blog.title} width={60} height={60} className="rounded-md" data-ai-hint="article thumbnail" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm leading-tight">{blog.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Published by {blog.author}</p>
                                </div>
                             </div>
                        ))}
                    </CardContent>
                 </Card>
            </aside>
        </div>
      </div>
    </div>
  );
}

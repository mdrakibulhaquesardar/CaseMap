import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Scale, Users } from 'lucide-react';
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">অধিকারী-এর পরিচয়</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            দেশের নাগরিকদের আইনি তথ্য ও বিচার ব্যবস্থা সম্পর্কে জানতে এবং প্রয়োজনীয় সরঞ্জাম দিয়ে সহায়তা করাই আমাদের লক্ষ্য।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">আমাদের লক্ষ্য</h2>
            <p className="text-muted-foreground leading-relaxed">
              অধিকারী-এর মূল উদ্দেশ্য হলো বাংলাদেশের সাধারণ মানুষের জন্য আইনি প্রক্রিয়াকে সহজবোধ্য করে তোলা। আমরা বিশ্বাস করি, ন্যায়বিচার পাওয়ার প্রথম ধাপ হলো স্বচ্ছ এবং বোধগম্য তথ্য। প্রযুক্তি ও কৃত্রিম বুদ্ধিমত্তার মাধ্যমে আমরা নাগরিক এবং বিচার ব্যবস্থার মধ্যকার দূরত্ব কমিয়ে আনতে চাই, যাতে আইনি সচেতনতা একটি মৌলিক অধিকারে পরিণত হয়, কোনো বিশেষ সুবিধা নয়।
            </p>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Team collaborating" 
              width={500}
              height={350}
              className="rounded-lg shadow-xl"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="hover:shadow-lg transition-shadow p-6 rounded-lg border">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">সকলের জন্য न्याय</h3>
            <p className="mt-2 text-muted-foreground">
              আমরা প্রত্যেকের জন্য আইনি প্রক্রিয়াকে স্বচ্ছ এবং সহজলভ্য করতে প্রতিশ্রুতিবদ্ধ, তাদের পটভূমি বা শিক্ষাগত যোগ্যতা নির্বিশেষে।
            </p>
          </div>
          <div className="hover:shadow-lg transition-shadow p-6 rounded-lg border">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">AI দিয়ে নতুন দিগন্ত</h3>
            <p className="mt-2 text-muted-foreground">
              Google Gemini-এর মতো অত্যাধুনিক AI ব্যবহার করে আমরা জটিল আইনি পরিভাষাকে সহজ ও কার্যকরী তথ্যে রূপান্তরিত করি।
            </p>
          </div>
          <div className="hover:shadow-lg transition-shadow p-6 rounded-lg border">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">קהילה-ভিত্তিক উদ্যোগ</h3>
            <p className="mt-2 text-muted-foreground">
              আমাদের প্ল্যাটফর্ম একটি সহায়ক কমিউনিটি তৈরি করে, যেখানে ব্যবহারকারীরা জ্ঞান ভাগ করে নিতে এবং নির্দেশনা চাইতে পারেন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Scale, Users } from 'lucide-react';
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">CaseMap সম্পর্কে</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            নাগরিকদের সহজে আইনি তথ্য এবং বিচার ব্যবস্থা সম্পর্কে জানতে প্রয়োজনীয় টুলস দিয়ে ক্ষমতায়ন করা।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">আমাদের লক্ষ্য</h2>
            <p className="text-muted-foreground leading-relaxed">
              CaseMap-এর লক্ষ্য হলো বাংলাদেশের সাধারণ মানুষের জন্য আইনি প্রক্রিয়াকে সহজবোধ্য করা। আমরা বিশ্বাস করি, ন্যায়বিচারের শুরু হয় সুস্পষ্ট এবং বোধগম্য তথ্য পাওয়ার মাধ্যমে। প্রযুক্তি এবং কৃত্রিম বুদ্ধিমত্তার সাহায্যে আমরা নাগরিক এবং বিচার ব্যবস্থার মধ্যেকার দূরত্ব কমিয়ে আনতে চাই, যাতে আইনি সচেতনতা বিশেষ সুবিধা না হয়ে, একটি মৌলিক অধিকারে পরিণত হয়।
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
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">ন্যায়বিচারের সহজলভ্যতা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                আমরা সকলের জন্য আইনি প্রক্রিয়াকে স্বচ্ছ এবং সহজলভ্য করতে প্রতিশ্রুতিবদ্ধ, তাদের পটভূমি বা साक्षरতার স্তর নির্বিশেষে।
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>AI দিয়ে উদ্ভাবন</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Google Gemini-এর মতো অত্যাধুনিক AI ব্যবহার করে আমরা জটিল আইনি পরিভাষাকে সহজ এবং কার্যকর তথ্যে রূপান্তর করি।
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>קהילתিক কেন্দ্রিকতা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                আমাদের প্ল্যাটফর্ম একটি সহায়ক কমিউনিটি তৈরি করে যেখানে ব্যবহারকারীরা জ্ঞান ভাগ করে নিতে এবং নির্দেশনা চাইতে পারে, যা সম্মিলিত আইনি সচেতনতা তৈরি করে।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

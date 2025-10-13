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
            নাগরিকদের আইনি তথ্য এবং বিচার ব্যবস্থা সহজে বোঝার জন্য প্রয়োজনীয় সরঞ্জাম দিয়ে ক্ষমতায়ন করা।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">আমাদের লক্ষ্য</h2>
            <p className="text-muted-foreground leading-relaxed">
              CaseMap-এর লক্ষ্য হলো বাংলাদেশের সাধারণ মানুষের জন্য আইনি প্রক্রিয়াকে রহস্যমুক্ত করা। আমরা বিশ্বাস করি যে ন্যায়বিচার স্পষ্ট এবং বোধগম্য তথ্যের অ্যাক্সেস দিয়ে শুরু হয়। প্রযুক্তি এবং কৃত্রিম বুদ্ধিমত্তার ব্যবহার করে, আমরা নাগরিক এবং বিচার ব্যবস্থার মধ্যে ব্যবধান পূরণ করার লক্ষ্য রাখি, আইনি সচেতনতাকে একটি মৌলিক অধিকার হিসাবে তৈরি করি, কোনো সুবিধা নয়।
            </p>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://picsum.photos/500/350" 
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
              <CardTitle className="mt-4">ন্যায়বিচারের অ্যাক্সেস</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                আমরা প্রত্যেকের জন্য আইনি প্রক্রিয়াকে স্বচ্ছ এবং সহজলভ্য করতে প্রতিশ্রুতিবদ্ধ, তাদের পটভূমি বা সাক্ষরতার স্তর নির্বিশেষে।
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>এআই দিয়ে উদ্ভাবন</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                গুগল জেমিনির মতো অত্যাধুনিক এআই ব্যবহার করে, আমরা জটিল আইনি পরিভাষাকে সহজ এবং কার্যকরী তথ্যে রূপান্তরিত করি।
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>קהילה-কেন্দ্রিক</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                আমাদের প্ল্যাটফর্ম একটি সহায়ক কমিউনিটি তৈরি করে যেখানে ব্যবহারকারীরা জ্ঞান ভাগ করে নিতে এবং নির্দেশনা চাইতে পারে, সম্মিলিত আইনি সচেতনতা তৈরি করে।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

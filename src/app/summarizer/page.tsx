
import SummarizerClient from './SummarizerClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, BrainCircuit, FileText } from 'lucide-react';


export default function SummarizerPage() {
  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-12">
            <div className="text-left mb-12">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">AI আইনি নথি সারসংক্ষেপ</h1>
                <p className="mt-2 text-base text-muted-foreground max-w-3xl">
                যেকোনো জটিল আইনি লেখা এখানে পেস্ট করুন এবং মুহূর্তের মধ্যে তার সহজবোধ্য বাংলা সারসংক্ষেপ পান।
                </p>
            </div>

            <SummarizerClient />

            <div className="mt-16">
              <div className="prose dark:prose-invert max-w-none mx-auto">
                  <h2 className="text-3xl font-bold font-headline">এটি যেভাবে কাজ করে</h2>
                  <p>
                    আমাদের AI আইনি নথি সারসংক্ষেপ টুলটি আপনার কাজকে সহজ করার জন্য ডিজাইন করা হয়েছে। আপনি আপনার আইনি নথিটি সরাসরি টেক্সট হিসেবে পেস্ট করতে পারেন অথবা একটি ফাইল (যেমন PDF বা ছবি) আপলোড করতে পারেন। এরপর, আমাদের উন্নত AI মডেল নথিটি বিশ্লেষণ করে এর মূল বিষয়বস্তু, গুরুত্বপূর্ণ ধারা এবং সিদ্ধান্তগুলো শনাক্ত করে। সবশেষে, AI একটি সহজ এবং বোধগম্য বাংলা সারসংক্ষেপ তৈরি করে, যা আইন সম্পর্কে সীমিত জ্ঞান থাকা সত্ত্বেও যে কেউ সহজেই বুঝতে পারে। এই প্রক্রিয়াটি আপনার সময় বাঁচায় এবং জটিল আইনি বিষয়কে সহজ করে তোলে।
                  </p>
              </div>
            </div>
        </div>
    </div>
  );
}

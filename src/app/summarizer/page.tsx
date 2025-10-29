
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
                  <p className="mt-2 text-muted-foreground">
                    মাত্র তিনটি সহজ ধাপে আপনার জটিল আইনি নথিকে সহজবোধ্য সারসংক্ষেপে পরিণত করুন।
                  </p>
                  
                  <h3 className="mt-6">১. নথি আপলোড</h3>
                  <p>
                      আপনার আইনি নথিটি টেক্সট হিসেবে পেস্ট করুন অথবা পিডিএফ/ছবি ফাইল হিসেবে আপলোড করুন।
                  </p>
                  
                  <h3 className="mt-6">২. AI বিশ্লেষণ</h3>
                  <p>
                      আমাদের শক্তিশালী AI মডেল আপনার নথিটি বিশ্লেষণ করে মূল বিষয়বস্তু এবং গুরুত্বপূর্ণ তথ্য শনাক্ত করে।
                  </p>

                  <h3 className="mt-6">৩. সহজ সারসংক্ষেপ</h3>
                  <p>
                      AI একটি সহজ এবং বোধগম্য বাংলা সারসংক্ষেপ তৈরি করে, যা যে কেউ সহজেই বুঝতে পারে।
                  </p>
              </div>
            </div>
        </div>
    </div>
  );
}

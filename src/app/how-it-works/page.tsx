
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Bot, Database, MessageSquare, BookOpen } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    icon: MessageSquare,
    title: '১. প্রশ্ন গ্রহণ',
    description: 'আপনি যখন আপনার আইনি প্রশ্নটি আমাদের চ্যাটবটে লেখেন, সিস্টেমটি প্রথমে আপনার প্রশ্নের মূল উদ্দেশ্য বোঝার চেষ্টা করে। যেমনটা আপনি কথা বলেন, তেমনই লিখুন—আমরা বুঝে নেব!',
  },
  {
    icon: BookOpen,
    title: '২. প্রাসঙ্গিক তথ্য অনুসন্ধান',
    description: 'এরপর, AI বাংলাদেশের আইন, পূর্ববর্তী মামলার রায় এবং আইনি ব্যাখ্যার বিশাল ডেটাবেস থেকে আপনার প্রশ্নের সাথে সম্পর্কিত তথ্য খুঁজে বের করে। আপনার জন্য সবচেয়ে সঠিক তথ্যটাই খুঁজে দেয়!',
  },
  {
    icon: BrainCircuit,
    title: '৩. উত্তর তৈরি',
    description: 'AI সংগৃহীত তথ্যের ওপর ভিত্তি করে একটি খসড়া উত্তর তৈরি করে। এই পর্যায়ে, এটি বিভিন্ন আইনি ধারা ও ধারণাকে একত্রিত করে—সবকিছু আপনার জন্য!',
  },
  {
    icon: Bot,
    title: '৪. সহজ ভাষায় রূপান্তর ও প্রদান',
    description: 'সবশেষে, AI তার তৈরি করা উত্তরটিকে সহজ, সাধারণ মানুষের বোধগম্য বাংলা ভাষায় রূপান্তরিত করে এবং আপনার কাছে উপস্থাপন করে। এখন আর বুঝতে হবে না কঠিন আইনি পরিভাষা!',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">AI যেভাবে কাজ করে</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            আমাদের AI মডেল কীভাবে আপনার আইনি প্রশ্নের উত্তর দেয় তার পেছনের প্রযুক্তি সম্পর্কে জানুন—খুবই মজার!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1593349480503-6857d235219d?q=80&w=1287&auto=format&fit=crop"
              alt="AI process"
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
              data-ai-hint="abstract network"
            />
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full w-fit mt-1">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">ডেটার উৎস</h3>
                <p className="text-muted-foreground">
                    আমাদের AI মডেলটি বাংলাদেশের সংবিধান, দণ্ডবিধি, দেওয়ানী কার্যবিধি, এবং অন্যান্য গুরুত্বপূর্ণ আইনের ওপর ভিত্তি করে প্রশিক্ষিত। আমরা প্রতিনিয়ত আমাদের ডেটাবেস আপডেট করি যাতে আপনি সর্বশেষ এবং সবচেয়ে সঠিক তথ্য পান—আপনার জন্য সবসময় আপ-টু-ডেট!
                </p>
            </div>
             <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">গুরুত্বপূর্ণ সীমাবদ্ধতা</h3>
                <p className="text-muted-foreground">
                    অনুগ্রহ করে মনে রাখবেন, আমাদের AI আইনি তথ্য সরবরাহ করে, কিন্তু এটি কোনোভাবেই আইনি পরামর্শের বিকল্প নয়। প্রতিটি পরিস্থিতি ভিন্ন, তাই জটিল আইনি সমস্যার জন্য সর্বদা একজন অভিজ্ঞ আইনজীবীর সাথে পরামর্শ করুন—আমরা এখানে আছি আপনার সাহায্যের জন্য!
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}

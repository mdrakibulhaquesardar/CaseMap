import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureWithAdvantagesDemo } from "@/components/blocks/demo/FeatureWithAdvantages";
import { FileText, Gavel, MapPin, MessagesSquare, Scale, Briefcase, Home as HomeIcon, Shield, MessageSquare as MessageSquareIcon, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DottedSurface } from "@/components/ui/dotted-surface";

const legalTips = [
  {
    title: "ভাড়াটিয়া অধিকার বোঝা",
    description: "বাংলাদেশে ভাড়াটিয়াদের জন্য উপলব্ধ আইনি সুরক্ষা সম্পর্কে জানুন, যার মধ্যে ভাড়া নিয়ন্ত্রণ এবং উচ্ছেদের নোটিশ অন্তর্ভুক্ত।",
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    link: "/faq"
  },
  {
    title: "শ্রম আইন ২০২৪-এর মুখ্য পরিবর্তন",
    description: "শ্রম আইনের সাম্প্রতিক সংশোধনী এবং কর্মী হিসাবে আপনার অধিকারের উপর এর প্রভাব সম্পর্কে একটি সংক্ষিপ্ত বিবরণ।",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    link: "/faq"
  },
  {
    title: "সাইবার অপরাধের অভিযোগ কিভাবে দায়ের করবেন",
    description: "অনলাইন হয়রানি, জালিয়াতি এবং অন্যান্য ডিজিটাল অপরাধ কর্তৃপক্ষের কাছে রিপোর্ট করার জন্য একটি ধাপে ধাপে নির্দেশিকা।",
    icon: <Shield className="w-8 h-8 text-primary" />,
    link: "/faq"
  }
];

const trendingQuestions = [
    {
        question: "ভাড়াটিয়া বাসা না ছাড়লে বা ভাড়া না দিলে করণীয় কি?",
        answers: 2,
        upvotes: 17,
        tags: ["সম্পত্তি আইন", "ভাড়াটিয়া অধিকার"],
        link: "/faq"
    },
    {
        question: "ডিজিটাল নিরাপত্তা আইনে মামলা কিভাবে করব?",
        answers: 1,
        upvotes: 25,
        tags: ["সাইবার অপরাধ", "ডিজিটাল নিরাপত্তা"],
        link: "/faq"
    },
    {
        question: "শ্রমিক হিসেবে আমার আইনি অধিকার কী কী?",
        answers: 2,
        upvotes: 26,
        tags: ["শ্রম আইন", "কর্মী অধিকার"],
        link: "/faq"
    }
]

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full relative">
        <DottedSurface className="size-full" />
        <div className="relative w-full h-[60vh] text-foreground">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-20">
            <div className="max-w-3xl">
              <Scale className="w-16 h-16 text-accent mx-auto mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
                CaseMap আইনি সহকারী
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                আপনার আইনি পথচলার বিশ্বস্ত সহযোগী। মামলার সর্বশেষ তথ্য, আইনি পরামর্শ এবং সহায়তা এখন হাতের মুঠোয়।
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/timeline">মামলা ট্র্যাক করুন</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/faq">প্রশ্ন জিজ্ঞাসা করুন</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureWithAdvantagesDemo />

      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">সাম্প্রতিক আইনি টিপস ও খবর</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              বাংলাদেশের সাধারণ আইনি বিষয়গুলির উপর সর্বশেষ আপডেট এবং व्यावहारिक পরামর্শের সাথে অবগত থাকুন।
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalTips.map((tip, index) => (
              <Card key={index} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
                    {tip.icon}
                  </div>
                  <CardTitle>{tip.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button variant="link" asChild>
                    <Link href={tip.link}>আরও পড়ুন</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">সব টিপস দেখুন</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">চলতি প্রশ্নাবলী</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              অন্যরা কী জিজ্ঞাসা করছে তা দেখুন এবং আমাদের কমিউনিটি প্রশ্নোত্তর-এ আলোচনায় যোগ দিন।
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {trendingQuestions.map((q, index) => (
              <Link href={q.link} key={index} className="block">
                <Card className="hover:shadow-md transition-shadow hover:border-primary/50">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">{q.question}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-2 gap-4">
                                <div className="flex items-center gap-1.5">
                                    <MessageSquareIcon className="w-4 h-4"/> {q.answers} উত্তর
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <ThumbsUp className="w-4 h-4" /> {q.upvotes} আপভোট
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-wrap gap-2 justify-end max-w-xs">
                           {q.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsYXd8ZW58MHx8fHwxNzU3MDgwMjUxfDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="আইনি আলোচনা" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-md"
              data-ai-hint="legal discussion"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">সহজবোধ্য আইনি সহায়তা</h2>
            <p className="mt-4 text-muted-foreground">
              জটিল আইনি পরিভাষা আর নয়। আমাদের AI Summarizer টুল ব্যবহার করে যেকোনো আইনি নথিকে সহজ বাংলা ভাষায় বুঝে নিন। আপনার অধিকার এবং করণীয় সম্পর্কে জানুন পরিষ্কারভাবে।
            </p>
            <Button asChild className="mt-6">
              <Link href="/summarizer">সারসংক্ষেপ চেষ্টা করুন</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

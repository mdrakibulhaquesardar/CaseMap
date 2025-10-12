
'use client';
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureWithAdvantagesDemo } from "@/components/blocks/demo/FeatureWithAdvantages";
import { FileText, Gavel, MapPin, MessagesSquare, Scale, Briefcase, Home as HomeIcon, Shield, MessageSquare as MessageSquareIcon, ThumbsUp, BookOpen, Sparkles, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Input } from "@/components/ui/input";

// Glow Component
const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_transparent_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.2)_10%,_transparent_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Badge Component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}


// Main Hero Component
interface CaseMapHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

function CaseMapHero({
  badge = "AI-চালিত আইনি সহায়তা",
  title = "AI এর মাধ্যমে আপনার আইনি অধিকার বুঝুন",
  subtitle = "আপনার পরিস্থিতির জন্য তৈরি তাত্ক্ষণিক, AI-চালিত আইনি নির্দেশিকা পান। প্রশ্ন জিজ্ঞাসা করুন, জটিল আইনি ধারণা বুঝুন, এবং আত্মবিশ্বাসের সাথে আপনার আইনি যাত্রা নেভিগেট করুন।",
  placeholder = "একটি আইনি প্রশ্ন জিজ্ঞাসা করুন... (যেমন, ভাড়াটিয়া হিসেবে আমার অধিকার কী?)",
}: CaseMapHeroProps) {
  const [query, setQuery] = React.useState("");

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-blue-950/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <Glow variant="top" className="opacity-40" />
      </div>

      {/* Decorative Icons */}
      <div className="absolute left-[10%] top-[20%] hidden animate-pulse opacity-20 lg:block">
        <Scale className="h-16 w-16 text-primary" />
      </div>
      <div className="absolute right-[15%] top-[30%] hidden animate-pulse opacity-20 delay-300 lg:block">
        <BookOpen className="h-14 w-14 text-primary" />
      </div>
      <div className="absolute bottom-[20%] left-[20%] hidden animate-pulse opacity-20 delay-700 lg:block">
        <Sparkles className="h-12 w-12 text-primary" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8 pt-12 text-center sm:pt-20">
          {/* Badge */}
          <Badge
            variant="outline"
            className="animate-fade-in border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-3 w-3" />
            {badge}
          </Badge>

          {/* Title */}
          <h1 className="animate-fade-in max-w-4xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent opacity-0 delay-100 sm:text-6xl md:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in max-w-2xl text-lg text-muted-foreground opacity-0 delay-200 sm:text-xl">
            {subtitle}
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in w-full max-w-3xl opacity-0 delay-300">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 blur-xl" />
              <div className="relative flex items-center gap-2 rounded-2xl border border-border/50 bg-background/80 p-2 shadow-2xl backdrop-blur-sm transition-all hover:border-primary/50 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  AI কে জিজ্ঞাসা করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="animate-fade-in flex flex-wrap items-center justify-center gap-3 opacity-0 delay-500">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">আইনি বিশ্লেষণ</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">মামলার গবেষণা</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-চালিত</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in flex flex-col items-center gap-4 pt-8 opacity-0 delay-700">
            <p className="text-sm text-muted-foreground">
              হাজার হাজার ব্যবহারকারী আইনি স্বচ্ছতার জন্য বিশ্বাস করেন
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-xs text-muted-foreground">প্রশ্নের উত্তর</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-xs text-muted-foreground">সন্তুষ্টির হার</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground">AI উপলব্ধতা</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
}


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
      
      <CaseMapHero />

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


    
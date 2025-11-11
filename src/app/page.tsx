

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Scale, BookOpen, Sparkles, ArrowRight, MessageSquare, FileText, Shield, Zap, Brain, Users, BrainCog, Info, Gavel, MapPin, Clock, Award, Globe, CheckCircle2, Landmark, Briefcase, Heart, Target, TrendingUp } from 'lucide-react';
import { TestimonialsSection } from '@/components/blocks/TestimonialsWithMarquee';
import { Features } from '@/components/ui/features';
import { FaqSectionDemo } from '@/components/blocks/demo/FaqSection';


// Glow Component
const glowVariants = cva('absolute w-full', {
  variants: {
    variant: {
      top: 'top-0',
      above: '-top-[128px]',
      bottom: 'bottom-0',
      below: '-bottom-[128px]',
      center: 'top-[50%]',
    },
  },
  defaultVariants: {
    variant: 'top',
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
        'absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_transparent_60%)] sm:h-[512px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
    <div
      className={cn(
        'absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.2)_10%,_transparent_60%)] sm:h-[256px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
  </div>
));
Glow.displayName = 'Glow';

// Badge Component
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
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
interface OdhikarHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

function OdhikarHero({
  badge = "✨ AI-চালিত আইনি সহায়তা",
  title = "আপনার আইনি অধিকার জানুন, আত্মবিশ্বাসে এগিয়ে যান",
  subtitle = "জটিল আইনি ভাষা বুঝতে কষ্ট হচ্ছে? চিন্তা নেই! আমাদের AI সহকারী আপনার পাশে আছে। আপনার পরিস্থিতি বুঝে মুহূর্তেই সঠিক নির্দেশনা পাবেন। প্রশ্ন করুন, বুঝে নিন, এবং আত্মবিশ্বাসের সাথে আপনার আইনি যাত্রা শুরু করুন।",
  placeholder = "আপনার আইনি প্রশ্নটি এখানে লিখুন... (যেমন: একজন ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?)",
}: OdhikarHeroProps) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/faq?q=${encodeURIComponent(query)}`);
    }
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8 pt-20 text-center sm:pt-20">
          {/* Badge */}
          <Badge
            variant="outline"
            className="animate-fade-in border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-3 w-3" />
            {badge}
          </Badge>

          {/* Title */}
          <h1 className="animate-fade-in my-4 max-w-4xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent opacity-0 delay-100 sm:text-6xl md:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in max-w-2xl text-lg text-muted-foreground opacity-0 delay-200 sm:text-xl">
            {subtitle}
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in w-full max-w-3xl opacity-0 delay-300">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
              <div className="relative flex items-center gap-2 rounded-2xl border border-border/50 bg-background/80 p-2 shadow-2xl backdrop-blur-sm transition-all hover:border-primary/50 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSearch}
                >
                  এখনই জিজ্ঞাসা করুন
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
              <span className="text-muted-foreground">মামলা গবেষণা</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-চালিত</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in flex flex-col items-center gap-4 pt-8 opacity-0 delay-700">
            <p className="text-sm text-muted-foreground">
              হাজারো মানুষ আমাদের বিশ্বাস করে তাদের আইনি সমস্যার সমাধান খুঁজে পাচ্ছেন
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">১০k+</div>
                <div className="text-xs text-muted-foreground">সফল উত্তর</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">৯৫%</div>
                <div className="text-xs text-muted-foreground">খুশি ব্যবহারকারী</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">২৪/৭</div>
                <div className="text-xs text-muted-foreground">সর্বক্ষণ সহায়তা</div>
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


// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: Gavel,
      title: "বাংলাদেশি আইনের বিশাল ভান্ডার",
      description: "সংবিধান থেকে শুরু করে দণ্ডবিধি, দেওয়ানি ও ফৌজদারি আইন—সবকিছুই আপনার হাতের মুঠোয়! বাংলাদেশি আইন অনুযায়ী সঠিক উত্তর পাবেন, এটাই আমাদের প্রতিশ্রুতি।"
    },
    {
      icon: Brain,
      title: "আপনার বন্ধু AI আইনি সহকারী",
      description: "বাংলাদেশি আইনজ্ঞদের হাতে গড়া আমাদের AI সহকারী আপনার পাশে আছে সবসময়। জটিল আইনি প্রশ্নের উত্তর পাবেন মুহূর্তেই, সহজ বাংলায়, নির্ভুলভাবে।"
    },
    {
      icon: FileText,
      title: "জটিল নথি বুঝুন সহজে",
      description: "মামলার কাগজপত্র, চুক্তি, দলিল—যা-ই আপলোড করুন, আমাদের AI তা বিশ্লেষণ করে দেবে সহজ ভাষায়। আর বুঝতে হবে না কঠিন আইনি পরিভাষা!"
    },
    {
      icon: Clock,
      title: "মামলার সবকিছু এক জায়গায়",
      description: "আপনার মামলার গুরুত্বপূর্ণ তারিখ, শুনানি, আদেশ—সবকিছুই এক নজরে দেখুন। কখন কী করতে হবে, আগে থেকেই জানুন, কোনো কিছু মিস করবেন না।"
    },
    {
      icon: MapPin,
      title: "কাছাকাছি আইনি সহায়তা খুঁজুন",
      description: "আপনার এলাকার নিকটবর্তী আইনজীবী, আইনি সহায়তা কেন্দ্র, কোর্ট—সবকিছু খুঁজে পাবেন সহজেই। আরও কাছাকাছি, আরও সহজে।"
    },
    {
      icon: Users,
      title: "হাজারো মানুষের সাথে আলোচনা করুন",
      description: "আইনজীবী, আইনের ছাত্র, বিশেষজ্ঞ—সবার সাথে আলোচনা করুন। আপনার প্রশ্নের উত্তর পাবেন AI এবং অভিজ্ঞ মানুষের কাছ থেকে। একসাথে শিখুন, একসাথে এগিয়ে যান।"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-24 sm:py-32">
      {/* Bangladeshi Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)`,
        }} />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            <Scale className="mr-2 h-3 w-3" />
            আমাদের সেবাসমূহ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
            বাংলাদেশি আইন বুঝুন, আপনার অধিকার জানুন
          </h2>
          <p className="text-lg text-muted-foreground">
            আইন বুঝতে কষ্ট হচ্ছে? চিন্তা নেই! আমরা বাংলাদেশের আইন ব্যবস্থাকে আপনার দোরগোড়ায় নিয়ে এসেছি। জটিল আইনি ভাষাকে সহজ বাংলায় বুঝুন, আপনার অধিকার জানুন, আত্মবিশ্বাসে এগিয়ে যান।
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/10" />
                
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground font-headline">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: "০১",
      title: "আপনার প্রশ্নটি লিখুন",
      description: "আপনার আইনি জিজ্ঞাসা সহজ বাংলায় লিখুন, যেমনটা আপনি কথা বলেন। যেমন: 'একজন ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?' কোনো কঠিন আইনি পরিভাষা ব্যবহার করার দরকার নেই—আমরা বুঝে নেব!",
      icon: MessageSquare
    },
    {
      number: "০২",
      title: "AI আপনার জন্য খুঁজে বের করে",
      description: "আমাদের বুদ্ধিমান AI আপনার প্রশ্ন বুঝে বাংলাদেশের বিশাল আইন ভান্ডার থেকে প্রাসঙ্গিক আইন, ধারা ও নজির খুঁজে বের করে। আপনার জন্য সবচেয়ে সঠিক তথ্যটাই খুঁজে দেয়।",
      icon: Brain
    },
    {
      number: "০৩",
      title: "সহজ ভাষায় স্পষ্ট উত্তর পান",
      description: "জটিল আইনি ভাষাকে সহজ বাংলায় রূপান্তর করে আপনার পরিস্থিতি অনুযায়ী স্পষ্ট, কার্যকরী নির্দেশনা পাবেন। বুঝতে হবে না কঠিন শব্দ, সবকিছুই সহজ ভাষায়!",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-primary/5 py-24 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            <Zap className="mr-2 h-3 w-3" />
            প্রক্রিয়া
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
            তিনটি সহজ ধাপে আপনার উত্তর
          </h2>
          <p className="text-lg text-muted-foreground">
            আইনি সহায়তা পাওয়া কখনোই এত সহজ ছিল না! আমাদের AI প্রক্রিয়াটিকে আপনার জন্য খুবই সরল করে তুলেছে। কয়েক মুহূর্তেই আপনার প্রশ্নের উত্তর পেয়ে যাবেন।
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20 grid gap-12 lg:grid-cols-3">
            <div className="absolute left-1/2 top-12 hidden h-px w-full -translate-x-1/2 bg-transparent lg:block">
                <div className="mx-auto w-2/3 border-b-2 border-dashed border-primary/30"></div>
            </div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="relative text-center">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-2xl font-bold text-white shadow-xl shadow-primary/30 transition-all group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/50">
                      {step.number}
                    </div>
                    <div className="absolute z-0 h-20 w-20 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground font-headline">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    author: {
      name: "অ্যাডভোকেট আনিসুর রহমান",
      handle: "ঢাকা জজ কোর্ট",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    },
    text: "অধিকারী সত্যিই আমার মামলা পরিচালনার পুরো ধারণাটাই বদলে দিয়েছে! টাইমলাইন ফিচারটি এক কথায় অসাধারণ—এখন সবসময় আপ-টু-ডেট থাকি। বাংলাদেশি আইন ভান্ডারটি এতই ভালো যে প্রতিদিনই ব্যবহার করি।",
    href: "#",
  },
  {
    author: {
      name: "সালমা আক্তার",
      handle: "পারিবারিক আইন বিশেষজ্ঞ",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    },
    text: "AI ডকুমেন্ট সারসংক্ষেপ আমার কত সময় বাঁচিয়েছে বলতে পারব না! ঘণ্টার পর ঘণ্টা কাজ এখন মিনিটেই শেষ হয়। জটিল আইনি ভাষাকে এত সহজ বাংলায় ভেঙে দেয় যে আমার ক্লায়েন্টরা নিজেরাই তাদের অধিকার বুঝতে পারছে—এটা সত্যিই অসাধারণ!",
    href: "#",
  },
  {
    author: {
      name: "করিম খান",
      handle: "আইনের ছাত্র, ঢাকা বিশ্ববিদ্যালয়",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    },
    text: "আইনের ছাত্র হিসেবে বলছি, কমিউনিটি প্রশ্নোত্তর আমার জন্য সত্যিই একটি অমূল্য সম্পদ! এখানে AI এবং অভিজ্ঞ আইনজীবী—সবার কাছ থেকেই শিখতে পারি। বাংলাদেশি আইন বুঝতে এটা আমার সবচেয়ে বড় সহায়ক।",
  },
  {
    author: {
      name: "রোকেয়া বেগম",
      handle: "ব্যবসায়ী",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    text: "ব্যবসার জন্য আইনি পরামর্শ নিতে অধিকারী ব্যবহার করি। এটা আমাকে আমার অধিকার ও দায়িত্ব সম্পর্কে জানতে সাহায্য করেছে। সহজ বাংলায় আইন বুঝতে পারা সত্যিই খুবই ভালো লাগে—এখন আর আইনজীবীর কাছে ছুটতে হয় না সবসময়!",
  },
];

const features= [
  {
    id: 1,
    icon: BrainCog,
    title: "আপনার বন্ধু AI আইনি সহকারী",
    description:
      "বাংলাদেশি আইনজ্ঞদের হাতে গড়া আমাদের উন্নত AI সহকারী আপনার পাশে আছে সবসময়! আপনার আইনি প্রশ্নের উত্তর পাবেন মুহূর্তেই, নির্ভুলভাবে, সহজ বাংলায়। সংবিধান থেকে শুরু করে দেওয়ানি, ফৌজদারি, পারিবারিক আইন—সবকিছুর উত্তর পাবেন সহজ ভাষায়, বুঝতে হবে না কঠিন পরিভাষা!",
    image: "https://res.cloudinary.com/do7p8mg3q/image/upload/v1761769805/Gemini_Generated_Image_7t9dcd7t9dcd7t9d_vkbusy.png",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "হাজারো মানুষের সাথে আলোচনা করুন",
    description:
      "আইনজীবী, আইনের ছাত্র, বিশেষজ্ঞ—সবার সাথে আলোচনা করুন, শিখুন, জানুন। আপনার আইনি প্রশ্নের উত্তর পাবেন AI এবং অভিজ্ঞ পেশাদারদের কাছ থেকে। বাংলাদেশি আইন বুঝতে এটি সত্যিই একটি অমূল্য সম্পদ—একসাথে শিখুন, একসাথে এগিয়ে যান!",
    image: "https://res.cloudinary.com/do7p8mg3q/image/upload/v1761674950/Generated_Image_October_29_2025_-_12_05AM_xxp8ds.png",
  },
  {
    id: 3,
    icon: FileText,
    title: "জটিল নথি বুঝুন সহজে",
    description:
      "মামলার কাগজপত্র, চুক্তি, দলিল, আদেশ—যেকোনো আইনি নথি আপলোড করুন, মুহূর্তের মধ্যে তার সহজবোধ্য সারসংক্ষেপ এবং ব্যাখ্যা পেয়ে যাবেন। জটিল আইনি ভাষাকে সহজ বাংলায় রূপান্তর করুন—এখন আর বুঝতে হবে না কঠিন শব্দ!",
    image: "https://res.cloudinary.com/do7p8mg3q/image/upload/v1761674950/Generated_Image_October_29_2025_-_12_07AM_oeepml.png",
  },
];

function FeaturesDemo() {
  return (
    <Features
      primaryColor="sky-500"
      progressGradientLight="bg-gradient-to-r from-sky-400 to-sky-500"
      progressGradientDark="bg-gradient-to-r from-sky-300 to-sky-400"
      features={features}
    />
  );
}


export default function Home() {
    return (
    <>
      <OdhikarHero />
      {/* About Section with Video */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/.05),transparent_50%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="text-center lg:text-left space-y-6">
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                        <Info className="mr-2 h-3 w-3" />
                        আমাদের সম্পর্কে
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline leading-tight">
                        বাংলাদেশের আইন বুঝুন, আপনার অধিকার জানুন
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        আইন বুঝতে কষ্ট হচ্ছে? চিন্তা নেই! বাংলাদেশের সংবিধান থেকে শুরু করে দেওয়ানি, ফৌজদারি, শ্রম, পারিবারিক আইন—সবকিছুই এখন আপনার হাতের মুঠোয়। জটিল আইনি ভাষাকে সহজ বাংলায় রূপান্তর করে আমরা আপনার অধিকার জানার পথ সহজ করেছি। এখন আর আইনজীবীর কাছে ছুটতে হবে না সবসময়!
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">বাংলাদেশি আইন ভান্ডার</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">সহজ বাংলা ভাষায়</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">২৪/৭ AI সহায়তা</span>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-video w-full group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border-2 border-border/50">
                        <video
                            className="w-full h-full object-cover"
                            src="https://res.cloudinary.com/do7p8mg3q/video/upload/v1761674294/Generated_File_October_28_2025_-_11_57PM_mrlrqw.mp4"
                            title="অধিকারী Promo Video"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Bangladeshi Law Context Section */}
      <section className="relative bg-background py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
              <Landmark className="mr-2 h-3 w-3" />
              বাংলাদেশি আইন ব্যবস্থা
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-4">
              কেন অধিকারী বেছে নেবেন?
            </h2>
            <p className="text-lg text-muted-foreground">
              বাংলাদেশের আইন ব্যবস্থা জটিল হতে পারে, কিন্তু আপনার অধিকার জানা তো সহজ হওয়া উচিত! আমরা সেই সহজ পথটাই তৈরি করেছি আপনার জন্য।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "সংবিধান",
                description: "বাংলাদেশের সংবিধানের সব ধারা সহজ ভাষায় বুঝুন",
                color: "text-blue-600"
              },
              {
                icon: Gavel,
                title: "দেওয়ানি আইন",
                description: "সম্পত্তি, চুক্তি, দেনা-পাওনা—সবকিছু সহজ ভাষায়",
                color: "text-green-600"
              },
              {
                icon: Shield,
                title: "ফৌজদারি আইন",
                description: "দণ্ডবিধি ও ফৌজদারি কার্যবিধির সম্পূর্ণ গাইড",
                color: "text-red-600"
              },
              {
                icon: Users,
                title: "পারিবারিক আইন",
                description: "বিবাহ, তালাক, উত্তরাধিকার, ভরণপোষণ—সব জানুন",
                color: "text-purple-600"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group relative rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className={`mb-4 inline-flex rounded-lg bg-primary/10 p-3 ${item.color} transition-all group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-headline">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <FeaturesSection />
      <FeaturesDemo />
      <HowItWorksSection />
      <TestimonialsSection
        title="আমাদের ব্যবহারকারীরা যা বলছেন"
        description="হাজারো নাগরিক ও আইন পেশাজীবী আমাদের সাথে আছেন, যারা অধিকারী ব্যবহার করে তাদের আইনি যাত্রাকে সহজ করে তুলছেন। আপনিও যোগ দিন, আপনার গল্পও শুনি!"
        testimonials={testimonials}
      />
      {/* Donation Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-background to-primary/5 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                <Heart className="mr-2 h-3 w-3" />
                আমাদের স্বচ্ছতা
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-4">
                আমাদের সাথে যোগ দিন, আইনি সচেতনতা ছড়িয়ে দিন
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                অধিকারী একটি সম্পূর্ণ বিনামূল্যে প্ল্যাটফর্ম, কিন্তু আমাদের চলতে সাহায্য করুন! আপনার ছোট্ট অনুদানও হাজারো মানুষের কাছে আইনি তথ্য পৌঁছে দিতে সাহায্য করবে।
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8">
              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-headline mb-2">আমাদের লক্ষ্য</h3>
                    <p className="text-muted-foreground">১ বছরের জন্য প্রয়োজনীয় তহবিল</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">৳ ১,০০,০০০</div>
                    <p className="text-sm text-muted-foreground">লক্ষ্যমাত্রা</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full h-6 bg-muted rounded-full overflow-hidden mb-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${(10256 / 100000) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-primary-foreground">
                      {((10256 / 100000) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">সংগৃহীত: <span className="font-bold text-foreground">৳ ১০,২৫৬</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">বাকি: <span className="font-bold text-foreground">৳ ৮৯,৭৪৪</span></span>
                  </div>
                </div>
              </div>

              {/* Donation Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">কেন অনুদান?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    আপনার অনুদান আমাদের AI উন্নত করতে, নতুন ফিচার যোগ করতে এবং আরও বেশি মানুষের কাছে পৌঁছাতে সাহায্য করবে।
                  </p>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">কোথায় যাবে?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    সার্ভার খরচ, AI API খরচ, উন্নয়ন এবং রক্ষণাবেক্ষণ—সবকিছুই স্বচ্ছভাবে দেখানো হবে।
                  </p>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">স্বচ্ছতা</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    আমরা প্রতিমাসে আমাদের আয়-ব্যয়ের রিপোর্ট প্রকাশ করব—আপনার বিশ্বাস আমাদের কাছে গুরুত্বপূর্ণ!
                  </p>
                </div>
              </div>

              {/* Donation Button */}
              <div className="text-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  এখনই অনুদান করুন
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  যেকোনো পরিমাণ অনুদানই আমাদের জন্য মূল্যবান—আপনার সহায়তা আমাদের এগিয়ে যেতে সাহায্য করবে!
                </p>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong>স্বচ্ছতার প্রতিশ্রুতি:</strong> আমরা প্রতিমাসে আমাদের আয়-ব্যয়ের সম্পূর্ণ বিবরণ প্রকাশ করব। 
                আপনার অনুদান কোথায় যাচ্ছে, তা আপনি দেখতে পারবেন—আমরা এখানে আছি আপনার বিশ্বাসের জন্য!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative bg-gradient-to-b from-background to-primary/5 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "১০k+", label: "সফল উত্তর", icon: MessageSquare },
              { number: "৫০০+", label: "আইনজীবী সদস্য", icon: Briefcase },
              { number: "৯৫%", label: "খুশি ব্যবহারকারী", icon: Award },
              { number: "২৪/৭", label: "সর্বক্ষণ সহায়তা", icon: Clock }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-headline">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSectionDemo />
    </>
    );
}

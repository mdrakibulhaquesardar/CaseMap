
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Scale, BookOpen, Sparkles, ArrowRight, MessageSquare, FileText, Shield, Zap, Brain, Users, BrainCog, Info } from 'lucide-react';
import { TestimonialsSection } from '@/components/blocks/TestimonialsWithMarquee';
import { PricingWithComparison } from '@/components/blocks/PricingWithComparison';
import { Features } from '@/components/ui/features';


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
  badge = "AI-চালিত আইনি সহায়তা",
  title = "AI এর সাহায্যে জানুন আপনার আইনি অধিকার",
  subtitle = "আপনার পরিস্থিতি অনুযায়ী AI-এর মাধ্যমে তাৎক্ষণিক আইনি নির্দেশনা পান। প্রশ্ন করুন, জটিল আইনি বিষয় বুঝুন এবং আত্মবিশ্বাসের সাথে আপনার আইনি যাত্রা শুরু করুন।",
  placeholder = "আপনার আইনি প্রশ্নটি লিখুন... (যেমন, একজন ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?)",
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
                  AI-কে জিজ্ঞাসা করুন
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
              আইনি স্বচ্ছতার জন্য হাজারো ব্যবহারকারীর বিশ্বস্ত প্ল্যাটফর্ম
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">১০k+</div>
                <div className="text-xs text-muted-foreground">প্রশ্নের উত্তর</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">৯৫%</div>
                <div className="text-xs text-muted-foreground">সন্তুষ্টির হার</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">২৪/৭</div>
                <div className="text-xs text-muted-foreground">AI সহায়তা</div>
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
      icon: Brain,
      title: "AI আইনি সহকারী",
      description: "আইনি জ্ঞানে প্রশিক্ষিত উন্নত AI দ্বারা আপনার আইনি প্রশ্নের তাৎক্ষণিক উত্তর পান।"
    },
    {
      icon: MessageSquare,
      title: "ইন্টারেক্টিভ চ্যাট",
      description: "আপনার আইনি সমস্যা নিয়ে স্বাভাবিক কথোপকথন করুন এবং ব্যক্তিগতকৃত নির্দেশনা গ্রহণ করুন।"
    },
    {
      icon: FileText,
      title: "নথি বিশ্লেষণ",
      description: "আইনি নথি আপলোড করে AI-চালিত সারসংক্ষেপ এবং ব্যাখ্যা পান।"
    },
    {
      icon: Shield,
      title: "গোপনীয়তা প্রথম",
      description: "আপনার সকল কথোপকথন এনক্রিপ্টেড ও সুরক্ষিত। আমরা আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিই।"
    },
    {
      icon: Zap,
      title: "তাৎক্ষণিক প্রতিক্রিয়া",
      description: "অ্যাপয়েন্টমেন্টের জন্য অপেক্ষা করার প্রয়োজন নেই। যখনই প্রয়োজন, ২৪/৭ আইনি নির্দেশনা পান।"
    },
    {
      icon: Users,
      title: "বিশেষজ্ঞ দ্বারা যাচাইকৃত",
      description: "আমাদের AI যাচাইকৃত আইনি তথ্যের উপর প্রশিক্ষিত এবং সর্বশেষ আইনের সাথে আপডেট থাকে।"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            বৈশিষ্ট্য
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            আইনি স্বচ্ছতার জন্য আপনার প্রয়োজনীয় সবকিছু
          </h2>
          <p className="text-lg text-muted-foreground">
            সকলের জন্য আইনি তথ্য সহজলভ্য ও বোধগম্য করার জন্য ডিজাইন করা শক্তিশালী AI টুলস।
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
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
      title: "আপনার প্রশ্নটি করুন",
      description: "আপনার আইনি জিজ্ঞাসা সহজ বাংলায় টাইপ করুন। কোনো আইনি পরিভাষা ব্যবহারের প্রয়োজন নেই।"
    },
    {
      number: "০২",
      title: "AI বিশ্লেষণ",
      description: "আমাদের AI আপনার প্রশ্ন বিশ্লেষণ করে এবং বিশাল আইনি জ্ঞান ভান্ডার থেকে উত্তর খুঁজে বের করে।"
    },
    {
      number: "০৩",
      title: "তাৎক্ষণিক নির্দেশনা",
      description: "আপনার পরিস্থিতি অনুযায়ী স্পষ্ট, কার্যকরী ও সহজবোধ্য আইনি নির্দেশনা গ্রহণ করুন।"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            কিভাবে কাজ করে
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            তিনটি সহজ ধাপে আইনি নির্দেশনা
          </h2>
          <p className="text-lg text-muted-foreground">
            আইনি সহায়তা পাওয়া এখন আগের চেয়ে অনেক সহজ। আমাদের AI প্রক্রিয়াটিকে আপনার জন্য সরল করে তুলেছে।
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-primary/50 to-transparent lg:block pt-16" />
              )}
              
              <div className="relative">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-2xl font-bold text-white shadow-lg shadow-primary/20">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-3 text-center text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-center text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    author: {
      name: "অ্যাডভোকেট আনিসুর রহমান",
      handle: "@anis_advocate",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    },
    text: "Odhikar আমার মামলা পরিচালনার 방식 পাল্টে দিয়েছে। টাইমলাইন ফিচারটি অসাধারণ এবং আমাকে সবসময় আপ-টু-ডেট রাখে।",
    href: "#",
  },
  {
    author: {
      name: "সালমা আক্তার",
      handle: "@salma_legal",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    },
    text: "AI ডকুমেন্ট সারসংক্ষেপ আমার ঘণ্টার পর ঘণ্টা সময় বাঁচিয়ে দিয়েছে। এটি জটিল আইনি ভাষাকে সহজবোধ্য বাংলায় ভেঙে দেয়।",
    href: "#",
  },
  {
    author: {
      name: "করিম খান",
      handle: "@karim_k",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    },
    text: "একজন আইনের ছাত্র হিসেবে, কমিউনিটি প্রশ্নোত্তর আমার জন্য একটি অমূল্য সম্পদ। আমি এখানে AI এবং অভিজ্ঞ পেশাদারদের কাছ থেকে উত্তর পাই।",
  },
];

const features= [
  {
    id: 1,
    icon: BrainCog,
    title: "AI আইনি সহকারী",
    description:
      "Odhikar-এর AI সহকারীরা নির্দিষ্ট ডোমেইনে প্রশিক্ষিত, যা আপনাকে প্রযুক্তি, কোডিং এবং একাডেমিক বিষয়ে গাইড করে।",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "কমিউনিটি প্রশ্নোত্তর",
    description:
      "বিশেষজ্ঞদের কাছ থেকে তাৎক্ষণিক এবং নির্ভুল সাহায্য পান—সেটা কোডিং হোক বা কঠিন ধারণা বোঝা। তারা তাদের দক্ষতার উপর প্রশিক্ষিত।",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: FileText,
    title: "AI নথি বিশ্লেষণ",
    description:
      "জটিল আইনি নথি আপলোড করে মুহূর্তের মধ্যে তার সহজবোধ্য সারসংক্ষেপ এবং ব্যাখ্যা পান।",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
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
      <section className="relative w-full h-[50vh] my-16 sm:my-24">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="w-full h-full opacity-70"
            src="https://player.cloudinary.com/embed/?cloud_name=do7p8mg3q&public_id=Farmer_Finds_Hope_with_Casemap_zfmack&profile=cld-default&player[autoplay]=true&player[loop]=true&player[muted]=true&player[controls]=false&player[showLogo]=false"
            title="Odhikar Promo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ 
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '177.77vh', // 16/9 aspect ratio
              minWidth: '100%',
              height: '100vh', // 16/9 aspect ratio
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
            }}
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center px-4">
            Odhikar: আপনার বিশ্বস্ত আইনি সঙ্গী
          </h2>
        </div>
      </section>
      <FeaturesSection />
      <FeaturesDemo />
      <HowItWorksSection />
      <TestimonialsSection
        title="আমাদের ব্যবহারকারীরা যা বলছেন"
        description="হাজারো নাগরিক ও আইন পেশাজীবীদের সাথে যোগ দিন, যারা Odhikar ব্যবহার করে তাদের আইনি যাত্রাকে সহজ করে তুলছেন।"
        testimonials={testimonials}
      />
      <PricingWithComparison />
    </>
    );
}

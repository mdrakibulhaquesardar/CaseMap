
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Scale, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

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
interface CaseMapHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

function CaseMapHero({
  badge = 'AI-Powered Legal Assistance',
  title = 'Understand Your Legal Rights with AI',
  subtitle = 'Get instant, AI-powered legal guidance tailored to your situation. Ask questions, understand complex legal concepts, and navigate your legal journey with confidence.',
  placeholder = 'Ask a legal question... (e.g., What are my rights as a tenant?)',
}: CaseMapHeroProps) {
  const [query, setQuery] = React.useState('');

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
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
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
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
                  Ask AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="animate-fade-in flex flex-wrap items-center justify-center gap-3 opacity-0 delay-500">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Legal Analysis</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Case Research</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-Powered</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in flex flex-col items-center gap-4 pt-8 opacity-0 delay-700">
            <p className="text-sm text-muted-foreground">
              Trusted by thousands of users seeking legal clarity
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-xs text-muted-foreground">Questions Answered</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground">AI Availability</div>
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

export default function Home() {
    return <CaseMapHero />
}

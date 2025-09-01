import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function FeatureWithAdvantages() {
  return (
    <div className="w-full py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <Badge>Our Services</Badge>
          <div className="flex gap-2 flex-col mt-4">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-bold font-headline">
              Legal Tools for Everyone
            </h2>
            <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-muted-foreground">
              We provide a suite of powerful, easy-to-use tools designed to make the legal system more accessible and understandable for all citizens.
            </p>
          </div>
          <div className="flex pt-12 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">AI-Powered Summaries</p>
                  <p className="text-muted-foreground text-sm">
                    Translate complex legal jargon into simple, clear Bangla.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Interactive Case Timelines</p>
                  <p className="text-muted-foreground text-sm">
                    Visually track your case's progress from filing to judgment.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Community Q&A Forum</p>
                  <p className="text-muted-foreground text-sm">
                    Get answers to your legal questions from our AI and community.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Legal Aid Center Map</p>
                  <p className="text-muted-foreground text-sm">
                    Easily find and connect with legal aid providers near you.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Law Section Finder</p>
                  <p className="text-muted-foreground text-sm">
                    Search and understand any section of Bangladeshi law.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Personalized Profile</p>
                  <p className="text-muted-foreground text-sm">
                    Save important cases and Q&As for quick future access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureWithAdvantages };

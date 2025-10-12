"use client";

import { Pricing } from "@/components/blocks/Pricing";

const demoPlans = [
  {
    name: "Free",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "AI Document Summarizer (3/day)",
      "Community Q&A Access",
      "Case Timeline Viewer (1 case)",
      "Legal Aid Center Finder",
    ],
    description: "Perfect for individuals starting their legal journey.",
    buttonText: "Start for Free",
    href: "/signup",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "15",
    yearlyPrice: "12",
    period: "per month",
    features: [
        "Unlimited AI Summaries",
        "Priority in Community Q&A",
        "Unlimited Case Timelines",
        "Advanced Law Section Search",
        "Save Cases & Questions",
        "Email Support",
    ],
    description: "Ideal for law students and professionals.",
    buttonText: "Upgrade to Pro",
    href: "/signup",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "50",
    yearlyPrice: "40",
    period: "per user/month",
    features: [
      "Everything in Pro",
      "Team Collaboration Tools",
      "Dedicated Account Manager",
      "Custom Integrations",
      "API Access",
      "24/7 Priority Support",
    ],
    description: "For law firms and large organizations.",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

function PricingBasic() {
  return (
    <div className="w-full">
      <Pricing 
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description={`Choose the plan that works for you.
All plans include access to our powerful AI tools and dedicated support.`}
      />
    </div>
  );
}

export { PricingBasic };

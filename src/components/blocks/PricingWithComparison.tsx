
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for individuals starting their legal journey.",
    buttonText: "Start for Free",
    href: "/signup",
    isPopular: false,
    features: {
        "AI Document Summarizer": "3/day",
        "Community Q&A Access": true,
        "Case Timeline Viewer": "1 case",
        "Legal Aid Center Finder": true,
        "Advanced Law Section Search": false,
        "Save Cases & Questions": false,
        "Email Support": false,
    }
  },
  {
    name: "Pro",
    price: "15",
    description: "Ideal for law students and professionals.",
    buttonText: "Upgrade to Pro",
    href: "/signup",
    isPopular: true,
     features: {
        "AI Document Summarizer": "Unlimited",
        "Community Q&A Access": true,
        "Case Timeline Viewer": "Unlimited",
        "Legal Aid Center Finder": true,
        "Advanced Law Section Search": true,
        "Save Cases & Questions": true,
        "Email Support": true,
    }
  },
  {
    name: "Enterprise",
    price: "50",
    description: "For law firms and large organizations.",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
     features: {
        "AI Document Summarizer": "Unlimited",
        "Community Q&A Access": true,
        "Case Timeline Viewer": "Unlimited",
        "Legal Aid Center Finder": true,
        "Advanced Law Section Search": true,
        "Save Cases & Questions": true,
        "Email Support": "24/7 Priority",
    }
  },
];

const allFeatures = [
    "AI Document Summarizer",
    "Community Q&A Access",
    "Case Timeline Viewer",
    "Legal Aid Center Finder",
    "Advanced Law Section Search",
    "Save Cases & Questions",
    "Email Support",
];


function PricingWithComparison() {
  return (
    <div className="w-full py-20 lg:py-24">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-bold">
              Prices that make sense!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Choose the plan that's right for you. All plans come with our core AI-powered features.
            </p>
          </div>
          <div className="grid text-left w-full grid-cols-4 divide-x pt-12">
            <div className="col-span-1"></div>
            {demoPlans.map((plan) => (
                 <div key={plan.name} className="px-3 py-1 md:px-6 md:py-4  gap-2 flex flex-col">
                    <p className="text-2xl font-semibold">{plan.name}</p>
                    <p className="text-sm text-muted-foreground h-10">
                        {plan.description}
                    </p>
                    <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                        <span className="text-4xl font-bold">৳{plan.price}</span>
                       {plan.price !== "0" && <span className="text-sm text-muted-foreground"> / month</span>}
                    </p>
                    <Button variant={plan.isPopular ? "default" : "outline"} className="gap-4 mt-8">
                        {plan.buttonText} <MoveRight className="w-4 h-4" />
                    </Button>
                </div>
            ))}
           
            <div className="px-3 lg:px-6 col-span-1 py-4 mt-8">
              <b className="text-lg">Features</b>
            </div>
            <div className="col-span-3 mt-8"/>
            
            {allFeatures.map(feature => (
                <>
                    <div className="px-3 lg:px-6 col-span-1 py-4 text-muted-foreground">{feature}</div>
                    {demoPlans.map(plan => {
                        const featureValue = plan.features[feature as keyof typeof plan.features];
                        return (
                             <div key={`${plan.name}-${feature}`} className="px-3 py-1 md:px-6 md:py-4 flex justify-center items-center">
                                {
                                    featureValue === true ? <Check className="w-5 h-5 text-primary" /> :
                                    featureValue === false ? <Minus className="w-5 h-5 text-muted-foreground/50" /> :
                                    <p className="text-sm font-medium text-center">{featureValue}</p>
                                }
                            </div>
                        )
                    })}
                </>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export { PricingWithComparison };

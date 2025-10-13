
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoPlans = [
  {
    name: "ফ্রি",
    price: "0",
    description: "যারা তাদের আইনি যাত্রা শুরু করছেন তাদের জন্য উপযুক্ত।",
    buttonText: "বিনামূল্যে শুরু করুন",
    href: "/signup",
    isPopular: false,
    features: {
        "এআই ডকুমেন্ট সারাংশকারী": "৩/দিন",
        "কমিউনিটি প্রশ্নোত্তর অ্যাক্সেস": true,
        "মামলার টাইমলাইন ভিউয়ার": "১ টি মামলা",
        "আইনি সহায়তা কেন্দ্র ফাইন্ডার": true,
        "উন্নত আইন বিভাগ অনুসন্ধান": false,
        "মামলা ও প্রশ্ন সংরক্ষণ": false,
        "ইমেল সাপোর্ট": false,
    }
  },
  {
    name: "প্রো",
    price: "1500",
    description: "আইনজীবী এবং পেশাদারদের জন্য আদর্শ।",
    buttonText: "প্রো-তে আপগ্রেড করুন",
    href: "/signup",
    isPopular: true,
     features: {
        "এআই ডকুমেন্ট সারাংশকারী": "সীমাহীন",
        "কমিউনিটি প্রশ্নোত্তর অ্যাক্সেস": true,
        "মামলার টাইমলাইন ভিউয়ার": "সীমাহীন",
        "আইনি সহায়তা কেন্দ্র ফাইন্ডার": true,
        "উন্নত আইন বিভাগ অনুসন্ধান": true,
        "মামলা ও প্রশ্ন সংরক্ষণ": true,
        "ইমেল সাপোর্ট": true,
    }
  },
  {
    name: "এন্টারপ্রাইজ",
    price: "5000",
    description: "ল ফার্ম এবং বড় সংস্থাগুলির জন্য।",
    buttonText: "বিক্রয়ের সাথে যোগাযোগ করুন",
    href: "/contact",
    isPopular: false,
     features: {
        "এআই ডকুমেন্ট সারাংশকারী": "সীমাহীন",
        "কমিউনিটি প্রশ্নোত্তর অ্যাক্সেস": true,
        "মামলার টাইমলাইন ভিউয়ার": "সীমাহীন",
        "আইনি সহায়তা কেন্দ্র ফাইন্ডার": true,
        "উন্নত আইন বিভাগ অনুসন্ধান": true,
        "মামলা ও প্রশ্ন সংরক্ষণ": true,
        "ইমেল সাপোর্ট": "২৪/৭ অগ্রাধিকার",
    }
  },
];

const allFeatures = [
    "এআই ডকুমেন্ট সারাংশকারী",
    "কমিউনিটি প্রশ্নোত্তর অ্যাক্সেস",
    "মামলার টাইমলাইন ভিউয়ার",
    "আইনি সহায়তা কেন্দ্র ফাইন্ডার",
    "উন্নত আইন বিভাগ অনুসন্ধান",
    "মামলা ও প্রশ্ন সংরক্ষণ",
    "ইমেল সাপোর্ট",
];


function PricingWithComparison() {
  return (
    <div className="w-full py-20 lg:py-24">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>মূল্য</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-bold">
              যে মূল্য বোধগম্য!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              আপনার জন্য সঠিক প্ল্যানটি বেছে নিন। সমস্ত প্ল্যানে আমাদের মূল এআই-চালিত বৈশিষ্ট্য রয়েছে।
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
                       {plan.price !== "0" && <span className="text-sm text-muted-foreground"> / মাস</span>}
                    </p>
                    <Button variant={plan.isPopular ? "default" : "outline"} className="gap-4 mt-8">
                        {plan.buttonText} <MoveRight className="w-4 h-4" />
                    </Button>
                </div>
            ))}
           
            <div className="px-3 lg:px-6 col-span-1 py-4 mt-8">
              <b className="text-lg">বৈশিষ্ট্য</b>
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

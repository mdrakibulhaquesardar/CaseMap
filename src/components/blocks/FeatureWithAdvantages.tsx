import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function FeatureWithAdvantages() {
  return (
    <div className="w-full py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <Badge>আমাদের সেবা</Badge>
          <div className="flex gap-2 flex-col mt-4">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-bold font-headline">
              সবার জন্য আইনি টুলস
            </h2>
            <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-muted-foreground">
              আমরা শক্তিশালী, সহজে ব্যবহারযোগ্য একটি টুলস স্যুট সরবরাহ করি যা আইনি ব্যবস্থাকে সকল নাগরিকের জন্য আরও সহজলভ্য এবং বোধগম্য করার জন্য ডিজাইন করা হয়েছে।
            </p>
          </div>
          <div className="flex pt-12 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">AI-চালিত সারসংক্ষেপ</p>
                  <p className="text-muted-foreground text-sm">
                    জটিল আইনি পরিভাষা সহজ, स्पष्ट বাংলায় অনুবাদ করুন।
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">ইন্টারেক্টিভ মামলার টাইমলাইন</p>
                  <p className="text-muted-foreground text-sm">
                    ফাইলিং থেকে রায় পর্যন্ত আপনার মামলার অগ্রগতি দৃশ্যত ট্র্যাক করুন।
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">কমিউনিটি প্রশ্নোত্তর ফোরাম</p>
                  <p className="text-muted-foreground text-sm">
                    আমাদের AI এবং কমিউনিটি থেকে আপনার আইনি প্রশ্নের উত্তর পান।
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">আইনি সহায়তা কেন্দ্র ম্যাপ</p>
                  <p className="text-muted-foreground text-sm">
                    আপনার কাছাকাছি আইনি সহায়তা প্রদানকারীদের সহজে খুঁজুন এবং সংযোগ করুন।
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">আইন ধারা खोजকারী</p>
                  <p className="text-muted-foreground text-sm">
                    বাংলাদেশী আইনের যেকোনো ধারা অনুসন্ধান করুন এবং বুঝুন।
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check className="w-5 h-5 mt-1 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">ব্যক্তিগত প্রোফাইল</p>
                  <p className="text-muted-foreground text-sm">
                    ভবিষ্যতে দ্রুত অ্যাক্সেসের জন্য গুরুত্বপূর্ণ মামলা এবং প্রশ্নোত্তর সংরক্ষণ করুন।
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

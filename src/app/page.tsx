import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureWithAdvantagesDemo } from "@/components/blocks/demo/FeatureWithAdvantages";
import { FileText, Gavel, MapPin, MessagesSquare, Scale, Briefcase, Home as HomeIcon, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const legalTips = [
  {
    title: "Understanding Tenant Rights",
    description: "Learn about the legal protections available to tenants in Bangladesh, including rent control and eviction notices.",
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    link: "/faq"
  },
  {
    title: "Key Changes in Labor Law 2024",
    description: "A brief overview of the recent amendments to the labor laws and how they affect your rights as a worker.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    link: "/faq"
  },
  {
    title: "How to File a Cybercrime Complaint",
    description: "A step-by-step guide to reporting online harassment, fraud, and other digital crimes to the authorities.",
    icon: <Shield className="w-8 h-8 text-primary" />,
    link: "/faq"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full relative">
        <div className="relative w-full h-[60vh] text-white">
          <Image
            src="https://picsum.photos/1200/800"
            alt="Law background"
            fill={true}
            style={{objectFit: "cover"}}
            className="z-0"
            data-ai-hint="law books library"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-20">
            <div className="max-w-3xl">
              <Scale className="w-16 h-16 text-accent mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                CaseMap Legal Companion
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                আপনার আইনি পথচলার বিশ্বস্ত সহযোগী। মামলার সর্বশেষ তথ্য, আইনি পরামর্শ এবং সহায়তা এখন হাতের মুঠোয়।
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/timeline">Track a Case</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/faq">Ask a Question</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Recent Legal Tips &amp; News</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest updates and practical advice on common legal issues in Bangladesh.
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
                    <Link href={tip.link}>Read More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">View All Tips</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://picsum.photos/600/400" 
              alt="Legal discussion" 
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
              <Link href="/summarizer">Try Summarizer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
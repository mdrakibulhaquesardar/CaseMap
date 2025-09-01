import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Gavel, MapPin, MessagesSquare, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Case Timeline Viewer",
    description: "Visually track the progress of your case with an interactive timeline.",
    icon: <Gavel className="w-8 h-8 text-primary" />,
    link: "/timeline",
  },
  {
    title: "AI Legal Summarizer",
    description: "Simplify complex legal documents into easy-to-understand Bangla.",
    icon: <FileText className="w-8 h-8 text-primary" />,
    link: "/summarizer",
  },
  {
    title: "Community Q&A",
    description: "Ask legal questions and get answers from AI and the community.",
    icon: <MessagesSquare className="w-8 h-8 text-primary" />,
    link: "/faq",
  },
  {
    title: "Legal Aid Finder",
    description: "Locate nearby legal aid centers on an interactive map.",
    icon: <MapPin className="w-8 h-8 text-primary" />,
    link: "/legal-aid",
  },
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

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
            <p className="mt-2 text-muted-foreground">Empowering you with the right tools and information.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="text-accent">
                    <Link href={feature.link}>Learn More &rarr;</Link>
                  </Button>
                </div>
              </Card>
            ))}
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

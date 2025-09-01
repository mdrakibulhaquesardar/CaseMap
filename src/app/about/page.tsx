import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Scale, Users } from 'lucide-react';
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">About CaseMap</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering citizens with accessible legal information and tools to navigate the justice system with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At CaseMap, our mission is to demystify the legal process for the general public in Bangladesh. We believe that access to justice begins with access to clear, understandable information. By leveraging technology and AI, we aim to bridge the gap between citizens and the legal system, making legal awareness a fundamental right, not a privilege.
            </p>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://picsum.photos/500/350" 
              alt="Team collaborating" 
              width={500}
              height={350}
              className="rounded-lg shadow-xl"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Access to Justice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to making legal processes transparent and accessible to everyone, regardless of their background or literacy level.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Innovation with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Using cutting-edge AI like Google Gemini, we transform complex legal jargon into simple, actionable insights for our users.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Community Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform fosters a supportive community where users can share knowledge and seek guidance, building collective legal awareness.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

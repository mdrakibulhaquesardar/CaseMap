import SummarizerClient from './SummarizerClient';
import { Card, CardContent } from '@/components/ui/card';
import { FileType, Languages, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: FileType,
    title: 'বিভিন্ন ফরম্যাট সাপোর্ট',
    description: 'PDF, JPG, PNG ফাইল আপলোড করুন অথবা সরাসরি টেক্সট পেস্ট করুন।',
  },
  {
    icon: Languages,
    title: 'সহজবোধ্য বাংলা',
    description: 'জটিল আইনি ভাষাকে সহজ ও সাধারণ বাংলায় রূপান্তর করে দেওয়া হয়।',
  },
  {
    icon: ShieldCheck,
    title: 'গোপনীয়তা ও সুরক্ষা',
    description: 'আপনার আপলোড করা সকল নথি সম্পূর্ণ সুরক্ষিত এবং গোপন রাখা হয়।',
  },
];

export default function SummarizerPage() {
  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">AI আইনি নথি সারসংক্ষেপ</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                যেকোনো জটিল আইনি লেখা এখানে পেস্ট করুন এবং মুহূর্তের মধ্যে তার সহজবোধ্য বাংলা সারসংক্ষেপ পান।
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={index} className="bg-background/70 backdrop-blur-sm">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <SummarizerClient />
        </div>
    </div>
  );
}


import SummarizerClient from './SummarizerClient';

export default function SummarizerPage() {
  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-12">
            <div className="text-left mb-12">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">AI আইনি নথি সারসংক্ষেপ</h1>
                <p className="mt-2 text-base text-muted-foreground max-w-3xl">
                যেকোনো জটিল আইনি লেখা এখানে পেস্ট করুন এবং মুহূর্তের মধ্যে তার সহজবোধ্য বাংলা সারসংক্ষেপ পান।
                </p>
            </div>

            <SummarizerClient />
        </div>
    </div>
  );
}


import SummarizerClient from './SummarizerClient';

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

            <SummarizerClient />
        </div>
    </div>
  );
}

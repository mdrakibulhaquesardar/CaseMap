import SummarizerClient from './SummarizerClient';

export default function SummarizerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AI আইনি নথি সারসংক্ষেপ</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          যেকোনো জটিল আইনি পাঠ্য পেস্ট করুন এবং সহজে বোঝা যায় এমন বাংলায় একটি সরলীকৃত সারসংক্ষেপ পান।
        </p>
      </div>
      <SummarizerClient />
    </div>
  );
}

import LegalAidClient from './LegalAidClient';

export default function LegalAidPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">আইনি সহায়তা কেন্দ্র</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          বাংলাদেশ জুড়ে আইনি সহায়তা সংস্থাগুলি খুঁজুন। আপনার অনুসন্ধান সীমিত করতে ফিল্টার ব্যবহার করুন।
        </p>
      </div>
      <LegalAidClient />
    </div>
  );
}

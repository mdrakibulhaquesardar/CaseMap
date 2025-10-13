import LegalAidClient from './LegalAidClient';

export default function LegalAidPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">আইনি সহায়তা কেন্দ্র</h1>
          <p className="mt-2 text-base text-muted-foreground max-w-3xl">
            বাংলাদেশ জুড়ে আইনি সহায়তা সংস্থা খুঁজুন। আপনার অনুসন্ধান সংকীর্ণ করতে ফিল্টার ব্যবহার করুন।
          </p>
        </div>
        <LegalAidClient />
      </div>
    </div>
  );
}

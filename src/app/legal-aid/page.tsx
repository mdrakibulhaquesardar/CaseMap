import LegalAidClient from './LegalAidClient';

export default function LegalAidPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Legal Aid Centers</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find legal aid organizations across Bangladesh. Use the filters to narrow down your search.
        </p>
      </div>
      <LegalAidClient />
    </div>
  );
}

    
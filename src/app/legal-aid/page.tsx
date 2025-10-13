import LegalAidClient from './LegalAidClient';

export default function LegalAidPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">Legal Aid Centers</h1>
          <p className="mt-2 text-base text-muted-foreground max-w-3xl">
            Find legal aid organizations across Bangladesh. Use the filters to narrow down your search.
          </p>
        </div>
        <LegalAidClient />
      </div>
    </div>
  );
}

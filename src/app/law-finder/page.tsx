import LawFinderClient from './LawFinderClient';

export default function LawFinderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Law Section Finder</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Search for any law section of Bangladesh by its number or name to get a detailed explanation in Bangla.
        </p>
      </div>
      <LawFinderClient />
    </div>
  );
}

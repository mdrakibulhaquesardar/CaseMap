import SummarizerClient from './SummarizerClient';

export default function SummarizerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AI Legal Document Summarizer</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Paste any complex legal text and get a simplified summary in easy-to-understand English.
        </p>
      </div>
      <SummarizerClient />
    </div>
  );
}

    
import FaqClient from './FaqClient';

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Legal Q&A</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Ask your legal questions and get answers from our AI assistant and community.
        </p>
      </div>
      <FaqClient />
    </div>
  );
}

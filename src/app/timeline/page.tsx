import TimelineClient from './TimelineClient';

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Case Timeline Viewer</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Enter your case number to see a visual representation of its journey and current status.
        </p>
      </div>
      <TimelineClient />
    </div>
  );
}

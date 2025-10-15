import ChatbotClient from './ChatbotClient';

export default function ChatbotPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 sm:p-6 border-b text-center bg-background">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">AI আইনি চ্যাট</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          আপনার আইনি জিজ্ঞাসার তাৎক্ষণিক উত্তর পান
        </p>
      </div>
      <ChatbotClient />
    </div>
  );
}

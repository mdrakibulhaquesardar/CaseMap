
import PhonebookClient from "./PhonebookClient";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'ফোনবুক - Odhikar',
  description: 'বাংলাদেশের জরুরি, সরকারি এবং আইনি পরিষেবার ফোন নম্বর খুঁজুন।',
};

export default function PhonebookPage() {
  return (
      <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="ml-4">ফোনবুক লোড হচ্ছে...</p>
          </div>
      }>
        <PhonebookClient />
      </Suspense>
  );
}


import PrivacyClient from './PrivacyClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const policySections = [
    { id: 'introduction', title: 'ভূমিকা' },
    { id: 'data-collection', title: 'আমরা যে তথ্য সংগ্রহ করি' },
    { id: 'data-usage', title: 'তথ্যের ব্যবহার' },
    { id: 'data-sharing', title: 'তথ্য শেয়ারিং' },
    { id: 'data-security', title: 'তথ্যের সুরক্ষা' },
    { id: 'user-rights', title: 'আপনার অধিকার' },
    { id: 'cookie-policy', title: 'কুকি নীতি' },
    { id: 'policy-changes', title: 'নীতি পরিবর্তন' },
    { id: 'contact', title: 'যোগাযোগ' },
];

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        }>
            <PrivacyClient sections={policySections} />
        </Suspense>
      </div>
    </div>
  );
}

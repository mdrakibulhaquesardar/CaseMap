
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Fingerprint, Database, UserCheck, Info } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">গোপনীয়তা নীতি</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            আপনার তথ্যের সুরক্ষা ও গোপনীয়তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার পায়।
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Info className="w-6 h-6 text-primary"/>
                ভূমিকা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                CaseMap ব্যবহার করার জন্য আপনাকে ধন্যবাদ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত করি। আমাদের পরিষেবা ব্যবহার করার মাধ্যমে, আপনি এই নীতিতে বর্ণিত অনুশীলনগুলিতে সম্মত হন।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Fingerprint className="w-6 h-6 text-primary"/>
                আমরা যে তথ্য সংগ্রহ করি
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">১. ব্যবহারকারী প্রদত্ত তথ্য:</h3>
                <p className="text-muted-foreground">আপনি যখন একটি অ্যাকাউন্ট তৈরি করেন, তখন আমরা আপনার নাম, ইমেল ঠিকানা এবং পাসওয়ার্ডের মতো তথ্য সংগ্রহ করি। আপনি প্রোফাইলে যে অতিরিক্ত তথ্য দেন, তাও আমরা সংগ্রহ করি।</p>
              </div>
              <div>
                <h3 className="font-semibold">২. ব্যবহারের ডেটা:</h3>
                <p className="text-muted-foreground">আপনি আমাদের প্ল্যাটফর্মে কী করছেন, যেমন—কোন ফিচার ব্যবহার করছেন, কী প্রশ্ন জিজ্ঞাসা করছেন বা কোন আইনি নথি আপলোড করছেন, সেই সম্পর্কিত তথ্য আমরা সংগ্রহ করি। এটি আমাদের পরিষেবা উন্নত করতে সাহায্য করে।</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-primary"/>
                তথ্যের ব্যবহার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>আপনার অভিজ্ঞতাকে ব্যক্তিগতকৃত করতে এবং পরিষেবা প্রদান করতে।</li>
                <li>আমাদের AI মডেলগুলিকে উন্নত করতে এবং আরও সঠিক উত্তর দিতে।</li>
                <li>নিরাপত্তা নিরীক্ষণ এবং আমাদের প্ল্যাটফর্মকে সুরক্ষিত রাখতে।</li>
                <li>প্রয়োজনীয় বিজ্ঞপ্তি এবং আপডেট পাঠাতে।</li>
                <li>গবেষণা ও বিশ্লেষণের জন্য বেনামী এবং সমষ্টিগত ডেটা ব্যবহার করতে।</li>
              </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary"/>
                তথ্যের সুরক্ষা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                আমরা আপনার তথ্য সুরক্ষিত রাখতে ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন এবং সুরক্ষা ব্যবস্থা ব্যবহার করি। আপনার ডেটা অ্যাক্সেস শুধুমাত্র অনুমোদিত কর্মীদের জন্য সীমাবদ্ধ। আমরা আপনার স্পষ্ট সম্মতি ছাড়া কোনো তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি বা ভাড়া দিই না।
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-primary"/>
                আপনার অধিকার
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    আপনার নিজের তথ্য অ্যাক্সেস, সংশোধন বা মুছে ফেলার অধিকার রয়েছে। আপনি আপনার প্রোফাইল সেটিংস থেকে এটি করতে পারেন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করতে পারেন।
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

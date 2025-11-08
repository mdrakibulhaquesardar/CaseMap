
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Section {
    id: string;
    title: string;
}

interface PrivacyClientProps {
    sections: Section[];
}

export default function PrivacyClient({ sections }: PrivacyClientProps) {
    const [activeSection, setActiveSection] = useState<string>('introduction');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            if (visibleSection) {
                setActiveSection(visibleSection.id);
            }
        }, { rootMargin: "-100px 0px -50% 0px" });

        const elements = document.querySelectorAll('section[id]');
        elements.forEach((el) => observer.current?.observe(el));

        return () => {
            elements.forEach((el) => observer.current?.unobserve(el));
        };
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3 prose dark:prose-invert max-w-none">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold font-headline mb-2">গোপনীয়তা নীতি</h1>
                    <p className="text-muted-foreground">সর্বশেষ আপডেট: ২২ এপ্রিল, ২০২৫</p>
                </div>
                
                <section id="introduction">
                    <p>Odhikar ("আমরা", "আমাদের") আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং প্রকাশ করি। এই নীতিটি আমাদের ওয়েবসাইট, মোবাইল অ্যাপ এবং অন্যান্য পরিষেবার ক্ষেত্রে প্রযোজ্য।</p>
                    <p>অনুগ্রহ করে মনে রাখবেন যে এই গোপনীয়তা নীতি আমাদের কর্মচারী বা চাকরির আবেদনকারীদের তথ্য প্রক্রিয়াকরণের ক্ষেত্রে প্রযোজ্য নয়। আমরা আপনাকে আমাদের ব্যবহারের শর্তাবলী পর্যালোচনা করতে উৎসাহিত করি, কারণ এতে আমাদের পরিষেবা ব্যবহারের গুরুত্বপূর্ণ তথ্য রয়েছে।</p>
                </section>

                <section id="data-collection">
                    <h2>১. আমরা যে তথ্য সংগ্রহ করি এবং কী উদ্দেশ্যে?</h2>
                    <p>আপনি যখন আমাদের পরিষেবা ব্যবহার করেন, তখন আমরা বিভিন্ন উৎস থেকে ব্যক্তিগত তথ্য সংগ্রহ করি। এর মধ্যে আপনার প্রদান করা তথ্য, তৃতীয় পক্ষের থেকে প্রাপ্ত তথ্য এবং কুকিজ ও অন্যান্য প্রযুক্তির মাধ্যমে স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য অন্তর্ভুক্ত।</p>
                    <h3>ক. সরাসরি আপনার প্রদান করা তথ্য</h3>
                    <p>আপনি যখন একটি অ্যাকাউন্ট তৈরি করেন, প্রোফাইল আপডেট করেন, বা আমাদের সাথে যোগাযোগ করেন, তখন আমরা আপনার নাম, ইমেল, এবং আপনার জিজ্ঞাসা সম্পর্কিত তথ্য সংগ্রহ করি।</p>
                    <h3>খ. স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য</h3>
                    <p>আপনি আমাদের সাইট ব্যবহার করার সময় আমরা স্বয়ংক্রিয়ভাবে কিছু তথ্য সংগ্রহ করি, যেমন আপনার আইপি অ্যাড্রেস, ব্রাউজারের ধরন, এবং ব্যবহারের সময়।</p>
                </section>

                <section id="data-usage">
                    <h2>২. আমরা আপনার তথ্য কীভাবে ব্যবহার করি?</h2>
                    <p>আপনার ব্যক্তিগত তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করা হয়:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>আমাদের পরিষেবা প্রদান এবং ব্যক্তিগতকৃত করার জন্য।</li>
                        <li>আপনার প্রশ্নের উত্তর দিতে এবং সহায়তা প্রদান করতে।</li>
                        <li>আমাদের AI মডেল উন্নত করতে এবং পরিষেবার মান বাড়াতে।</li>
                        <li>নিরাপত্তা নিরীক্ষণ এবং জালিয়াতি প্রতিরোধ করতে।</li>
                        <li>আপনাকে প্রাসঙ্গিক আপডেট এবং বিজ্ঞপ্তি পাঠাতে।</li>
                    </ul>
                </section>
                
                <section id="data-sharing">
                    <h2>৩. তথ্য শেয়ারিং</h2>
                    <p>আমরা আপনার স্পষ্ট সম্মতি ছাড়া আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা ভাড়া দিই না। তবে, পরিষেবা প্রদানকারী, আইনি বাধ্যবাধকতা, বা আমাদের অধিকার রক্ষার প্রয়োজনে আমরা তথ্য শেয়ার করতে পারি।</p>
                </section>

                <section id="data-security">
                    <h2>৪. তথ্যের সুরক্ষা</h2>
                    <p>আপনার তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা আপনার ডেটা সুরক্ষিত রাখতে ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন এবং অন্যান্য সুরক্ষা ব্যবস্থা ব্যবহার করি। অননুমোদিত অ্যাক্সেস বা প্রকাশ রোধ করতে আমাদের কঠোর নীতি রয়েছে।</p>
                </section>

                <section id="user-rights">
                    <h2>৫. আপনার অধিকার</h2>
                    <p>আপনার নিজের তথ্য অ্যাক্সেস, সংশোধন বা মুছে ফেলার অধিকার রয়েছে। আপনি আপনার প্রোফাইল সেটিংস থেকে এই কাজগুলো করতে পারেন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করতে পারেন। আমরা আপনার অনুরোধ আইনি প্রয়োজনীয়তা অনুসারে প্রক্রিয়া করব।</p>
                </section>
                
                <section id="cookie-policy">
                    <h2>৬. কুকি নীতি</h2>
                    <p>আমাদের ওয়েবসাইট উন্নত অভিজ্ঞতা প্রদানের জন্য কুকিজ ব্যবহার করে। কুকিজ হলো ছোট টেক্সট ফাইল যা আপনার ব্রাউজারে সংরক্ষিত থাকে। আপনি আপনার ব্রাউজার সেটিংস পরিবর্তন করে কুকিজ গ্রহণ বা প্রত্যাখ্যান করতে পারেন, তবে এটি সাইটের কিছু কার্যকারিতা প্রভাবিত করতে পারে।</p>
                </section>

                <section id="policy-changes">
                    <h2>৭. নীতি পরিবর্তন</h2>
                    <p>আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। যেকোনো পরিবর্তনের পরে, আমরা এই পেজে নতুন নীতি পোস্ট করব এবং আপডেটের তারিখ পরিবর্তন করব।</p>
                </section>
                
                <section id="contact">
                    <h2>৮. যোগাযোগ</h2>
                    <p>এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন বা উদ্বেগ থাকলে, অনুগ্রহ করে আমাদের সাথে [আপনার যোগাযোগের ইমেল] এই ঠিকানায় যোগাযোগ করুন।</p>
                </section>
            </main>

            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                    <h3 className="font-semibold mb-4">এই আর্টিকেলে</h3>
                    <ol className="space-y-3">
                        {sections.map(section => (
                            <li key={section.id}>
                                <a 
                                    href={`#${section.id}`}
                                    className={cn(
                                        "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                        activeSection === section.id && "text-primary font-semibold"
                                    )}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </aside>
        </div>
    );
}

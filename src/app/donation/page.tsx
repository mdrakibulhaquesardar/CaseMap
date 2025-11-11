
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, CreditCard, User, Mail, DollarSign, BarChart, Info, Sparkles, CheckCircle, Banknote, Copy } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const donationAmounts = [100, 500, 1000, 2000];

const monthlyCosts = [
    { name: 'AI এবং API খরচ', cost: 3000, color: 'bg-blue-500' },
    { name: 'সার্ভার ও হোস্টিং', cost: 2000, color: 'bg-green-500' },
    { name: 'উন্নয়ন ও রক্ষণাবেক্ষণ', cost: 2500, color: 'bg-yellow-500' },
    { name: 'গবেষণা ও উন্নয়ন (R&D)', cost: 1000, color: 'bg-purple-500' },
    { name: 'অন্যান্য', cost: 500, color: 'bg-orange-500' },
]
const totalCost = monthlyCosts.reduce((acc, item) => acc + item.cost, 0);

const faqs = [
    {
        q: "আমার অনুদান কিভাবে ব্যবহৃত হবে?",
        a: "আপনার অনুদান সরাসরি আমাদের প্ল্যাটফর্মের উন্নয়নে ব্যবহৃত হবে, যেমন—AI মডেলের উন্নয়ন, সার্ভার রক্ষণাবেক্ষণ, এবং নতুন ফিচার যুক্ত করা, যাতে আমরা আরও বেশি মানুষকে বিনামূল্যে আইনি সহায়তা দিতে পারি।"
    },
    {
        q: "আমি কি আমার অনুদানের জন্য কোনো রশিদ পাব?",
        a: "হ্যাঁ, আপনি যদি আপনার ইমেল ঠিকানা প্রদান করেন, আমরা আপনাকে আপনার অনুদানের একটি স্বীকৃতি এবং রশিদ পাঠিয়ে দেব। আপনার সমর্থন আমাদের জন্য অত্যন্ত মূল্যবান।"
    },
    {
        q: "অনুদান কি ফেরতযোগ্য?",
        a: "সাধারণত অনুদান ফেরতযোগ্য নয়। তবে, যদি কোনো প্রযুক্তিগত ত্রুটির কারণে একাধিকবার অনুদান দেওয়া হয়, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আমরা বিষয়টি সমাধান করার চেষ্টা করব।"
    }
]

export default function DonationPage() {
    const [amount, setAmount] = useState('500');
    const [customAmount, setCustomAmount] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const { toast } = useToast();
    
    const finalAmount = isCustom ? customAmount : amount;
    const collectedAmount = 4600;

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${label} কপি করা হয়েছে`,
            description: `${text} আপনার ক্লিপবোর্ডে কপি করা হয়েছে।`
        })
    }

    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <Heart className="w-10 h-10 text-primary" />
                        <div>
                            <h1 className="text-2xl md:text-2xl font-bold font-headline text-foreground">আমাদের সমর্থন করুন</h1>
                            <p className="mt-1 text-muted-foreground max-w-2xl">
                                আপনার ছোট্ট অনুদানও হাজারো মানুষের কাছে আইনি তথ্য পৌঁছে দিতে পারে।
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-5 gap-8">
                    <main className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">অনুদান করুন</CardTitle>
                                <CardDescription>আপনার অনুদান আমাদের এগিয়ে যেতে সাহায্য করবে।</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">পরিমাণ নির্বাচন করুন (৳)</h3>
                                        <RadioGroup
                                        defaultValue="500"
                                        className="grid grid-cols-2 md:grid-cols-5 gap-4"
                                        onValueChange={(value) => {
                                            setAmount(value);
                                            setIsCustom(false);
                                        }}
                                        value={isCustom ? 'custom' : amount}
                                        >
                                            {donationAmounts.map(val => (
                                                <div key={val}>
                                                    <RadioGroupItem value={String(val)} id={`amount-${val}`} className="sr-only" />
                                                    <Label 
                                                        htmlFor={`amount-${val}`}
                                                        className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${!isCustom && amount === String(val) ? 'border-primary ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'}`}
                                                    >
                                                        <span className="text-xl">{val}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                            <div>
                                                <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                                                <Label 
                                                    htmlFor="amount-custom"
                                                    className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${isCustom ? 'border-primary ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'}`}
                                                    onClick={() => setIsCustom(true)}
                                                >
                                                    <span className="text-lg">অন্যান্য</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        {isCustom && (
                                            <div className="mt-4 relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    placeholder="আপনার পরিমাণ দিন"
                                                    className="pl-10 text-lg h-12"
                                                    value={customAmount}
                                                    onChange={(e) => setCustomAmount(e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">আপনার তথ্য (ঐচ্ছিক)</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="আপনার নাম" className="pl-10 h-11" />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input type="email" placeholder="আপনার ইমেল" className="pl-10 h-11" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">পেমেন্ট পদ্ধতি</h3>
                                        <div className="p-4 border rounded-lg bg-muted/50">
                                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                                <Image src="https://static.vecteezy.com/system/resources/previews/068/842/080/non_2x/bkash-logo-horizontal-mobile-banking-app-icon-emblem-transparent-background-free-png.png" alt="bKash" width={70} height={70} data-ai-hint="bkash logo" />
                                                <Image src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" alt="Nagad" width={40} height={40} data-ai-hint="nagad logo" />
                                               
                                                <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={50} height={50} data-ai-hint="visa logo" />
                                                <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={50} height={50} data-ai-hint="mastercard logo" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="lg" className="w-full text-lg h-12">
                                                    <CreditCard className="mr-2 h-5 w-5" />
                                                    ৳{finalAmount || 0} অনুদান করুন
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="flex items-center gap-2">
                                                        <Banknote /> অনুদান প্রক্রিয়া
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        অনুগ্রহ করে নিচের যেকোনো একটি পদ্ধতিতে আপনার অনুদান সম্পন্ন করুন এবং ট্রানজেকশন আইডি জমা দিন।
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div>
                                                        <h4 className="font-semibold mb-2">ব্যাংক অ্যাকাউন্ট</h4>
                                                        <div className="p-3 bg-muted rounded-md border text-sm">
                                                            <p><strong>ব্যাংকের নাম:</strong> ABC ব্যাংক লিমিটেড</p>
                                                            <div className="flex justify-between items-center">
                                                                <p><strong>অ্যাকাউন্ট নম্বর:</strong> 1234567890123</p>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard('1234567890123', 'অ্যাকাউন্ট নম্বর')}>
                                                                    <Copy className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                            <p><strong>ব্রাঞ্চ:</strong> গুলশান, ঢাকা</p>
                                                        </div>
                                                    </div>
                                                     <div>
                                                        <h4 className="font-semibold mb-2">মোবাইল ব্যাংকিং (বিকাশ)</h4>
                                                        <div className="p-3 bg-muted rounded-md border text-sm">
                                                            <div className="flex justify-between items-center">
                                                                <p><strong>বিকাশ নম্বর:</strong> 01700123456</p>
                                                                 <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard('01700123456', 'বিকাশ নম্বর')}>
                                                                    <Copy className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">অনুগ্রহ করে "সেন্ড মানি" অপশন ব্যবহার করুন।</p>
                                                        </div>
                                                    </div>
                                                     <div>
                                                        <Label htmlFor="trxId">ট্রানজেকশন আইডি</Label>
                                                        <Input 
                                                            id="trxId"
                                                            placeholder="অনুগ্রহ করে আপনার ট্রানজেকশন আইডি লিখুন"
                                                            value={transactionId}
                                                            onChange={(e) => setTransactionId(e.target.value)}
                                                        />
                                                     </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={() => toast({ title: "ধন্যবাদ!", description: "আপনার ট্রানজেকশন আইডি জমা দেওয়া হয়েছে।" })}>জমা দিন</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </main>

                    <aside className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart /> মাসিক লক্ষ্যের দিকে
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-2xl font-bold text-primary">৳{Number(collectedAmount).toLocaleString('bn-BD')}</span>
                                        <span className="text-sm text-muted-foreground">/ ৳{totalCost.toLocaleString('bn-BD')}</span>
                                    </div>
                                    <Progress value={(collectedAmount / totalCost) * 100} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-1">আমাদের মাসিক লক্ষ্য পূরণে সাহায্য করুন।</p>
                                </div>
                                <h4 className="font-semibold text-sm mb-2">মাসিক খরচ (আনুমানিক)</h4>
                                <div className="space-y-2">
                                    {monthlyCosts.map(item => (
                                        <div key={item.name}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>{item.name}</span>
                                                <span>৳{item.cost.toLocaleString('bn-BD')}</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-1.5">
                                                <div className={`${item.color} h-1.5 rounded-full`} style={{width: `${(item.cost/totalCost)*100}%`}}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles /> আপনার অনুদানের প্রভাব
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">প্ল্যাটফর্মকে সচল রাখে</h4>
                                        <p className="text-sm text-muted-foreground">আপনার অনুদান আমাদের সার্ভার এবং API খরচ চালাতে সাহায্য করে, যাতে আমরা নিরবচ্ছিন্ন সেবা দিতে পারি।</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">AI মডেলের উন্নয়ন</h4>
                                        <p className="text-sm text-muted-foreground">আমরা আমাদের AI মডেলকে আরও উন্নত করতে পারি, যাতে আপনি আরও সঠিক এবং প্রাসঙ্গিক আইনি তথ্য পান।</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">আরও মানুষের কাছে পৌঁছানো</h4>
                                        <p className="text-sm text-muted-foreground">আপনার সমর্থনে আমরা আরও বেশি মানুষের কাছে আইনি সচেতনতা পৌঁছে দিতে পারি এবং নতুন ফিচার যুক্ত করতে পারি।</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Info /> প্রায়শই জিজ্ঞাসিত প্রশ্ন
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                   {faqs.map((faq, i) => (
                                     <AccordionItem value={`item-${i}`} key={i}>
                                        <AccordionTrigger>{faq.q}</AccordionTrigger>
                                        <AccordionContent>{faq.a}</AccordionContent>
                                    </AccordionItem>
                                   ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}

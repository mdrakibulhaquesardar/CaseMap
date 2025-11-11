
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, CreditCard, User, Mail, DollarSign } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const donationAmounts = [100, 500, 1000, 2000];

export default function DonationPage() {
    const [amount, setAmount] = useState('500');
    const [customAmount, setCustomAmount] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    
    const finalAmount = isCustom ? customAmount : amount;

    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Heart className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">আমাদের সমর্থন করুন</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            আপনার ছোট্ট অনুদানও হাজারো মানুষের কাছে আইনি তথ্য পৌঁছে দিতে পারে। আপনার সমর্থনে আমরা আমাদের প্ল্যাটফর্মকে আরও উন্নত করতে পারব।
                        </p>
                    </div>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">অনুদান করুন</CardTitle>
                            <CardDescription>আপনার অনুদান আমাদের এগিয়ে যেতে সাহায্য করবে।</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">পরিমাণ নির্বাচন করুন</h3>
                                    <RadioGroup
                                      defaultValue="500"
                                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
                                                    <span className="text-xl font-bold">৳{val}</span>
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
                                                <span className="text-lg font-semibold">অন্যান্য</span>
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
                                            <Image src="https://cdn.iconscout.com/icon/free/png-256/free-bKash-3-722702.png" alt="bKash" width={60} height={60} data-ai-hint="bkash logo" />
                                            <Image src="https://play-lh.googleusercontent.com/Iks014Ul-02H435y0dG-3c_I5sSP_G8X2nE9V20i_SS0lH22EaTjV6y6e6M77onq3w" alt="Nagad" width={60} height={60} data-ai-hint="nagad logo" />
                                            <Image src="https://media.licdn.com/dms/image/D560BAQHo-X_j03I8Dw/company-logo_200_200/0/1693892323386/dutchbanglabanklimited_logo?e=2147483647&v=beta&t=f9hS_S2-3KzJ5eQw3zD-jGg2g5d-j-g_p3j-z-g-k_s" alt="Rocket" width={60} height={60} data-ai-hint="rocket logo" />
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={60} height={40} data-ai-hint="visa logo" />
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={60} height={40} data-ai-hint="mastercard logo" />
                                         </div>
                                     </div>
                                </div>

                                <div>
                                    <Button size="lg" className="w-full text-lg h-12">
                                        <CreditCard className="mr-2 h-5 w-5" />
                                        ৳{finalAmount || 0} অনুদান করুন
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

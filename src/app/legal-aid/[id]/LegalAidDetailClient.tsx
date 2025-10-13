'use client';

import { legalAidCenters } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Scale, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function LegalAidDetailClient({ centerId }: { centerId: string }) {
  const center = legalAidCenters.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === centerId);

  if (!center) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
            <Link href="/legal-aid">
                <ArrowLeft className="mr-2 h-4 w-4" />
                সব কেন্দ্রে ফিরে যান
            </Link>
        </Button>

      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-64 w-full">
            <Image 
                src={center.image}
                alt={center.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint="building office"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <Badge variant="secondary" className="mb-2">{center.division}</Badge>
                <h1 className="text-3xl font-bold text-white shadow-text">{center.name}</h1>
            </div>
        </div>
        <CardContent className="p-6 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3">কেন্দ্র সম্পর্কে</h2>
                    <p className="text-muted-foreground">
                        {center.name} {center.division} বিভাগের সুবিধাবঞ্চিত সম্প্রদায়কে প্রয়োজনীয় আইনি সহায়তা প্রদানের জন্য একটি শীর্ষস্থানীয় সংস্থা। আইনি পেশাদারদের একটি নিবেদিত দলের সাথে, আমরা সকলের জন্য ন্যায়বিচার প্রাপ্তি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। (এটি একটি ডামি বিবরণ)।
                    </p>
                </div>
                
                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Scale className="w-5 h-5 mr-2 text-primary"/>
                        প্রদত্ত সেবা
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {center.services.map(service => (
                            <Badge key={service} variant="outline">{service}</Badge>
                        ))}
                    </div>
                </div>

            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">যোগাযোগের তথ্য</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                            <p className="text-muted-foreground">{center.address}</p>
                        </div>
                         <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 mt-1 shrink-0 text-primary" />
                            <p className="text-muted-foreground">{center.contact}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">অবস্থান</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">মানচিত্রের স্থানধারক</p>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

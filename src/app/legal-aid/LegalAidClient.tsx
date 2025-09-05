'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { legalAidCenters as allCenters } from '@/lib/dummy-data';
import type { LegalAidCenter } from '@/types';
import { MapPin, Phone, Search, Building, Scale } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const services = ["পারিবারিক আইন", "জমি विवाद", "ফৌজداری মামলা", "মানবাধিকার", "শ্রম আইন"];
const divisions = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ"];

export default function LegalAidClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  
  const filteredCenters = allCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || center.services.includes(selectedService);
    const matchesDivision = selectedDivision === 'all' || center.division === selectedDivision;
    
    return matchesSearch && matchesService && matchesDivision;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle>সহায়তা খুঁজুন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="নাম দিয়ে খুঁজুন..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">প্রয়োজনীয় সেবা</label>
                     <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger>
                            <SelectValue placeholder="একটি সেবা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">সব সেবা</SelectItem>
                            {services.map(service => (
                                <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">বিভাগ</label>
                    <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                        <SelectTrigger>
                            <SelectValue placeholder="একটি বিভাগ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">সব বিভাগ</SelectItem>
                            {divisions.map(division => (
                                <SelectItem key={division} value={division}>{division}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Button className="w-full" onClick={() => {
                     setSearchTerm('');
                     setSelectedService('all');
                     setSelectedDivision('all');
                 }}>
                    ফিল্টার রিসেট করুন
                </Button>
            </CardContent>
        </Card>
      </aside>
      
      <main className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCenters.map((center) => (
            <Card key={center.name} className="flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-40 w-full">
                <Image
                  src={center.image}
                  alt={center.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint="building office"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{center.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">{center.division}</Badge>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 text-sm">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <p>{center.address}</p>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <p>{center.contact}</p>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                   <Scale className="w-4 h-4 mt-1 shrink-0"/>
                   <div className="flex flex-wrap gap-1">
                     {center.services.map(service => (
                       <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                     ))}
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
           {filteredCenters.length === 0 && (
            <div className="md:col-span-2 text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">কোনো ফলাফল পাওয়া যায়নি</h3>
                <p>আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে চেষ্টা করুন।</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}

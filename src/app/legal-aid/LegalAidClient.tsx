'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { legalAidCenters as allCenters } from '@/lib/dummy-data';
import type { LegalAidCenter } from '@/types';
import { MapPin, Phone, Search } from 'lucide-react';
import Image from 'next/image';

export default function LegalAidClient() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCenters = allCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or area..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredCenters.map((center) => (
            <Card key={center.name} className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{center.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <p>{center.address}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <p>{center.contact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2">
        <Card className="h-[400px] lg:h-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="https://picsum.photos/1200/800"
              alt="Map of legal aid centers"
              layout="fill"
              objectFit="cover"
              data-ai-hint="map city"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-16 h-16 text-white/80 mb-4" />
                <h3 className="text-2xl font-bold text-white">Interactive Map Placeholder</h3>
                <p className="text-white/90 mt-2 max-w-md">
                    In a full implementation, this would be an interactive map showing the locations of legal aid centers. This requires a Google Maps API key.
                </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

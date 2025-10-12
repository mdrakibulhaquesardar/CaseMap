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

const services = ["Family Law", "Land Disputes", "Criminal Law", "Human Rights", "Labor Law"];
const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];

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
                <CardTitle>Find Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by name..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Required Service</label>
                     <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Services</SelectItem>
                            {services.map(service => (
                                <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Division</label>
                    <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a division" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Divisions</SelectItem>
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
                    Reset Filters
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
                <h3 className="text-xl font-semibold">No results found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}

    
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { legalAidCenters as allCenters } from '@/lib/dummy-data';
import { MapPin, Phone, Search, Scale, Building } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const services = ["Family Law", "Land Disputes", "Criminal Law", "Human Rights", "Labor Law"];
const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];

export default function LegalAidClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);

  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleDivisionChange = (division: string) => {
    setSelectedDivisions(prev =>
      prev.includes(division) ? prev.filter(d => d !== division) : [...prev, division]
    );
  };
  
  const filteredCenters = allCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedServices.length === 0 || selectedServices.some(s => center.services.includes(s));
    const matchesDivision = selectedDivisions.length === 0 || selectedDivisions.includes(center.division);
    
    return matchesSearch && matchesService && matchesDivision;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedServices([]);
    setSelectedDivisions([]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <aside className="lg:col-span-1">
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle>Filter Your Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor='search-term'>Search by Name</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="search-term"
                            placeholder="e.g., BLAST"
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Services</h3>
                     <Button variant="link" size="sm" onClick={resetFilters} className="p-0 h-auto">Reset</Button>
                  </div>
                   <div className="space-y-2">
                    {services.map(service => (
                        <div key={service} className="flex items-center space-x-2">
                            <Checkbox id={`service-${service}`} checked={selectedServices.includes(service)} onCheckedChange={() => handleServiceChange(service)} />
                            <Label htmlFor={`service-${service}`} className="font-normal">{service}</Label>
                        </div>
                    ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <h3 className="font-semibold">Division</h3>
                    <div className="space-y-2">
                     {divisions.map(division => (
                        <div key={division} className="flex items-center space-x-2">
                            <Checkbox id={`division-${division}`} checked={selectedDivisions.includes(division)} onCheckedChange={() => handleDivisionChange(division)} />
                            <Label htmlFor={`division-${division}`} className="font-normal">{division}</Label>
                        </div>
                    ))}
                    </div>
                </div>

            </CardContent>
        </Card>
      </aside>
      
      <main className="lg:col-span-3">
         <div className="mb-4">
            <p className="text-muted-foreground">{filteredCenters.length} results found</p>
        </div>
        <div className="space-y-6">
          {filteredCenters.map((center) => (
            <Card key={center.name} className="flex flex-col md:flex-row hover:shadow-lg transition-shadow overflow-hidden">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                    src={center.image}
                    alt={center.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="building office"
                    />
                </div>
              <div className='flex-1 flex flex-col'>
                <CardHeader>
                    <CardTitle className="text-xl">{center.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">{center.division}</Badge>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 text-sm">
                    <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                    <p>{center.address}</p>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 shrink-0 text-primary" />
                    <p>{center.contact}</p>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                    <Scale className="w-4 h-4 mt-1 shrink-0 text-primary"/>
                    <div className="flex flex-wrap gap-1">
                        {center.services.map(service => (
                        <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                        ))}
                    </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                    <Button asChild className='w-full md:w-auto'>
                      <Link href={`/legal-aid/${center.name.toLowerCase().replace(/\s+/g, '-')}`}>View Details</Link>
                    </Button>
                </div>
              </div>
            </Card>
          ))}
           {filteredCenters.length === 0 && (
            <Card>
                <CardContent className="text-center py-20 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">No results found</h3>
                    <p>Try adjusting your search or filters.</p>
                </CardContent>
            </Card>
           )}
        </div>
      </main>
    </div>
  );
}

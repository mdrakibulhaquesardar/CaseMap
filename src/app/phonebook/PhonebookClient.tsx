
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Copy, Search, Shield, Ambulance, Scale, Building, Hospital, Lightbulb, Train, Star } from 'lucide-react';
import { PhonebookContact } from '@/types';
import { phonebookContacts as allContacts } from '@/lib/phonebook-data';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';

const iconMap: { [key: string]: React.ElementType } = {
    'জরুরি পরিষেবা': Ambulance,
    'আইনশৃঙ্খলা বাহিনী': Shield,
    'আইনি ও ভোক্তা অধিকার': Scale,
    'সরকারি অফিস': Building,
    'স্বাস্থ্য': Hospital,
    'ইউটিলিটি': Lightbulb,
    'পরিবহন': Train,
    'ডিফল্ট': Phone,
};

export default function PhonebookClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useLocalStorage<string[]>('phonebook-favorites', []);
  const { toast } = useToast();

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    toast({
      title: 'নম্বর কপি করা হয়েছে',
      description: `${number} আপনার ক্লিপবোর্ডে কপি করা হয়েছে।`,
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredContacts = useMemo(() => {
    return allContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const groupedContacts = useMemo(() => {
    const groups: { [key: string]: PhonebookContact[] } = {};
    
    const favoriteContacts = filteredContacts.filter(c => favorites.includes(c.id));
    if (favoriteContacts.length > 0) {
      groups['⭐ পছন্দের তালিকা'] = favoriteContacts;
    }

    filteredContacts.forEach(contact => {
      if (!favorites.includes(contact.id)) {
        if (!groups[contact.category]) {
          groups[contact.category] = [];
        }
        groups[contact.category].push(contact);
      }
    });

    return groups;
  }, [filteredContacts, favorites]);

  return (
    <div className="bg-background text-foreground h-full overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">বাংলাদেশ ফোনবুক</h1>
          <p className="text-muted-foreground mt-2">জরুরি ও সরকারি পরিষেবার নম্বর সহজেই খুঁজুন।</p>
          <div className="max-w-lg mx-auto mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="নাম বা ক্যাটাগরি দিয়ে সার্চ করুন..."
              className="w-full pl-12 h-12 rounded-full bg-muted border-none focus-visible:ring-2 focus-visible:ring-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <AnimatePresence>
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {Object.entries(groupedContacts).map(([category, contacts]) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-muted-foreground mb-4 px-2">{category}</h2>
                <div className="grid grid-cols-1 gap-2">
                  {contacts.map(contact => {
                    const Icon = iconMap[contact.category] || iconMap['ডিফল্ট'];
                    const isFavorite = favorites.includes(contact.id);
                    return (
                      <motion.div
                        key={contact.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                           <Avatar className="h-11 w-11">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <Icon className="w-5 h-5" />
                                </AvatarFallback>
                           </Avatar>
                           <div>
                                <p className="font-semibold text-foreground">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.number}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(contact.id)}>
                                <Star className={`w-5 h-5 transition-colors ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`}/>
                            </Button>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100" onClick={() => handleCopy(contact.number)}>
                                <Copy className="w-5 h-5 text-muted-foreground"/>
                            </Button>
                             <a href={`tel:${contact.number}`}>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                    <Phone className="w-5 h-5 text-muted-foreground"/>
                                </Button>
                            </a>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
             {filteredContacts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">কোনো কন্টাক্ট পাওয়া যায়নি</h3>
                    <p>আপনার সার্চ পরিবর্তন করে আবার চেষ্টা করুন।</p>
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

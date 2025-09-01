'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Gavel,
  FileText,
  MessagesSquare,
  MapPin,
  User,
  Info,
  Home,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Logo from '../icons/Logo';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/timeline', label: 'Timeline', icon: Gavel },
  { href: '/summarizer', label: 'Summarizer', icon: FileText },
  { href: '/faq', label: 'Q&A', icon: MessagesSquare },
  { href: '/legal-aid', label: 'Legal Aid', icon: MapPin },
  { href: '/law-finder', label: 'Law Finder', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/about', label: 'About', icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-7 w-7 text-primary" />
          <span className="hidden sm:inline-block font-headline">CaseMap</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              className={cn(
                'text-sm font-medium',
                pathname === href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="p-4">
                <Link href="/" className="flex items-center gap-2 mb-8" onClick={closeSheet}>
                  <Logo className="h-7 w-7 text-primary" />
                  <span className="font-bold text-lg font-headline">CaseMap</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Button
                      key={href}
                      asChild
                      variant={pathname === href ? 'secondary' : 'ghost'}
                      className="justify-start gap-3"
                      onClick={closeSheet}
                    >
                      <Link href={href}>
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        {label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

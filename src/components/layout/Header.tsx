'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { href: '/', title: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '/timeline', title: 'Timeline', icon: <Gavel className="h-5 w-5" /> },
  { href: '/summarizer', title: 'Summarizer', icon: <FileText className="h-5 w-5" /> },
  { href: '/faq', title: 'Q&A', icon: <MessagesSquare className="h-5 w-5" /> },
  { href: '/legal-aid', title: 'Legal Aid', icon: <MapPin className="h-5 w-5" /> },
  { href: '/law-finder', title: 'Law Finder', icon: <BookOpen className="h-5 w-5" /> },
];

const profileLinks = [
    { href: '/profile', title: 'My Profile', description: 'View and edit your profile information.' },
    { href: '/profile/settings', title: 'Settings', description: 'Manage your account settings.' },
    { href: '/auth/logout', title: 'Logout', description: 'Sign out of your account.' },
]

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

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
               <NavigationMenuItem key={link.href}>
                 <Link href={link.href} legacyBehavior passHref>
                   <NavigationMenuLink className={cn(
                       "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                       pathname === link.href ? 'bg-accent/50' : ''
                   )}>
                     {link.title}
                   </NavigationMenuLink>
                 </Link>
               </NavigationMenuItem>
            ))}
             <NavigationMenuItem>
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {profileLinks.map((link) => (
                    <ListItem
                      key={link.title}
                      title={link.title}
                      href={link.href}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
              <NavigationMenuItem>
                 <Link href="/about" legacyBehavior passHref>
                   <NavigationMenuLink className={cn(
                       "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                       pathname === "/about" ? 'bg-accent/50' : ''
                   )}>
                     About
                   </NavigationMenuLink>
                 </Link>
               </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Log In
            </Button>
            <Button size="sm" className="hidden md:inline-flex">
                Sign Up
            </Button>
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>
                            <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
                            <Logo className="h-7 w-7 text-primary" />
                            <span className="font-bold text-lg font-headline">CaseMap</span>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                  <div className="py-6">
                    <Accordion type="single" collapsible className="w-full">
                        {navLinks.map((link) => (
                             <a key={link.href} href={link.href} className={cn("flex items-center py-2 text-sm font-medium", pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary' )} onClick={closeSheet}>
                                {link.title}
                            </a>
                        ))}
                         <AccordionItem value="profile">
                            <AccordionTrigger className="py-2 text-sm font-medium">Profile</AccordionTrigger>
                            <AccordionContent className="pl-4">
                                {profileLinks.map((link) => (
                                    <a key={link.href} href={link.href} className="flex py-2 text-sm text-muted-foreground hover:text-primary" onClick={closeSheet}>
                                        {link.title}
                                    </a>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                         <a href="/about" className={cn("flex items-center py-2 text-sm font-medium", pathname === "/about" ? 'text-primary' : 'text-muted-foreground hover:text-primary' )} onClick={closeSheet}>
                            About
                        </a>
                    </Accordion>
                  </div>
                   <div className="flex flex-col gap-3">
                     <Button asChild variant="outline">
                       <a href="#">Log in</a>
                     </Button>
                     <Button asChild>
                       <a href="#">Sign up</a>
                     </Button>
                   </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

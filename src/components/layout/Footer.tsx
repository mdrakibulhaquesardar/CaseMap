import Link from "next/link";
import Logo from "../icons/Logo";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg font-headline">CaseMap আইনি সহকারী</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CaseMap. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">আমাদের সম্পর্কে</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">গোপনীয়তা নীতি</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">ব্যবহারের শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

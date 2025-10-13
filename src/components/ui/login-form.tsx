
'use client';

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error: any) {
            toast({
                title: "সাইন ইন করতে সমস্যা",
                description: "আপনার ইমেল বা পাসওয়ার্ড সঠিক নয়।",
                variant: "destructive",
            });
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
            // No need to router.push here, Firebase handles the redirect back.
        } catch (error: any) {
            toast({
                title: "Google দিয়ে সাইন ইন করতে সমস্যা",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="w-full hidden md:flex h-full">
                <img className="h-full w-full object-cover" src="https://picsum.photos/seed/login/1000/1200" alt="Login page background" data-ai-hint="courthouse architecture" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center">
        
                <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleSignIn}>
                    <h2 className="text-4xl text-foreground font-medium">সাইন ইন</h2>
                    <p className="text-sm text-muted-foreground mt-3">স্বাগতম! চালিয়ে যেতে সাইন ইন করুন</p>
        
                    <button type="button" onClick={handleGoogleSignIn} className="w-full mt-8 bg-secondary flex items-center justify-center h-12 rounded-full">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                    </button>
        
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-border"></div>
                        <p className="w-full text-nowrap text-sm text-muted-foreground">অথবা ইমেল দিয়ে সাইন ইন করুন</p>
                        <div className="w-full h-px bg-border"></div>
                    </div>
        
                    <div className="flex items-center w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="hsl(var(--muted-foreground))"/>
                        </svg>
                        <input type="email" placeholder="ইমেল" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={email} onChange={(e) => setEmail(e.target.value)} />                 
                    </div>
        
                    <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="hsl(var(--muted-foreground))"/>
                        </svg>
                        <input type="password" placeholder="পাসওয়ার্ড" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
        
                    <div className="w-full flex items-center justify-between mt-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <input className="h-4 w-4 rounded-sm border-primary" type="checkbox" id="checkbox" />
                            <label className="text-sm" htmlFor="checkbox">মনে রাখুন</label>
                        </div>
                        <a className="text-sm underline" href="#">পাসওয়ার্ড ভুলে গেছেন?</a>
                    </div>
        
                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-primary-foreground bg-primary hover:opacity-90 transition-opacity">
                        লগ ইন
                    </button>
                    <p className="text-muted-foreground text-sm mt-4">অ্যাকাউন্ট নেই? <Link className="text-primary hover:underline" href="/signup">সাইন আপ করুন</Link></p>
                </form>
            </div>
        </div>
    );
};

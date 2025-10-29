
'use client';

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";


export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const auth = getAuth();
        const firestore = getFirestore();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const randomAvatar = `https://i.pravatar.cc/150?u=${user.uid}`;

            await updateProfile(user, {
                displayName: fullName,
                photoURL: randomAvatar,
            });

            // Create user profile in Firestore
            const userRef = doc(firestore, "users", user.uid);
            await setDoc(userRef, {
              uid: user.uid,
              displayName: fullName,
              email: user.email,
              photoURL: randomAvatar,
              points: 0,
            });
            
            router.push("/");
        } catch (error: any) {
            let description = "একটি অজানা ত্রুটি ঘটেছে।";
            if (error.code === 'auth/email-already-in-use') {
                description = "এই ইমেল দিয়ে সম্ভবত আগেই অ্যাকাউন্ট খোলা হয়েছে।";
            } else if (error.code === 'auth/weak-password') {
                description = "পাসওয়ার্ডটি অন্তত ৬ অক্ষরের হতে হবে।";
            } else if (error.message) {
                description = error.message;
            }
            
            toast({
                title: "সাইন আপ করতে সমস্যা",
                description: description,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
        } catch (error: any) {
            toast({
                title: "Google দিয়ে সাইন ইন করতে সমস্যা",
                description: error.message,
                variant: "destructive",
            });
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="w-full hidden md:flex h-full">
                <img className="h-full w-full object-cover" src="https://picsum.photos/seed/signup/1000/1200" alt="Signup page background" data-ai-hint="library books" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center py-8">
        
                <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleSignUp}>
                    <h2 className="text-4xl text-foreground font-medium">সাইন আপ</h2>
                    <p className="text-sm text-muted-foreground mt-3">অ্যাকাউন্ট তৈরি করতে আপনার তথ্য দিন</p>
        
                    <button type="button" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading} className="w-full mt-8 bg-secondary flex items-center justify-center h-12 rounded-full disabled:opacity-70">
                        {isGoogleLoading ? <Loader2 className="animate-spin" /> : <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />}
                    </button>
        
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-border"></div>
                        <p className="w-full text-nowrap text-sm text-muted-foreground">অথবা ইমেল দিয়ে সাইন আপ করুন</p>
                        <div className="w-full h-px bg-border"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input type="text" placeholder="সম্পূর্ণ নাম" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading || isGoogleLoading} />                 
                    </div>

                     <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input type="text" placeholder="ব্যবহারকারীর নাম" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading || isGoogleLoading} />                 
                    </div>
        
                    <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="hsl(var(--muted-foreground))"/>
                        </svg>
                        <input type="email" placeholder="ইমেল" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading || isGoogleLoading} />                 
                    </div>
        
                    <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="hsl(var(--muted-foreground))"/>
                        </svg>
                        <input type="password" placeholder="পাসওয়ার্ড" className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-full h-full" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading || isGoogleLoading}/>
                    </div>
        
                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-primary-foreground bg-primary hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-70" disabled={isLoading || isGoogleLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "সাইন আপ"}
                    </button>
                    <p className="text-muted-foreground text-sm mt-4">ইতিমধ্যেই অ্যাকাউন্ট আছে? <Link className="text-primary hover:underline" href="/login">সাইন ইন করুন</Link></p>
                </form>
            </div>
        </div>
    );
};

import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">My Profile</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          View your saved cases and frequently asked questions.
        </p>
      </div>
      <ProfileClient />
    </div>
  );
}

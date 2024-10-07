import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Social Media Platform</h1>
      <p className="text-xl mb-8">Connect with friends, share your moments, and discover new content.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
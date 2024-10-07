"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SocialApp
        </Link>
        <nav className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/feed">Feed</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/profile">Profile</Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
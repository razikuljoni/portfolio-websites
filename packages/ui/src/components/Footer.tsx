import React from "react";
import { PERSONAL_INFO } from "@portfolio/profile-data";

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 text-center text-xs text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </p>
        <p>Built with Next.js, React & Tailwind CSS</p>
      </div>
    </footer>
  );
}

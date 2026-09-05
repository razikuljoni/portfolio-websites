import React from "react";
import { PERSONAL_INFO } from "@portfolio/profile-data";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs text-muted-foreground ${className}`}>
      <a
        href={PERSONAL_INFO.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors"
      >
        GitHub
      </a>
      <span>•</span>
      <a
        href={PERSONAL_INFO.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors"
      >
        LinkedIn
      </a>
      <span>•</span>
      <a
        href={`mailto:${PERSONAL_INFO.email}`}
        className="hover:text-foreground transition-colors"
      >
        {PERSONAL_INFO.email}
      </a>
    </div>
  );
}

import React from "react";
import { PERSONAL_INFO } from "@portfolio/profile-data";

export interface HeaderBrandProps {
  subtitle?: string;
  showTagline?: boolean;
}

export function HeaderBrand({ subtitle, showTagline = false }: HeaderBrandProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {PERSONAL_INFO.name}
      </h1>
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">
        {subtitle || PERSONAL_INFO.title}
      </p>
      {showTagline && (
        <p className="mt-1 text-xs text-muted-foreground/80 max-w-xl">{PERSONAL_INFO.tagline}</p>
      )}
    </div>
  );
}

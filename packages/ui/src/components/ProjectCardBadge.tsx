import React from "react";

export function ProjectCardBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

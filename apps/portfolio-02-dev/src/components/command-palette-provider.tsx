"use client";

import { useState } from "react";
import CommandPalette from "@/src/components/command-palette";

export function CommandPaletteProvider({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {children}
            <CommandPalette open={open} onOpenChange={setOpen} />
        </>
    );
}

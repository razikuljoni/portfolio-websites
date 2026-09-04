"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { CompassIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export function NotFoundContent() {
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--pattern-fg)_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-[0.04]"
                />

                <m.div variants={itemVariants} className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <m.h1
                            variants={itemVariants}
                            className="text-[10rem] font-semibold leading-none tracking-tighter text-foreground sm:text-[14rem]"
                        >
                            404
                        </m.h1>

                        <m.div
                            variants={itemVariants}
                            className="flex flex-col items-center gap-2 text-center"
                        >
                            <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Page not found
                            </p>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                The page you are looking for does not exist or has been moved.
                            </p>
                        </m.div>

                        <m.div variants={itemVariants} className="flex gap-3">
                            <Button render={<Link href="/" />} nativeButton={false}>
                                <HomeIcon className="mr-2 size-4" data-icon="inline-start" />
                                Go back home
                            </Button>
                            <Button
                                variant="outline"
                                render={<Link href="/projects" />}
                                nativeButton={false}
                            >
                                <CompassIcon className="mr-2 size-4" data-icon="inline-start" />
                                Explore projects
                            </Button>
                        </m.div>
                    </div>
                </m.div>
            </m.div>
        </LazyMotion>
    );
}

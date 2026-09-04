import { Button } from "@/src/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/src/components/ui/empty";
import { CompassIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export function NotFoundComp() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            <Empty>
                <EmptyHeader>
                    <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
                        404
                    </EmptyTitle>
                    <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
                        The page you&apos;re looking for might have been <br />
                        moved or doesn&apos;t exist.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button render={<Link href="/" />} nativeButton={false}>
                            <HomeIcon className="size-4 mr-2" data-icon="inline-start" />
                            Go Home
                        </Button>

                        <Button
                            variant="outline"
                            render={<Link href="/blogs" />}
                            nativeButton={false}
                        >
                            <CompassIcon className="size-4 mr-2" data-icon="inline-start" />
                            All Blogs
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
}

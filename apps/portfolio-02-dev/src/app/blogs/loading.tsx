export default function Loading() {
    return (
        <div className="container mx-auto max-w-(--content-max-width) px-4 py-10">
            <div className="animate-pulse space-y-4">
                <div className="h-10 w-32 rounded bg-muted" />
            </div>
            <div className="mt-8 flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border/50 p-3 sm:p-4">
                        <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <div className="h-5 w-3/5 rounded bg-muted" />
                            <div className="mt-1 flex items-center gap-1.5 sm:mt-0">
                                <div className="size-4 rounded bg-muted" />
                                <div className="h-4 w-24 rounded bg-muted" />
                            </div>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="h-4 w-full rounded bg-muted" />
                            <div className="size-4/5 rounded bg-muted" />
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <div className="h-4 w-24 rounded bg-muted" />
                            <div className="size-4 rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

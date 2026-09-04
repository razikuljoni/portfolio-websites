export default function Loading() {
    return (
        <div className="container mx-auto max-w-(--content-max-width) px-4 py-10">
            <div className="animate-pulse space-y-4">
                <div className="h-10 w-40 rounded bg-muted" />
                <div className="h-4 w-80 rounded bg-muted" />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border/50 p-3 sm:p-4">
                        <div className="rounded-[10px] border border-border p-1">
                            <div className="relative h-55 w-full overflow-hidden rounded-[6px] border border-border bg-muted sm:h-[240px] md:h-[260px]" />
                        </div>
                        <div className="flex min-h-[120px] flex-col justify-between gap-2 px-2 py-2.5">
                            <div className="flex items-center justify-between gap-2">
                                <div className="h-5 w-2/5 rounded bg-muted" />
                                <div className="flex items-center gap-1.5">
                                    <div className="size-2 rounded-full bg-muted" />
                                    <div className="h-4 w-12 rounded bg-muted" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full rounded bg-muted" />
                                <div className="h-4 w-3/4 rounded bg-muted" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-4 w-20 rounded bg-muted" />
                                <div className="size-3.5 rounded bg-muted" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

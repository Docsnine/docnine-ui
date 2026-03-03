function TopBar({ title, description, children }: { title: string, description?: string, children?: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-border border-b pb-5 mb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {description && (
                    <p className="text-muted-foreground mt-3">
                        {description}
                    </p>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default TopBar

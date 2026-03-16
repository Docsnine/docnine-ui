import { CTA } from "@/components/common/CTA";
import { Footer } from "@/components/common/footer";
import { TopHeader } from "@/components/common/header";
import { Outlet } from "react-router-dom";

export function GuestLayout({ allowCTA = true }: { allowCTA?: boolean }) {
    return (
        <div>
            <TopHeader />

            <main className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">
                <Outlet />

                {/* CTA Section */}
                {allowCTA && <CTA />}
            </main>

            <Footer />
        </div>
    );
}
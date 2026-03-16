import { CTA } from "@/components/common/CTA";
import { Footer } from "@/components/common/footer";
import { TopHeader } from "@/components/common/header";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div>
            <TopHeader />

            <main className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
import SidebarNav from "@/components/Navbar/SidebarNav"
import MobileNav from "@/components/Navbar/MobileNav"
import { AuthProvider } from "@/components/Auth/AuthProvider"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dk-paper text-dk-ink">
        <SidebarNav />

        <div className="lg:ml-64 xl:ml-72 lg:mr-80 pb-20 lg:pb-0 bg-(--dk-paper)">
          {children}
        </div>

        <MobileNav />
      </div>
    </AuthProvider>
  )
}

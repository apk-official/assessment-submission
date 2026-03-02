import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";

export default function AppLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSideBar />
      <SidebarInset className="flex flex-col font-sans">
        <TopBar />
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

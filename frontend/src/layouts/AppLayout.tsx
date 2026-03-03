import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import Dashboard from "@/features/Dashboard";
import { useDebounce } from "@/hooks/useDebounce";

export default function AppLayout() {
  const [instanceId, setInstanceId] = useState(
    "d1111111-1111-1111-1111-111111111111",
  );
    const debouncedInstanceId = useDebounce(instanceId, 500);
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSideBar />
      <SidebarInset className="flex flex-col font-sans">
        <TopBar instanceId={instanceId}
          onInstanceIdChange={setInstanceId}/>
        <main className="flex-1 p-4">
         <Dashboard instanceId={debouncedInstanceId}/>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

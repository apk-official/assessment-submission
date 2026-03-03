import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import Dashboard from "@/features/Dashboard";
import { useDebounce } from "@/hooks/useDebounce";
/**
 * <AppLayout />
 *
 * Provides the top-level application shell layout.
 *
 * Responsibilities:
 * - Sets up the sidebar context (`SidebarProvider`) and renders the app sidebar.
 * - Renders the main content scaffold (TopBar + main content area).
 * - Owns the `instanceId` state used to scope the dashboard data/view.
 * - Debounces `instanceId` changes to avoid triggering expensive dashboard updates on every keystroke.
 *
 * Data flow:
 * - `instanceId` is controlled here and passed to `TopBar` for editing.
 * - A debounced `instanceId` is passed to `Dashboard` to drive data loading/rendering.
 *
 * Notes:
 * - `defaultOpen={false}` keeps the sidebar collapsed by default (useful for smaller screens / first-load UX).
 */
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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";


/**
 * Application sidebar layout component.
 *
 * Provides primary navigation and branding for the
 * Assessment Results dashboard. Must be rendered
 * inside <SidebarProvider> to function correctly.
 */


export function AppSideBar() {
  return (
    <Sidebar
      variant="sidebar"
      className="border-r-gray-300 dark:border-r-gray-700 bg-primary-foreground"
      
    >
      <SidebarHeader>Assessment Result Management</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

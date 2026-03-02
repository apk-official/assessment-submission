import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSideBar() {
  return (
    <Sidebar variant="sidebar" className="border-r-gray-300 dark:border-r-gray-700 ">
      <SidebarHeader>Assessment Result Management</SidebarHeader>
      <SidebarContent>
              <SidebarGroup />
              
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
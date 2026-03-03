import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { HouseIcon } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";


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
      <SidebarHeader className="flex flex-col items-start text-base font-medium">Assessment Results Management</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <Button className="w-full flex items-center justify-start bg-blue-600 dark:bg-blue-600 text-neutral-100 dark:text-neutral-100 cursor-pointer hover:bg-blue-700"><HouseIcon weight="fill" size={20}/><p className="font-normal">Overview</p> </Button>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

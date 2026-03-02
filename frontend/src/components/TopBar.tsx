import { MoonIcon, SidebarSimpleIcon, SunDimIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "./ui/sidebar";
import { useTheme } from "./ThemeProvider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
/**
 * Top navigation bar for the application layout.
 *
 * Provides:
 * - Sidebar toggle trigger
 * - InstanceSearchInput
 * - Theme switch (light / dark)
 *
 * Requires SidebarProvider and ThemeProvider
 * to be present higher in the component tree.
 */
export default function TopBar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 h-12 border-b border-b-gray-300 dark:border-b-gray-700 flex items-center justify-between px-2 md:px-4 lg:px-4 xl:px-4 2xl:px-10 bg-primary-foreground">
      <div className="flex items-center justify-center gap-5">
        <SidebarTrigger className="cursor-pointer dark:text-accent-foreground">
          <SidebarSimpleIcon/>
        </SidebarTrigger>
        <Input
          placeholder="Enter Instance ID"
          className="shadow-none border-blue-500 bg-primary-secondary font-sans font-normal"
          aria-label="Instance ID Search Input"
        ></Input>
      </div>
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        className="flex items-centerjustify-center cursor-pointer font-sans font-normal dark:text-accent-foreground"
      >
        {theme === "dark" ? (<>
          <MoonIcon className="text-gray-50" /> 
          <p>Mode: Dark</p></>
        ) : (
         <> <SunDimIcon /><p>Mode: Light</p></>
        )}
      </Button>
    </header>
  );
}

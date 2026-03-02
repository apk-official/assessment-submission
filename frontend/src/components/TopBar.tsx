import { MoonIcon, SidebarSimpleIcon, SunDimIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "./theme-provider";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 h-12 border-b border-b-gray-300 dark:border-b-gray-700 flex items-center justify-between px-2 md:px-4 lg:px-4 xl:px-4 2xl:px-10">
      <SidebarTrigger className="cursor-pointer">
        <SidebarSimpleIcon />
      </SidebarTrigger>
      {theme == "dark" ? (
        <SunDimIcon
          onClick={() => setTheme("light")}
          className="text-gray-50"
        />
      ) : (
        <MoonIcon onClick={() => setTheme("dark")} className="" />
      )}
    </header>
  );
}

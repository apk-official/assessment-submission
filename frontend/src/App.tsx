import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;

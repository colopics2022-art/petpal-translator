import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/store/appStore";
import AppLayout from "@/components/AppLayout";
import Onboarding from "@/pages/Onboarding";
import HomePage from "@/pages/HomePage";
import ListenPage from "@/pages/ListenPage";
import WatchPage from "@/pages/WatchPage";
import MyPetsPage from "@/pages/MyPetsPage";
import HistoryPage from "@/pages/HistoryPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/listen" element={<ListenPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/pets" element={<MyPetsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

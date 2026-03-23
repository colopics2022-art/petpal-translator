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
import V2Home from "@/pages/V2Home";
import V3Splash from "@/pages/V3Splash";
import V3Setup from "@/pages/V3Setup";
import V3Home from "@/pages/V3Home";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  const appVersion = useAppStore((s) => s.appVersion);

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  // V3 Shazam-style MVP
  if (appVersion === 'v3') {
    return (
      <Routes>
        <Route path="/" element={<V3Splash />} />
        <Route path="/v3/setup" element={<V3Setup />} />
        <Route path="/v3/home" element={<V3Home />} />
        {/* V1/V2 still accessible */}
        <Route path="/v2" element={<V2Home />} />
        <Route element={<AppLayout />}>
          <Route path="/v1" element={<HomePage />} />
          <Route path="/listen" element={<ListenPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/pets" element={<MyPetsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // V2 simple mode
  if (appVersion === 'v2') {
    return (
      <Routes>
        <Route path="/" element={<V2Home />} />
        <Route element={<AppLayout />}>
          <Route path="/v1" element={<HomePage />} />
          <Route path="/listen" element={<ListenPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/pets" element={<MyPetsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
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

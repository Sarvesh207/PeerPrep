import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import Layout from "./components/Layout";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="home" element={<Home />} />
              <Route path="complete-profile" element={<CompleteProfile />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </Provider>
);

export default App;

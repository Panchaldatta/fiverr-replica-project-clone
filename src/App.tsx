
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import GigDetail from "./pages/GigDetail";
import SignIn from "./pages/SignIn";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SellerProfile from "./pages/SellerProfile";
import CreateGig from "./pages/CreateGig";
import EditGig from "./pages/EditGig";

// Create the query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="categories/:category" element={<CategoryPage />} />
                  <Route path="gig/:id" element={<GigDetail />} />
                  <Route path="gig/create" element={<CreateGig />} />
                  <Route path="gig/edit/:id" element={<EditGig />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="join" element={<Join />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile/:username" element={<SellerProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

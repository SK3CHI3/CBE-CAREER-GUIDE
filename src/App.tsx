import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicRoute, StudentRoute, TeacherRoute, AdminRoute } from "@/components/ProtectedRoute";
import Home from "./pages/HomeImproved";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import QuickAssessment from "./pages/QuickAssessment";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AICareerCounselor from "./pages/AICareerCounselor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/quick-assessment" element={<QuickAssessment />} />
            <Route path="/dashboard/student" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
            <Route path="/dashboard/teacher" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
            <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/ai-counselor" element={<StudentRoute><AICareerCounselor /></StudentRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

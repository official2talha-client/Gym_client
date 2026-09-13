import { Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./lib/AuthContext";
import { AdminProtect } from "./components/RequireRole";
import PublicLayout from "./components/layout/PublicLayout";
import Landing from "./pages/Landing";
import PlansDetail from "./pages/PlansDetail";
import TrainerProfile from "./pages/TrainerProfile";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";
import Exercise from "./pages/Exercise";
import ExerciseVideo from "./pages/ExerciseVideo";
import Video from "./pages/Video";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/protectedRoutes";

// Admin
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMembers from "./pages/admin/Members";
import AdminTrainers from "./pages/admin/Trainers";
import AdminPlans from "./pages/admin/Plans";
import AdminClasses from "./pages/admin/Classes";
import AdminPayments from "./pages/admin/Payments";
import AdminReviews from "./pages/admin/Reviews";
import AdminBlogs from "./pages/admin/Blogs";
import AdminGallery from "./pages/admin/Gallery";
import AdminCoupons from "./pages/admin/Coupons";
import AdminMessages from "./pages/admin/Messages";
import AdminFaqs from "./pages/admin/Faqs";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Member
import MemberLayout from "./components/layout/MemberLayout";
import MemberDashboard from "./pages/member/Dashboard";
import MemberCard from "./pages/member/Card";
import MemberProgress from "./pages/member/Progress";

import MemberAchievements from "./pages/member/Achievements";
import MemberSettings from "./pages/member/Settings";
import MemberPurchase from "./pages/member/MemberPurchase";
import MemberMembership from "./pages/member/MemberMembership";
import AdminPurchase from "./pages/admin/AdminPurchase";
import AdminMembership from "./pages/admin/AdminMembership";
import Membership from "./components/shared/Membership";
import Forbidden from "./components/Forbidden";
import PlanDetails from "./pages/PlanDetails";
import RegisterPage from "./pages/RegisterPage";
import Trainers from "./pages/sections/Trainers";
import ExerciseVideoManage from "./pages/admin/ExerciseVideoManage";

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right "
        reverseOrder={false}
      />

      <ToastProvider>
        <Routes>

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/plans" element={<PlansDetail />} />
            <Route path="/plan-details/:id" element={<PlanDetails />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route
              path="/exercise-video/:bodypart"
              element={<ExerciseVideo />}
            />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route
              path="/trainers/:id"
              element={<TrainerProfile />}
            />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/error" element={<ErrorPage />} />
          </Route>

          {/* admin routes  */}

         <Route element={<AdminProtect />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="members" element={<AdminMembers />} />
    <Route path="trainers" element={<AdminTrainers />} />
    <Route path="plans" element={<AdminPlans />} />
    <Route path="purchase" element={<AdminPurchase />} />
    <Route path="membership" element={<AdminMembership />} />
    <Route path="classes" element={<AdminClasses />} />
    <Route path="payments" element={<AdminPayments />} />
    <Route path="excercise" element={<ExerciseVideoManage />} />
    <Route path="reviews" element={<AdminReviews />} />
    <Route path="blogs" element={<AdminBlogs />} />
    <Route path="gallery" element={<AdminGallery />} />
    <Route path="coupons" element={<AdminCoupons />} />
    <Route path="messages" element={<AdminMessages />} />
    <Route path="faqs" element={<AdminFaqs />} />
    <Route path="reports" element={<AdminReports />} />
    <Route path="settings" element={<AdminSettings />} />
  </Route>
          </Route>
    <Route path="/membershipById/:id" element={<Membership />} />



          {/* member routes  */}

          <Route element={<ProtectedRoutes />}>
  <Route path="/member" element={<MemberLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<MemberDashboard />} />
    <Route path="card" element={<MemberCard />} />
    <Route path="trainers" element={<AdminTrainers />} />
    <Route path="progress" element={<MemberProgress />} />
    <Route path="purchase" element={<MemberPurchase />} />
    <Route path="membership" element={<MemberMembership />} />
    <Route path="achievements" element={<MemberAchievements />} />
    <Route path="settings" element={<MemberSettings />} />
    
  </Route>
          </Route>

          <Route
            path="*"
            element={<NotFound />}
          />

          <Route
            path="/forbidden"
            element={<Forbidden />}
          />

        </Routes>


      </ToastProvider>
    </AuthProvider>
  );
}
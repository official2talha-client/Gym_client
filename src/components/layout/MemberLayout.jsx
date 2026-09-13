import { Outlet } from "react-router-dom";
import DashboardSidebar from "./MemberSlidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#120d0b] lg:flex">

    

      <DashboardSidebar />

      <main className="min-w-0 pt-20 flex-1 p-4 ">
        <Outlet />
      </main>

    </div>
  );
}
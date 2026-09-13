import { Outlet } from "react-router-dom";
import AdminSidebar from "./Adminslidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#120d0b] lg:flex">

    

      <AdminSidebar />

      <main className="min-w-0  flex-1 p-4 ">
        <Outlet />
      </main>

    </div>
  );
}
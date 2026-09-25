import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  Dumbbell,
  ChevronRight,
  Menu,
  X,
  Home
} from "lucide-react";
import toast from 'react-hot-toast'

import { Icon } from "../Icon";
import {useGetBusinessForUserQuery} from '../../api/adminApi.js'
import {useLogoutUserMutation} from '../../api/userApi.js'


const NAV_ITEMS = [
  {
    to: "/",
    label: "Home",
    icon: <Home />,
  },
  {
    to: "dashboard",
    label: "Dashboard",
    icon: <Icon.dashboard width={18} height={18} />,
    end: true,
  },
  {
    to: "card",
    label: "Membership Card",
    icon: <Icon.card width={18} height={18} />,
  },
  {
    to: "progress",
    label: "Progress",
    icon: <Icon.progress width={18} height={18} />,
  },
  {
    to: "purchase",
    label: "Purchases",
    icon: <Icon.purchase width={18} height={18} />,
  },
  {
    to: "membership",
    label: "Memberships",
    icon: <Icon.membership width={18} height={18} />,
  },
  {
    to: "achievements",
    label: "Achievements",
    icon: <Icon.achievements width={18} height={18} />,
  },
  {
    to: "settings",
    label: "Settings",
    icon: <Icon.settings width={18} height={18} />,
  },

  
];

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const [logout,{isLoading:logoutLoading}] = useLogoutUserMutation();


  const handleSignOut = async () => {
  try {
    await logout().unwrap();

    toast.success("Logged out successfully");

    // Clear local auth data if you're storing it there
    localStorage.removeItem("token");

    // Optional: redirect
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);

    toast.error(
      error?.data?.message || "Failed to logout. Please try again."
    );
  }
};

  const closeMobile = () => {
    setMobileOpen(false);
  };

   const {data:businessData} = useGetBusinessForUserQuery()
   const business  = businessData?.data;

  return (
    <div>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}


      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="
          fixed left-4 top-4 z-40
          flex h-11 w-11 items-center justify-center
          rounded-xl border border-[#342620]
          bg-[#120d0b] text-[#d7ccc6]
          shadow-xl
          transition
          hover:bg-[#211713]
          hover:text-[#ff681d]
          lg:hidden
        "
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>
      
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        onClick={closeMobile}
        className={`
          fixed inset-0 z-40
          bg-black/70 backdrop-blur-sm
          transition-opacity duration-300
          lg:hidden
          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
  className={`
    fixed inset-y-0 left-0 z-50
    flex w-[270px] flex-col
    border-r border-[#342620]
    bg-[#120d0b]
    shadow-2xl
    transition-transform duration-300 ease-in-out

    lg:sticky lg:top-0 lg:h-screen
    lg:translate-x-0
    lg:shrink-0
    lg:w-[270px]

    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#342620] px-5">
          
          <NavLink
            to="dashboard"
            onClick={closeMobile}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff681d] shadow-lg shadow-[#ff681d]/20">
              <Dumbbell
                size={21}
                strokeWidth={2.5}
                className="text-[#160d09]"
              />
            </div>

            <div>
              <h1 className="text-[17px] font-black uppercase tracking-tight text-white">
{business?.name?.split(" ").map((word, index) => (
  <span
    key={index}
    className={index === 0 ? "text-white" : "text-[#ff681d]"}
  >
    {index > 0 && " "}
    {word}
  </span>
))}              </h1>

              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#756862]">
                Member Panel
              </p>
            </div>
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeMobile}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg text-[#84766f]
              transition
              hover:bg-[#241814]
              hover:text-white
              lg:hidden
            "
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        {/* ===================================================
            ADMIN PROFILE
        =================================================== */}

        <div className="mx-4 mt-5 shrink-0 rounded-xl border border-[#342620] bg-[#1a1210] p-3">
          <div className="flex items-center gap-3">
            
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff681d]/10 text-sm font-black text-[#ff681d]">
              M
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                Trackings
              </p>

              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#756862]">
                Member
              </p>
            </div>

          </div>
        </div>

        {/* ===================================================
            NAVIGATION LABEL
        =================================================== */}

        <div className="shrink-0 px-5 pb-2 pt-6">
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#625650]">
            Management
          </p>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <nav
          className="
            flex-1 overflow-y-auto px-3 pb-4
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="space-y-1">

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeMobile}
                className={({ isActive }) => `
                  group relative flex items-center gap-3
                  rounded-xl px-3.5 py-3
                  text-sm font-semibold
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-[#ff681d] text-[#160d09] shadow-lg shadow-[#ff681d]/10"
                      : "text-[#9b8d86] hover:bg-[#211713] hover:text-white"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg
                        transition-all duration-200

                        ${
                          isActive
                            ? "bg-black/10"
                            : "bg-[#211713] group-hover:bg-[#2b1d18]"
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={15}
                      className={`
                        transition-all duration-200

                        ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}

          </div>
        </nav>

        {/* ===================================================
            BOTTOM SECTION
        =================================================== */}

        <div className="shrink-0 border-t border-[#342620] p-3">

          {/* System Status */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-[#1a1210] px-3 py-2.5">
            
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>

              <span className="text-[11px] font-semibold text-[#8d8079]">
                System Online
              </span>
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-[#5f544f]">
              Live
            </span>

          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="
              group flex w-full items-center gap-3
              rounded-xl px-3.5 py-3
              text-sm font-semibold text-[#9b8d86]
              transition-all duration-200
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#211713] transition group-hover:bg-red-500/10">
              <LogOut size={17} />
            </span>

            <span>{logoutLoading ? "Logging out..." : "Log out"}</span>
          </button>

        </div>
      </aside>
    </div>
  );
}
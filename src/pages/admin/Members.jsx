import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Plus, ArrowLeft } from "lucide-react";
import { useGetAllUsersQuery } from "../../api/adminApi";
import MemberCard from "../../components/admin/MemberCard";
import Register from "../../components/Register";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Members = () => {

    const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [registerOpen, setRegisterOpen] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useGetAllUsersQuery({
    page,
    limit,
    search,
    status,
  });

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  const totalPages = pagination?.pages || 1;
  
  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Status
  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Previous
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Next
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
   <div className="min-h-screen bg-[#0f0b09] py-4 text-white sm:px-5 sm:py-5">
  {/* ================= TOP BAR ================= */}
  <div className="mb-5 flex flex-col gap-3 sm:mb-7">
    
    {/* Search */}
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search members by name or email or phone..."
        className="h-11 w-full rounded-xl border border-[#352823] bg-[#191310] pl-10 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 sm:h-12"
      />
    </div>

    {/* Filters + Add Member */}
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      
      {/* Status */}
      <select
        value={status}
        onChange={handleStatus}
        className="h-11 w-full rounded-xl border border-[#352823] bg-[#191310] px-3.5 text-sm text-white outline-none transition focus:border-orange-500 sm:h-12 sm:w-auto sm:min-w-[140px]"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="freeze">Freeze</option>
      </select>

      {/* Add Member */}
      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600 sm:h-12 sm:w-auto sm:rounded-full sm:px-5"
        onClick={()=>setRegisterOpen(true)}
      >
        <span>Add Member</span>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-orange-500">
          <Plus size={17} />
        </span>
      </button>
    </div>
  </div>

  {/* ================= LOADING ================= */}
  {isLoading && (
    <div className="flex min-h-[300px] items-center justify-center sm:min-h-[400px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
    </div>
  )}

  {/* ================= ERROR ================= */}
  {isError && !isLoading && (
    <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-5 text-center text-sm text-red-400 sm:p-6">
      Failed to load members.
    </div>
  )}

  {/* ================= MEMBERS ================= */}
  {!isLoading && !isError && (
    <>
      {users.length > 0 ? (
        <div
          className={`space-y-3 sm:space-y-4 transition-opacity ${
            isFetching ? "opacity-50" : "opacity-100"
          }`}
        >
          {users.map((user) => (
            <MemberCard
              key={user._id}
              user={user}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-[#352823] bg-[#191310] px-4 sm:min-h-[350px] sm:rounded-2xl">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-300 sm:text-lg">
              No members found
            </p>

            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              Try changing your search or status filter.
            </p>
          </div>
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      {users.length > 0 && totalPages > 1 && (
        <div className="mt-5 flex flex-col gap-4 border-t border-[#352823] pt-4 sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:pt-5">

          {/* Results */}
          <p className="text-center text-xs text-gray-500 sm:text-left">
            Showing{" "}
            <span className="font-semibold text-gray-300">
              {(page - 1) * limit + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-300">
              {Math.min(page * limit, pagination.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-300">
              {pagination.total}
            </span>{" "}
            members
          </p>

          {/* Controls */}
          <div className="flex w-full items-center justify-center gap-1.5 sm:w-auto sm:gap-2">

            {/* Previous */}
            <button
              type="button"
              disabled={page === 1}
              onClick={handlePrevious}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#352823] bg-[#191310] text-gray-400 transition hover:border-orange-500 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            <div className="flex max-w-[calc(100vw-100px)] items-center gap-1.5 overflow-x-auto scrollbar-hide sm:max-w-none sm:gap-2">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg px-2 text-xs font-semibold transition sm:h-9 sm:min-w-9 ${
                    page === pageNumber
                      ? "bg-orange-500 text-white"
                      : "border border-[#352823] bg-[#191310] text-gray-400 hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={handleNext}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#352823] bg-[#191310] text-gray-400 transition hover:border-orange-500 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>
      )}
    </>
  )}


  {registerOpen && (

    <div
  className="fixed  inset-0 z-50 flex items-center justify-center bg-[#110c09] p-4"
  onClick={() => setRegisterOpen(false)}
>
<div className="p-2 w-full h-[100vh] overflow-auto gym-scrollbar" onClick={(d)=>d.stopPropagation()}>

<div className="pt-2 sm:pt-16 w-full space-y-2">

          <Link
              onClick={()=>setRegisterOpen(false)}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg border border-[#352823]
                bg-[#1A1310]
                text-[#9B8D86]
                transition
                hover:border-orange-500/40
                hover:text-orange-400
              "
            >
              <ArrowLeft size={18} />
          </Link>

  <h1 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
    Create New <span className="text-[#ff681d]">Member</span>
  </h1>

  <p className="mt-3 max-w-sm text-sm leading-5 text-[#aaa09b]">
    Create new member account.
  </p>
</div>
      <Register footer={false} onSuccess={(response) => {
   toast.success("Member registered successfully")
   setRegisterOpen(false)
   refetch()
    navigate("/admin/members");
  }} />

</div>
    </div>

  )}

</div>
  );
};

export default Members;
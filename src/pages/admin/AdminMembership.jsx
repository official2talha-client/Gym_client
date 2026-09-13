import React,{useState} from "react";
import { useGetAllMembershipsQuery,useCreateManualMembershipMutation } from "../../api/membershipApi.js";
import {useGetAllPlanQuery} from '../../api/planApi.js'
import {useGetAllUsersQuery} from '../../api/adminApi.js'
import PurchaseCard from "../../components/admin/PurchaseCard.jsx";
import MembershipCard from "../../components/admin/MembershipCard.jsx";
import {
 Search,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus
  
} from "lucide-react";
import ManualMembershipForm from "../../components/admin/ManualMembershipForm.jsx";
import toast from "react-hot-toast";


function AdminMembership() {


    const [status, setStatus] = useState(null);
    const [membershipCard, setMembershipCard] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
          case "accepted":
          case "approved":
          case "active":
            return {
              label: status,
              className:
                "text-green-400 border-green-500/30 bg-green-500/10",
              icon: <CheckCircle2 size={14} />,
            };
    
          case "suspended":
            return {
              label: "Suspended",
              className:
                "text-red-400 border-red-500/30 bg-red-500/10",
              icon: <XCircle size={14} />,
            };
    
          case "expired":
          default:
            return {
              label: "Expired",
              className:
                "text-gray-300 border-gray-500/80 bg-gray-500/50",
              icon: <Clock3 size={14} />,
            };
        }
      };

  const { data, isLoading, isError } = useGetAllMembershipsQuery({
    status,
    membershipCard
  });

  const allMemberships = data?.data || [];
  

  const {data:planData} = useGetAllPlanQuery();
  const plans = planData?.data;

   const {data:userData} = useGetAllUsersQuery();
  const users = userData?.data?.users;

  const [createMembership,{isLoading:isSubmitting}] = useCreateManualMembershipMutation()


const onSubmit = async (data) => {

  try {
    const response = await createMembership(data).unwrap();

    toast.success(
      "Membership created successfully"
    );

   setOpen(false)

  } catch (error) {
    console.error("Create membership failed:", error);

    toast.error(
      error?.data?.message ||
        error?.message ||
        "Failed to create membership"
    );
  }
};


  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-[#8f817a]">Loading memberships...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
        <p className="text-sm text-red-400">
          Failed to load your membership records.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Page Header */}

      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white">
         All Memberships
        </h1>

        <p className="mt-1 text-sm text-[#8f817a]">
          View all memberships here.
        </p>
      </div> */}

    {/* filter  */}

    <div className="mb-5 rounded-xl border border-white/10 bg-[#17100d] p-4">
  <div className="flex flex-wrap items-end gap-3">

    {/* Membership Card Search */}
    <div className="w-full sm:flex-1 sm:min-w-[220px]">
      <label className="mb-1.5 block text-xs font-medium text-ink-muted">
        Membership Card
      </label>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />

        <input
          type="text"
          value={membershipCard}
          onChange={(e) => setMembershipCard(e.target.value)}
          placeholder="Search membership card..."
          className="h-10 w-full rounded-lg border border-white/10 bg-[#211914] pl-9 pr-3 text-sm text-white placeholder:text-ink-muted outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
        />
      </div>
    </div>

    {/* Status Filter */}
    <div className="w-full sm:w-auto sm:min-w-[170px]">
      <label className="mb-1.5 block text-xs font-medium text-ink-muted">
        Status
      </label>

      <select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value || null)}
        className="h-10 w-full rounded-lg border border-white/10 bg-[#211914] px-3 text-sm text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
      >
        <option value="">All Memberships</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>

    {/* Clear Filter */}
    {(status || membershipCard) && (
      <button
        type="button"
        onClick={() => {
          setStatus(null);
          setMembershipCard("");
        }}
        className="h-10 rounded-lg border border-white/10 px-4 text-sm font-medium text-ink-muted transition hover:border-orange-500/40 hover:text-white"
      >
        Clear
      </button>
    )}

  </div>
    </div>

    <div className="mb-2">
      <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600 sm:h-12 sm:w-auto sm:rounded-full sm:px-5"
            onClick={()=>setOpen(true)}
          >
            <span>Add Membership Manually</span>
    
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-orange-500">
              <Plus size={17} />
            </span>
      </button>
    </div>
    
      {/* Purchase Records */}

      {allMemberships.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 md:gap-5">

  {allMemberships.map((membership,idx) => (
    <MembershipCard membership={membership} key={membership?._id || idx} getStatusConfig={getStatusConfig} isEdit={true} />
  ))}

        </div>

      ) : (

        /* Empty State */

        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#342620] bg-[#1d1512] px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff681d]/10 text-[#ff681d]">
            <span className="text-xl">₤</span>
          </div>

          <h2 className="text-lg font-bold text-white">
            No Membership Records
          </h2>

          <p className="mt-2 max-w-md text-sm text-[#8f817a]">
            No membership yet.
          </p>
        </div>

      )}

      {open && (
        <div>
          <ManualMembershipForm 
          name={name}
          plans={plans}
          users={users}
          onClose={()=>setOpen(false)}
          setName={setName}
          isSubmitting={isSubmitting}
          onSubmitMembership={onSubmit}

          />
        </div>
      )}

    </section>
  );
}

export default AdminMembership;
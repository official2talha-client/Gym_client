import React, { useState } from "react";
import { useGetAllPurchasesQuery } from "../../api/purchaseApi.js";
import PurchaseCard from "../../components/admin/PurchaseCard.jsx";
import { useSearchParams } from "react-router-dom";

function AdminPurchase() {

const [searchParams] = useSearchParams();
const statusParam = searchParams.get("status");
  

  const [status,setStatus] = useState(statusParam || null)
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)


  const { data, isLoading, isError,refetch } = useGetAllPurchasesQuery({

    status,
    startDate,
    endDate
   
  });

  const allPurchase = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-[#8f817a]">Loading purchases...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
        <p className="text-sm text-red-400">
          Failed to load your purchase records.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Page Header */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white">
          All Purchases
        </h1>

        <p className="mt-1 text-sm text-[#8f817a]">
          View all membership purchase requests and their current status.
        </p>
      </div> */}


      {/* filter section  */}


<div className="mb-5 rounded-xl border border-white/10 bg-[#17100d] p-4">
  <div className="flex flex-wrap items-end gap-3">

    {/* Status */}
    <div className="w-full sm:w-auto sm:min-w-[160px]">
      <label className="mb-1.5 block text-xs font-medium text-ink-muted">
        Status
      </label>

      <select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value || null)}
        className="h-10 w-full rounded-lg border border-white/10 bg-[#211914] px-3 text-sm text-white outline-none transition focus:border-orange-500"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    {/* Start Date */}
    <div className="w-full sm:w-auto sm:min-w-[160px]">
      <label className="mb-1.5 block text-xs font-medium text-ink-muted">
        From
      </label>

     <input
  type="date"
  value={startDate || ""}
  onChange={(e) => setStartDate(e.target.value || null)}
  className="h-10 w-full rounded-lg border border-white/10 bg-[#211914] px-3 text-sm text-white outline-none transition focus:border-orange-500 [color-scheme:dark]"
/>
    </div>

    {/* End Date */}
    <div className="w-full sm:w-auto sm:min-w-[160px]">
      <label className="mb-1.5 block text-xs font-medium text-ink-muted">
        To
      </label>

      <input
        type="date"
        value={endDate || ""}
        onChange={(e) => setEndDate(e.target.value || null)}
        className="h-10 w-full rounded-lg border border-white/10 bg-[#211914] px-3 text-sm text-white outline-none transition focus:border-orange-500 [color-scheme:dark]"
      />
    </div>

    {/* Clear */}
    {(status || startDate || endDate) && (
      <button
        type="button"
        onClick={() => {
          setStatus(null);
          setStartDate(null);
          setEndDate(null);
        }}
        className="h-10 rounded-lg border border-white/10 px-4 text-sm font-medium text-ink-muted transition hover:border-orange-500/40 hover:text-white"
      >
        Clear
      </button>
    )}

  </div>
</div>

      {/* Purchase Records */}
      {allPurchase.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 md:gap-5">
  {allPurchase.map((purchase) => (
    <PurchaseCard
      key={purchase?._id}
      purchase={purchase}
      refetch = {refetch}
    />
  ))}
</div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#342620] bg-[#1d1512] px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff681d]/10 text-[#ff681d]">
            <span className="text-xl">₤</span>
          </div>

          <h2 className="text-lg font-bold text-white">
            No Purchase Records
          </h2>

          <p className="mt-2 max-w-md text-sm text-[#8f817a]">
            User hasn't made any membership purchase requests yet.
          </p>
        </div>
      )}
    </section>
  );
}

export default AdminPurchase;
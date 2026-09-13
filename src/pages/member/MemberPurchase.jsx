import React from "react";
import { useGetMyPurchasesQuery } from "../../api/purchaseApi.js";
import PurchaseCard from "../../components/member/PurchaseCard.jsx";

function MemberPurchase() {
  const { data, isLoading, isError } = useGetMyPurchasesQuery();

  const myPurchases = data?.data || [];

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white">
          My Purchases
        </h1>

        <p className="mt-1 text-sm text-[#8f817a]">
          View your membership purchase requests and their current status.
        </p>
      </div>

      {/* Purchase Records */}
      {myPurchases.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 md:gap-5">
  {myPurchases.map((purchase) => (
    <PurchaseCard
      key={purchase?._id}
      purchase={purchase}
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
            You haven't made any membership purchase requests yet.
          </p>
        </div>
      )}
    </section>
  );
}

export default MemberPurchase;
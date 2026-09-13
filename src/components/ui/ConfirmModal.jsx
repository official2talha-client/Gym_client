export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
  loading
}) {
  if (!open) return null;

  return (

    <fieldset disabled={loading}>

    <div className="fixed inset-0  flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[#342620] bg-[#1d1512] p-6 shadow-2xl">
        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide text-white">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#a99b94]">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#45352e] bg-[#261c18] px-5 py-3 text-sm font-semibold text-[#c9bbb4] transition hover:bg-[#30231e]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#ff681d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e95712]"
          >
           {loading? "proccessing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
    </fieldset>
  );
}
import { useEffect, useState } from "react";
import FlatCard from "../../components/ui/FlatCard";
import PillButton from "../../components/ui/PillButton";
import {
  useGetMyBusinessQuery,
  useUpdateBusinessMutation
} from "../../api/adminApi.js";
import toast from "react-hot-toast";

const TABS = ["Business Info", "Branding"];

function Field({
  label,
  value,
  type = "text",
  onChange
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-white"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white outline-none focus:border-accent"
      />
    </div>
  );
}

export default function Settings() {
  const {
    data,
    isLoading,
    isError
  } = useGetMyBusinessQuery();

  const business = data?.data;

  const [
    updateBusiness,
    { isLoading: isUpdating }
  ] = useUpdateBusinessMutation();

  const [tab, setTab] = useState(TABS[0]);

  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    if (business) {
      setBusinessInfo({
        name: business?.name || "",
        address: business?.address || "",
        phone: business?.phone || "",
        email: business?.email || ""
      });

      setLogoPreview(business?.logo || "");
    }
  }, [business]);

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;

    setBusinessInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(file);

    const preview = URL.createObjectURL(file);

    setLogoPreview(preview);
  };

const handleUpdateBusiness = async () => {
  try {
    const formData = new FormData();

    formData.append("name", businessInfo.name);
    formData.append("address", businessInfo.address);
    formData.append("phone", businessInfo.phone);
    formData.append("email", businessInfo.email);

    // Only send logo when user selected a new one
    if (logo) {
      formData.append("logo", logo);
    }
   
    const response = await updateBusiness(formData).unwrap();

    toast.success(
      response?.message || "Business information updated successfully!"
    );
  } catch (error) {
    console.error("Update Business Error:", error);

    toast.error(
      error?.data?.message ||
        error?.message ||
        "Failed to update business information."
    );
  }
};

 const handleUpdateBranding = async () => {
  if (!logo) {
    toast.error("Please select a logo first.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("logo", logo);

    const response = await updateBusiness(formData).unwrap();

    toast.success(
      response?.message || "Branding updated successfully!"
    );
  } catch (error) {
    console.error("Update Branding Error:", error);

    toast.error(
      error?.data?.message ||
        error?.message ||
        "Failed to update branding."
    );
  }
};

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-white">
        Loading business information...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-red-400">
        Failed to load business information.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

      {/* Tabs */}

      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">

        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-accent text-white"
                : "text-ink-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}

      </div>


      {/* Content */}

      <FlatCard className="p-6 sm:p-8">

        {/* Business Info */}

        {tab === "Business Info" && (
          <div className="space-y-5">

            <Field
              label="Gym Name"
              value={businessInfo.name}
              onChange={(e) =>
                handleBusinessChange({
                  target: {
                    name: "name",
                    value: e.target.value
                  }
                })
              }
            />

            <Field
              label="Address"
              value={businessInfo.address}
              onChange={(e) =>
                handleBusinessChange({
                  target: {
                    name: "address",
                    value: e.target.value
                  }
                })
              }
            />

            <Field
              label="Phone"
              value={businessInfo.phone}
              onChange={(e) =>
                handleBusinessChange({
                  target: {
                    name: "phone",
                    value: e.target.value
                  }
                })
              }
            />

            <Field
              label="Email"
              type="email"
              value={businessInfo.email}
              onChange={(e) =>
                handleBusinessChange({
                  target: {
                    name: "email",
                    value: e.target.value
                  }
                })
              }
            />

            <PillButton
  variant="orange"
  size="sm"
  onClick={handleUpdateBusiness}
  disabled={isUpdating}
>
  {isUpdating ? "Saving..." : "Save Changes"}
</PillButton>

          </div>
        )}


        {/* Branding */}

        {tab === "Branding" && (
          <div className="space-y-5">

            <div>
              <p className="text-sm font-semibold text-white">
                Business Logo
              </p>

              <p className="mt-1 text-sm text-ink-muted">
                Upload the logo that will be displayed throughout the gym
                management system.
              </p>
            </div>


            {/* Logo Preview */}

            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-base">

              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Business logo"
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs text-ink-muted">
                  No Logo
                </span>
              )}

            </div>


            {/* Upload */}

            <div>

              <label
                htmlFor="business-logo"
                className="inline-flex cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Choose Logo
              </label>

              <input
                id="business-logo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
                className="hidden"
              />

              {logo && (
                <p className="mt-2 break-all text-xs text-ink-muted">
                  {logo.name}
                </p>
              )}

            </div>


            <PillButton
  variant="orange"
  size="sm"
  onClick={handleUpdateBranding}
  disabled={isUpdating}
>
  {isUpdating ? "Saving..." : "Save Branding"}
</PillButton>

          </div>
        )}

      </FlatCard>

    </div>
  );
}
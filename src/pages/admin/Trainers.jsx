import { useState } from "react";
import FlatCard from "../../components/ui/FlatCard";
import PillButton from "../../components/ui/PillButton";
import { SkeletonCard } from "../../components/ui/Skeleton";
import { ErrorState } from "../../components/ui/EmptyState";
import {
  useFilterTrainersQuery,
  useCreateTrainerMutation,
  useDeleteTrainerMutation
} from "../../api/trainerApi.js";

import { useForm } from "react-hook-form";
import {
  Upload,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Trash2
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const STEPS = [
  "Photo",
  "Bio",
  "Specialties",
  "Availability",
];

export default function Trainers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confDelete, setConfDelete] = useState(false);
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [id,setId] = useState(null);

  const {
  register,
  handleSubmit,
  trigger,
  setValue,
  reset,
  watch,
  formState: { errors },
} = useForm({
  defaultValues: {
    image: null,
    name: "",
    age: "",
    gender: "",
    experience: "",
    achievements: [],
    shift: "",
    timeRange: "",
  },
});

  const [createTrainer, { isLoading }] =
    useCreateTrainerMutation();


  const {
    data: trainerData,
    isLoading: trainerLoading,
    isError,
    refetch,
  } = useFilterTrainersQuery({});

  const trainers = trainerData?.data || [];

  // =====================================================
  // CLOSE / RESET MODAL
  // =====================================================

  const closeModal = () => {
    if (isLoading) return;

    setModalOpen(false);
    setStep(1);
    setPreview(null);

    reset({
      image: null,
      name: "",
      age: "",
      gender: "",
      experience: "",
      achievements: [], 
      shift: "",
      timeRange: "",
    });
  };

  // =====================================================
  // OPEN MODAL
  // =====================================================

  const openModal = () => {
    setStep(1);
    setPreview(null);

    reset({
      image: null,
      name: "",
      age: "",
      gender: "",
      experience: "",
      achievements: [],
      shift: "",
      timeRange: "",
    });

    setModalOpen(true);
  };

  // =====================================================
  // IMAGE
  // =====================================================

const handleImageChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB");
    return;
  }

  setValue("image", file, {
    shouldValidate: true,
    shouldDirty: true,
  });

  setPreview(URL.createObjectURL(file));
};

  const removeImage = () => {
    setPreview(null);

    setValue("image", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // =====================================================
  // STEP VALIDATION
  // =====================================================

const handleNext = async () => {
  // STEP 1
  if (step === 1) {
    const image = watch("image");

    if (!image) {
      alert("Please upload trainer image");
      return;
    }

    setStep(2);
    return;
  }

  // STEP 2
  if (step === 2) {
    const valid = await trigger([
      "name",
      "age",
      "gender",
    ]);

    if (!valid) return;

    setStep(3);
    return;
  }

  // STEP 3
  if (step === 3) {
    const valid = await trigger([
      "experience",
      "achievements",
    ]);

    if (!valid) return;

    setStep(4);
    return;
  }
};

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("experience", data.experience);
      formData.append(
  "achievements",
  JSON.stringify(data.achievements)
);
      formData.append("shift", data.shift);
      formData.append("timeRange", data.timeRange);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      await createTrainer(formData).unwrap();

      // Close and reset
      closeModal();

      toast.success("trainer registered successfully")

      // Get newly created trainer
      refetch();
    } catch (error) {
      console.error(
        "Failed to create trainer:",
        error
      );
      toast.error(error?.data?.message || "trainer creation failed")
    }
  };

  // delete section 

  const [deleteTrainer, { isLoading:deleteLoading }] =
    useDeleteTrainerMutation();

    const handleDelete = async(tId)=>{
      try {

        await deleteTrainer(tId).unwrap()
        setConfDelete(false)
        toast.success("trainer profile removed successfully")
        setId(null)
        
      } catch (error) {
        console.log("trainer deletion failed",error);
        toast.error(error?.data?.message || "failed to delete trainer profile")
        
      }
    }

  return (
    <>

      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <p className="text-sm text-ink-muted">
            {trainers.length} trainers on staff
          </p>

          <PillButton
            variant="orange"
            size="sm"
            onClick={openModal}
          >
            Add Trainer
          </PillButton>

        </div>

        {/* Loading */}
        {trainerLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <ErrorState onRetry={refetch} />
        )}

        {/* Trainers */}
        {!trainerLoading && !isError && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {trainers.map((t) => (
              <FlatCard
                key={t._id || t.id}
                className="overflow-hidden"
              >
                <Link to={`/trainers/${t._id}`}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="aspect-square w-full object-cover"
                />
                </Link>

                <div className="p-4">

                  <p className="font-semibold text-white">
                    {t.name}
                  </p>

                  <p className="text-sm text-accent-light">
                    {t.experience} years of experience
                  </p>

                  <div className="mt-3 flex gap-2">

                    <button
              type="button"
               className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 active:scale-95"
                 onClick={()=>{
                  setConfDelete(true);
                  setId(t?._id);
                }
                  }   >
             <Trash2 size={16} strokeWidth={2} />
                  Delete
                  </button>

                  </div>

                </div>

              </FlatCard>
            ))}

          </div>
        )}

      </div>

      {/* CREATE TRAINER MODAL */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={closeModal}
        >

          {/* Modal */}
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151515] p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-6 flex items-start justify-between">

              <div>
                <h2 className="text-2xl font-semibold">
                  Add Trainer
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Step {step} of {STEPS.length} —{" "}
                  {STEPS[step - 1]}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isLoading}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* ================================================= */}
            {/* STEP INDICATOR */}
            {/* ================================================= */}

            <div className="mb-8 flex gap-2">

              {STEPS.map((_, index) => {
                const item = index + 1;

                return (
                  <div
                    key={item}
                    className={`h-1.5 flex-1 rounded-full transition ${
                      step >= item
                        ? "bg-blue-500"
                        : "bg-white/10"
                    }`}
                  />
                );
              })}

            </div>

            <fieldset disabled={isLoading}>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* ================================================= */}
                {/* STEP 1 — PHOTO */}
                {/* ================================================= */}

                {step === 1 && (
                  <div>

                    <h3 className="mb-5 text-lg font-medium">
                      Trainer Photo
                    </h3>

                    <div className="flex flex-col items-center">

                      <label
                        htmlFor="trainer-image"
                        className="group relative flex h-64 w-64 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/20 bg-white/5 transition hover:border-blue-500"
                      >

                        {preview ? (
                          <img
                            src={preview}
                            alt="Trainer preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-gray-400">

                            <Upload size={36} />

                            <p className="mt-3 text-sm">
                              Upload trainer image
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG or JPEG · Max 5MB
                            </p>

                          </div>
                        )}

                <input
                  id="trainer-image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleImageChange}
                />

                      </label>

                      {preview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="mt-3 flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                        >
                          <X size={15} />
                          Remove image
                        </button>
                      )}

                      {errors.image && (
                        <p className="mt-3 text-sm text-red-400">
                          {errors.image.message}
                        </p>
                      )}

                    </div>

                  </div>
                )}

                {/* ================================================= */}
                {/* STEP 2 — BIO */}
                {/* ================================================= */}

                {step === 2 && (
                  <div>

                    <h3 className="mb-5 text-lg font-medium">
                      Basic Information
                    </h3>

                    <div className="space-y-5">

                      {/* NAME */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Name
                        </label>

                        <input
                          type="text"
                          placeholder="Enter trainer name"
                          {...register("name", {
                            required:
                              "Name is required",
                          })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500"
                        />

                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.name.message}
                          </p>
                        )}

                      </div>

                      {/* AGE */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Age
                        </label>

                        <input
                          type="number"
                          placeholder="Enter age"
                          {...register("age", {
                            required:
                              "Age is required",
                            min: {
                              value: 18,
                              message:
                                "Age must be at least 18",
                            },
                          })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500"
                        />

                        {errors.age && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.age.message}
                          </p>
                        )}

                      </div>

                      {/* GENDER */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Gender
                        </label>

                        <select
                          {...register("gender", {
                            required:
                              "Gender is required",
                          })}
                          className="w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 outline-none focus:border-blue-500"
                        >
                          <option value="">
                            Select gender
                          </option>

                          <option value="male">
                            Male
                          </option>

                          <option value="female">
                            Female
                          </option>

                          
                        </select>

                        {errors.gender && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.gender.message}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                )}

               
                {/* STEP 3 — SPECIALTIES */}
                

                {step === 3 && (
                  <div>

                    <h3 className="mb-5 text-lg font-medium">
                      Experience & Achievements
                    </h3>

                    <div className="space-y-5">

                      {/* EXPERIENCE */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Experience
                        </label>

                        <input
                          type="number"
                          placeholder="Experience years in number"
                          {...register("experience", {
                            required:
                              "Experience is required",
                          })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500"
                        />

                        {errors.experience && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.experience.message}
                          </p>
                        )}

                      </div>

                      {/* ACHIEVEMENTS */}
                      <div>
  <div className="mb-3 flex items-center justify-between">
    <label className="block text-sm text-gray-300">
      Achievements
    </label>

    <button
      type="button"
      onClick={() => {
        const current = watch("achievements") || [];

        setValue("achievements", [...current, ""], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium transition hover:bg-blue-500"
    >
      <Plus size={16} />
      Add
    </button>
  </div>

  <div className="space-y-3">
    {(watch("achievements") || []).map((_, index) => (
      <div
        key={index}
        className="flex items-start gap-2"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder={`Achievement ${index + 1}`}
            {...register(`achievements.${index}`, {
              
            })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.achievements?.[index] && (
            <p className="mt-1 text-sm text-red-400">
              {errors.achievements[index].message}
            </p>
          )}
        </div>

        {watch("achievements").length > 1 && (
          <button
            type="button"
            onClick={() => {
              const current = watch("achievements");

              setValue(
                "achievements",
                current.filter((_, i) => i !== index),
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              );
            }}
            className="mt-1 rounded-lg p-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    ))}
  </div>
</div>

                    </div>

                  </div>
                )}

                {/* STEP 4 — AVAILABILITY */}               

                {step === 4 && (
                  <div>

                    <h3 className="mb-5 text-lg font-medium">
                      Availability
                    </h3>

                    <div className="space-y-5">

                      {/* SHIFT */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Shift
                        </label>

                        <select
                          {...register("shift", {
                            required:
                              "Shift is required",
                          })}
                          className="w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 outline-none focus:border-blue-500"
                        >
                          <option value="">
                            Select shift
                          </option>

                          <option value="morning">
                            Morning
                          </option>

                          <option value="evening">
                            Evening
                          </option>

                        </select>

                        {errors.shift && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.shift.message}
                          </p>
                        )}

                      </div>

                      {/* TIME RANGE */}
                      <div>

                        <label className="mb-2 block text-sm text-gray-300">
                          Time Range
                        </label>

                        <input
                          type="text"
                          placeholder="Example: 6:00 AM - 10:00 AM"
                          {...register("timeRange", {
                            required:
                              "Time range is required",
                          })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500"
                        />

                        {errors.timeRange && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.timeRange.message}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                )}

               
                {/* BUTTONS */}

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">

                  {/* LEFT */}
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm transition hover:bg-white/5"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-white/10 px-5 py-2.5 text-sm transition hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  )}

                  {/* RIGHT */}
                  {step < STEPS.length ? (
  <button
    type="button"
    onClick={handleNext}
    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium"
  >
    Next
    <ChevronRight size={18} />
  </button>
) : (
  <button
    type="submit"
    className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium"
  >
    {isLoading ? "Creating..." : "Create Trainer"}
  </button>
)}

                </div>

              </form>

            </fieldset>

          </div>
        </div>
      )}

      {confDelete && (


<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md" onClick={()=>setConfDelete(false)}>
  <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6 text-white shadow-2xl"onClick={(e)=>e.stopPropagation()} >

    {/* Icon */}
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
      <Trash2
        size={22}
        className="text-red-400"
        strokeWidth={2}
      />
    </div>

    {/* Content */}
    <div>
      <h2 className="text-xl font-semibold">
        Delete Trainer?
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Are you sure you want to delete this trainer? This action
        cannot be undone and all information associated with this
        trainer will be permanently removed.
      </p>
    </div>

    {/* Divider */}
    <div className="my-6 border-t border-white/10" />

    {/* Actions */}
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={()=>setConfDelete(false)}
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={()=>handleDelete(id)}
        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 active:scale-[0.98]"
      >
        <Trash2 size={16} />
       {deleteLoading? "Deleting..." : "Delete Trainer"}
      </button>
    </div>

  </div>
</div>

      )}

    </>
  );
}
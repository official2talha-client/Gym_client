import React from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Image as ImageIcon,
  Save,
} from "lucide-react";

// Change this import to your actual RTK API file
import { useUpdateExerciseMutation } from "../../api/exerciseApi.js";
import toast from "react-hot-toast";

const bodyParts = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Abs",
  "Obliques",
  "Glutes",
  "Quadriceps",
  "Hamstrings",
  "Calves",
  "Adductors",
  "Abductors",
  "Hip Flexors",
  "Lower Back",
  "Traps",
  "Neck",
  "Full Body",
  "Cardio",
];

const equipmentOptions = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  "Kettlebell",
  "Resistance Band",
  "Bodyweight",
  "Pull Up Bar",
  "Bench",
  "Other",
];

const EditVideo = ({ video, onClose }) => {
  const [updateVideo, { isLoading }] = useUpdateExerciseMutation();

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm({
  defaultValues: {
    name: video?.name || "",
    bodyPart: video?.bodyPart || "",
    targetMuscle: video?.targetMuscle || "",
    secondaryMuscles: video?.secondaryMuscles || "",
    equipment: video?.equipment || "",
    difficulty: video?.difficulty || "",
    duration: video?.duration || "",
    description: video?.description || "",
    thumbnail: null,
  },
});

  const thumbnailFile = watch("thumbnail");

 const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("bodyPart", data.bodyPart);
    formData.append("targetMuscle", data.targetMuscle);
    formData.append("secondaryMuscles", data.secondaryMuscles || "");
    formData.append("equipment", data.equipment);
    formData.append("difficulty", data.difficulty);
    formData.append("duration", data.duration || "");
    formData.append("description", data.description || "");

    // Only send a new thumbnail if selected
    if (data.thumbnail?.[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    await updateVideo({
      id: video?._id,
      formData,
    }).unwrap();

    toast.success("exercise video updated successfully")

    onClose?.();
  } catch (error) {
    console.error("Failed to update exercise:", error);
    toast.success(error?.data?.message || "Failed to update exercise")
  }
};

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#15100E] shadow-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Edit Exercise Video
          </h2>

          <p className="mt-1 text-xs text-[#756A64]">
            Update exercise information and thumbnail
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#93867f] transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        )}
      </div>

      {/* Form */}
     <form onSubmit={handleSubmit(onSubmit)}>
  <fieldset disabled={isLoading} className="space-y-5 p-5">

    {/* Name */}
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
        Exercise Name
      </label>

      <input
        type="text"
        placeholder="e.g. Bench Press"
        {...register("name", {
          required: "Exercise name is required.",
          minLength: {
            value: 2,
            message: "Exercise name must be at least 2 characters.",
          },
        })}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#514843] focus:border-[#F56A1F]/50"
      />

      {errors.name && (
        <p className="mt-1.5 text-xs text-red-400">
          {errors.name.message}
        </p>
      )}
    </div>

    {/* Body Part + Target Muscle */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      {/* Body Part */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Body Part
        </label>

        <select
          {...register("bodyPart", {
            required: "Body part is required.",
          })}
          className="w-full rounded-xl border border-white/10 bg-[#17100d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50"
        >
          <option value="" disabled>
            Select body part
          </option>

          {bodyParts.map((part) => (
            <option
              key={part}
              value={part}
              className="bg-[#17100d] text-white"
            >
              {part}
            </option>
          ))}
        </select>

        {errors.bodyPart && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.bodyPart.message}
          </p>
        )}
      </div>

      {/* Target Muscle */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Target Muscle
        </label>

        <input
          type="text"
          placeholder="e.g. Pectoralis Major"
          {...register("targetMuscle", {
            required: "Target muscle is required.",
          })}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#514843] focus:border-[#F56A1F]/50"
        />

        {errors.targetMuscle && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.targetMuscle.message}
          </p>
        )}
      </div>
    </div>

    {/* Equipment + Difficulty */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      {/* Equipment */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Equipment
        </label>

        <select
          {...register("equipment", {
            required: "Equipment is required.",
          })}
          className="w-full rounded-xl border border-white/10 bg-[#17100d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50"
        >
          <option value="" disabled>
            Select equipment
          </option>

          {equipmentOptions.map((equipment) => (
            <option
              key={equipment}
              value={equipment}
              className="bg-[#17100d] text-white"
            >
              {equipment}
            </option>
          ))}
        </select>

        {errors.equipment && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.equipment.message}
          </p>
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Difficulty
        </label>

        <select
          {...register("difficulty", {
            required: "Difficulty is required.",
          })}
          className="w-full rounded-xl border border-white/10 bg-[#17100d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50"
        >
          <option value="" disabled>
            Select difficulty
          </option>

          <option value="beginner" className="bg-[#17100d] text-white">
            Beginner
          </option>

          <option value="intermediate" className="bg-[#17100d] text-white">
            Intermediate
          </option>

          <option value="advanced" className="bg-[#17100d] text-white">
            Advanced
          </option>
        </select>

        {errors.difficulty && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.difficulty.message}
          </p>
        )}
      </div>
    </div>

    {/* Secondary Muscles + Duration */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      {/* Secondary Muscles - Optional */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Secondary Muscles
          <span className="ml-1 text-[10px] font-normal text-[#514843]">
            (Optional)
          </span>
        </label>

        <input
          type="text"
          placeholder="e.g. Triceps, Front Delts"
          {...register("secondaryMuscles")}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#514843] focus:border-[#F56A1F]/50"
        />
      </div>

      {/* Duration - Optional */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
          Duration
          <span className="ml-1 text-[10px] font-normal text-[#514843]">
            (Optional)
          </span>
        </label>

        <input
          type="text"
          placeholder="e.g. 10 minutes"
          {...register("duration")}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#514843] focus:border-[#F56A1F]/50"
        />
      </div>
    </div>

    {/* Description - Optional */}
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
        Description
        <span className="ml-1 text-[10px] font-normal text-[#514843]">
          (Optional)
        </span>
      </label>

      <textarea
        rows={4}
        placeholder="Describe the exercise..."
        {...register("description")}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#514843] focus:border-[#F56A1F]/50"
      />
    </div>

    {/* Thumbnail */}
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
        Thumbnail
        <span className="ml-1 text-[10px] font-normal text-[#514843]">
          (Optional)
        </span>
      </label>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">

        {/* Current / Preview Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={
              thumbnailFile?.[0]
                ? URL.createObjectURL(thumbnailFile[0])
                : video?.thumbnail
            }
            alt="Exercise thumbnail"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-md">
            <ImageIcon size={14} />

            {thumbnailFile?.[0]
              ? "New thumbnail"
              : "Current thumbnail"}
          </div>
        </div>

        {/* File Input */}
        <div className="p-3">
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", {
              validate: (files) => {
                if (!files?.[0]) return true;

                if (!files[0].type.startsWith("image/")) {
                  return "Please select a valid image.";
                }

                if (files[0].size > 5 * 1024 * 1024) {
                  return "Image size must be less than 5MB.";
                }

                return true;
              },
            })}
            className="block w-full cursor-pointer text-xs text-[#93867f] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#F56A1F]/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-[#F56A1F] hover:file:bg-[#F56A1F]/20"
          />
        </div>
      </div>

      {errors.thumbnail && (
        <p className="mt-1.5 text-xs text-red-400">
          {errors.thumbnail.message}
        </p>
      )}

      <p className="mt-1.5 text-[11px] text-[#514843]">
        Leave empty to keep the current thumbnail.
      </p>
    </div>

    {/* Buttons */}
    <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-[#B7AAA3] transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 rounded-xl bg-[#F56A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff762c] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Updating...
          </>
        ) : (
          <>
            <Save size={16} />
            Update Video
          </>
        )}
      </button>
    </div>

  </fieldset>
</form>
    </div>
  );
};

export default EditVideo;
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  UploadCloud,
  Image as ImageIcon,
  Video,
  Play,
  X,
  Dumbbell,
  Target,
  Activity,
  Gauge,
  FileText,
  Clock3,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useCreateExerciseMutation } from "../../api/exerciseApi.js";

const CreateVideo = ({ onClose }) => {

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

  const [createVideo, { isLoading }] = useCreateExerciseMutation();

  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bodyPart: "",
      targetMuscle: "",
      secondaryMuscles: "",
      equipment: "",
      difficulty: "",
      description: "",
      duration: "",
    },
  });

  /* --------------------------------
     Thumbnail Preview
  -------------------------------- */

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreview("");
      return;
    }

    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  /* --------------------------------
     Video Preview
  -------------------------------- */

  useEffect(() => {
    if (!videoFile) {
      setVideoPreview("");
      return;
    }

    const url = URL.createObjectURL(videoFile);
    setVideoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  /* --------------------------------
     Select Thumbnail
  -------------------------------- */

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setThumbnailFile(file);
  };

  /* --------------------------------
     Select Video
  -------------------------------- */

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file.");
      return;
    }

    setVideoFile(file);
  };

  /* --------------------------------
     Remove Thumbnail
  -------------------------------- */

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  /* --------------------------------
     Remove Video
  -------------------------------- */

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview("");

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  /* --------------------------------
     Submit
  -------------------------------- */

  const onSubmit = async (data) => {

    // Required file validation
    if (!thumbnailFile) {
      toast.error("Please select a thumbnail.");
      return;
    }

    if (!videoFile) {
      toast.error("Please select an exercise video.");
      return;
    }

    try {
      const formData = new FormData();

      // Text fields
      formData.append("name", data.name);
      formData.append("bodyPart", data.bodyPart);
      formData.append("targetMuscle", data.targetMuscle);
      formData.append("equipment", data.equipment);
      formData.append("difficulty", data.difficulty);

      // Optional fields
      if (data.secondaryMuscles?.trim()) {
        formData.append(
          "secondaryMuscles",
          data.secondaryMuscles.trim()
        );
      }

      if (data.description?.trim()) {
        formData.append(
          "description",
          data.description.trim()
        );
      }

      if (data.duration?.trim()) {
        formData.append("duration", data.duration.trim());
      }

      // Files
      formData.append("thumbnail", thumbnailFile);
      formData.append("video", videoFile);

      const response = await createVideo(formData).unwrap();

      toast.success(
        response?.message || "Exercise video created successfully!"
      );

      reset();

      setThumbnailFile(null);
      setVideoFile(null);
      setThumbnailPreview("");
      setVideoPreview("");

      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = "";
      }

      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Create video failed:", error);

      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to create exercise video."
      );
    }
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading} className="space-y-6">
          {/* --------------------------------
              Header
          -------------------------------- */}

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F56A1F]/20 bg-[#F56A1F]/10 text-[#F56A1F]">
              <Dumbbell size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Create Exercise Video
              </h2>

              <p className="mt-1 text-xs text-[#756A64]">
                Add a new exercise with its demonstration video.
              </p>
            </div>
          </div>

          {/* --------------------------------
              Basic Information
          -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#15100E] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Activity size={17} className="text-[#F56A1F]" />

              <h3 className="text-sm font-bold text-white">
                Exercise Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
                  Exercise Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Barbell Bench Press"
                  {...register("name", {
                    required: "Exercise name is required.",
                    minLength: {
                      value: 2,
                      message:
                        "Exercise name must be at least 2 characters.",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "Exercise name cannot exceed 100 characters.",
                    },
                  })}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 focus:bg-black/30 placeholder:text-[#514843]"
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
    defaultValue=""
  >
    <option value="" disabled className="bg-[#17100d] text-[#514843]">
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
                    minLength: {
                      value: 2,
                      message:
                        "Target muscle is required.",
                    },
                  })}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 placeholder:text-[#514843]"
                />

                {errors.targetMuscle && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.targetMuscle.message}
                  </p>
                )}
              </div>

              {/* Secondary Muscles */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
                  Secondary Muscles
                  <span className="ml-1 text-[#514843]">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Triceps, Front Delts"
                  {...register("secondaryMuscles")}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 placeholder:text-[#514843]"
                />
              </div>

              {/* Equipment */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
                  Equipment
                </label>

                <div className="relative">
                  <Dumbbell
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756A64]"
                  />

                  <input
                    type="text"
                    placeholder="e.g. Barbell"
                    {...register("equipment", {
                      required: "Equipment is required.",
                      minLength: {
                        value: 2,
                        message:
                          "Equipment is required.",
                      },
                    })}
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 placeholder:text-[#514843]"
                  />
                </div>

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

                <div className="relative">
                  <Gauge
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#756A64]"
                  />

                  <select
                    {...register("difficulty", {
                      required:
                        "Difficulty is required.",
                    })}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#F56A1F]/50"
                  >
                    <option value="">
                      Select difficulty
                    </option>
                    <option value="beginner">
                      Beginner
                    </option>
                    <option value="intermediate">
                      Intermediate
                    </option>
                    <option value="advanced">
                      Advanced
                    </option>
                  </select>
                </div>

                {errors.difficulty && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              {/* Duration */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
                  Duration
                  <span className="ml-1 text-[#514843]">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Clock3
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756A64]"
                  />

                  <input
                    type="text"
                    placeholder="e.g. 01:30"
                    {...register("duration")}
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 placeholder:text-[#514843]"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold text-[#B7AAA3]">
                  Description
                  <span className="ml-1 text-[#514843]">
                    (Optional)
                  </span>
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe how to perform this exercise..."
                  {...register("description", {
                    maxLength: {
                      value: 1000,
                      message:
                        "Description cannot exceed 1000 characters.",
                    },
                  })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F56A1F]/50 placeholder:text-[#514843]"
                />

                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --------------------------------
              Upload Section
          -------------------------------- */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Thumbnail */}

            <div className="rounded-2xl border border-white/10 bg-[#15100E] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ImageIcon
                      size={17}
                      className="text-[#F56A1F]"
                    />

                    <h3 className="text-sm font-bold text-white">
                      Exercise Thumbnail
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] text-[#756A64]">
                    Upload the image shown before the video plays.
                  </p>
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                  Required
                </span>
              </div>

              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />

              {!thumbnailPreview ? (
                <button
                  type="button"
                  onClick={() =>
                    thumbnailInputRef.current?.click()
                  }
                  className="group relative flex min-h-[230px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-black/20 transition-all duration-300 hover:border-[#F56A1F]/50 hover:bg-[#F56A1F]/5"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#F56A1F]/10 blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#F56A1F]/10 blur-3xl" />
                  </div>

                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#756A64] transition-all duration-300 group-hover:scale-110 group-hover:border-[#F56A1F]/30 group-hover:bg-[#F56A1F]/10 group-hover:text-[#F56A1F]">
                    <UploadCloud size={30} />
                  </div>

                  <p className="relative text-sm font-semibold text-white">
                    Drop thumbnail here
                  </p>

                  <p className="relative mt-1 text-xs text-[#756A64]">
                    or click to browse
                  </p>

                  <div className="relative mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-[#756A64]">
                    <ImageIcon size={12} />
                    JPG, PNG, WEBP
                  </div>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-[#F56A1F]/20 bg-black/20">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-[230px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-md">
                    <ImageIcon size={14} />
                    {thumbnailFile?.name}
                  </div>

                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Video */}

            <div className="rounded-2xl border border-white/10 bg-[#15100E] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Video
                      size={17}
                      className="text-[#F56A1F]"
                    />

                    <h3 className="text-sm font-bold text-white">
                      Exercise Video
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] text-[#756A64]">
                    Upload the exercise demonstration video.
                  </p>
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                  Required
                </span>
              </div>

              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />

              {!videoPreview ? (
                <button
                  type="button"
                  onClick={() =>
                    videoInputRef.current?.click()
                  }
                  className="group relative flex min-h-[230px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-black/20 transition-all duration-300 hover:border-[#F56A1F]/50 hover:bg-[#F56A1F]/5"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#F56A1F]/10 blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#F56A1F]/10 blur-3xl" />
                  </div>

                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#756A64] transition-all duration-300 group-hover:scale-110 group-hover:border-[#F56A1F]/30 group-hover:bg-[#F56A1F]/10 group-hover:text-[#F56A1F]">
                    <UploadCloud size={30} />
                  </div>

                  <p className="relative text-sm font-semibold text-white">
                    Drop exercise video here
                  </p>

                  <p className="relative mt-1 text-xs text-[#756A64]">
                    or click to browse
                  </p>

                  <div className="relative mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-[#756A64]">
                    <Video size={12} />
                    MP4, MOV, WEBM
                  </div>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-[#F56A1F]/20 bg-black">
                  <video
                    src={videoPreview}
                    controls
                    className="h-[230px] w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-md">
                    <Play size={13} fill="currentColor" />
                    Video Preview
                  </div>

                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* --------------------------------
              Bottom Actions
          -------------------------------- */}

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-[#9B8D86] transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group flex items-center justify-center gap-2 rounded-xl bg-[#F56A1F] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#F56A1F]/20 transition-all duration-300 hover:bg-[#ff762c] hover:shadow-[#F56A1F]/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Create Exercise
                </>
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateVideo;
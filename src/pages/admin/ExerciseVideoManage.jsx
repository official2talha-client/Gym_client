import React, { useState } from "react";
import { Search, Video, RotateCcw ,Plus} from "lucide-react";
import {useGetAllExercisesQuery} from "../../api/exerciseApi.js";
import ExerciseVideo from "../../components/admin/ExcerciseVideo.jsx";
import CreateVideo from "../../components/admin/CreateVideo.jsx";

const ManageExerciseVideos = () => {
  const [search, setSearch] = useState("");
  const [open,setOpen] = useState(false)

  const {data:videoData,isLoading,isError} = useGetAllExercisesQuery({
    search
  })
    const videos = videoData?.data?.exercises

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
    <div className="min-h-screen w-full bg-[#0F0B09] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F56A1F]/20 bg-[#F56A1F]/10 text-[#F56A1F]">
            <Video size={21} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Exercise Videos
            </h1>

            <p className="mt-1 text-xs text-[#756A64] sm:text-sm">
              Manage exercise demonstrations and training videos
            </p>
          </div>
        </div>
      </div>

      {/* Search / Filters */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-[#15100E] p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          
          {/* Search by name */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756A64]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by exercise name or equipment..."
              className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-[#514843] focus:border-[#F56A1F]/40 focus:bg-black/30"
            />
          </div>

        
          {/* Reset */}
          {(name) && (
            <button
              type="button"
              onClick={() => {
                setName("");
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#9B8D86] transition-all duration-200 hover:border-[#F56A1F]/30 hover:bg-[#F56A1F]/10 hover:text-white"
            >
              <RotateCcw size={15} />
              Reset
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
            <span>Add New Exercise</span>
    
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-orange-500">
              <Plus size={17} />
            </span>
      </button>
    </div>

      {/* Videos */}
      <ExerciseVideo videos={videos} />

  {open && (
  <div
    className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md sm:p-6 gym-scrollbar"
    onClick={() => setOpen(false)}
  >
    <div
      className="my-4 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0F0B09] shadow-2xl sm:my-8"
      onClick={(e) => e.stopPropagation()}
    >
      <CreateVideo onClose={() => setOpen(false)} />
    </div>
  </div>
   )}

    </div>
  );
};

export default ManageExerciseVideos;
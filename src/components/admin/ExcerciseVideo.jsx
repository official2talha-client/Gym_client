import React, { useState } from "react";
import {
  Play,
  Video,
  Dumbbell,
  BicepsFlexedIcon,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {useDeleteExerciseMutation} from '../../api/exerciseApi.js'
import toast from "react-hot-toast";
import EditVideo from "./EditVideo.jsx";

const ExerciseVideo = ({ videos = [] }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [edit,setEdit] = useState(false);
  const [onEdit,setOnEdit] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const [deleteVideo,{isLoading}] = useDeleteExerciseMutation()

  const handleDelete = async(id)=>{
    try {

      await deleteVideo(id).unwrap()
      setOpenMenu(false)
      toast.success("video deleted successfully")
      
    } catch (error) {
      console.log("video deletion failed",error);
      toast.error(error?.data?.message || "failed to delete video")
      
    }
  }

  return (
    <div className="w-full">
      {videos?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((item) => (
            <div key={item?._id} className="relative">
              <Link to={`/video/${item?._id}`}>
                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15100E] transition-all duration-300 hover:border-[#F56A1F]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={item?.thumbnail}
                      alt="Exercise thumbnail"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />

                    {/* Play Button */}
                    <button
                      type="button"
                      className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F56A1F] text-white shadow-lg shadow-[#F56A1F]/30 transition-all duration-300 hover:scale-110 hover:bg-[#ff762c]"
                    >
                      <Play
                        size={20}
                        fill="currentColor"
                        className="ml-0.5"
                      />
                    </button>

                    {/* Video badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      <Video size={12} />
                      Video
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 pr-14">
                    <h3 className="text-md truncate text-white">
                      {item?.name || "Exercise Video"}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-xs capitalize text-[#93867f]">
                      <span className="rounded-md border border-orange-800 p-1">
                        <BicepsFlexedIcon size={16} />
                      </span>
                      {item?.bodyPart}
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-xs capitalize text-[#93867f]">
                      <span className="rounded-md border border-orange-800 p-1">
                        <Dumbbell size={16} />
                      </span>
                      {item?.equipment}
                    </p>
                  </div>
                </div>
              </Link>

              {/* 3 Dot Menu */}
              <div className="absolute right-3 top-3 z-30">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handleMenuToggle(item?._id);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
                >
                  <MoreVertical size={18} />
                </button>

                {/* Dropdown */}
                {openMenu === item?._id && (
                  <div className="absolute right-0 top-11 w-32 overflow-hidden rounded-xl border border-white/10 bg-[#1A1412] p-1.5 shadow-xl" onClick={(e)=>e.stopPropagation()}>
                    {/* Update */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOnEdit(item)
                        setOpenMenu(null);
                        setEdit(true);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white transition hover:bg-white/10"
                    >
                      <Pencil size={15} />
                      Update
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        setOpenMenu(null);

                        // handle delete here
                        handleDelete(item?._id)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
          <div className="text-center">
            <Video
              size={32}
              className="mx-auto mb-3 text-[#514843]"
            />

            <p className="text-sm font-medium text-[#756A64]">
              No exercise videos found
            </p>
          </div>
        </div>
      )}

      {edit && onEdit && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    onClick={() => setEdit(null)}
  >
    <div
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto gym-scrollbar"
      onClick={(e) => e.stopPropagation()}
    >
      <EditVideo
        video={onEdit}
        onClose={() => setEdit(null)}
      />
    </div>
  </div>
       )}

    </div>
  );
};

export default ExerciseVideo;
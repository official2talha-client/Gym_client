import { createPortal } from "react-dom";
import {X} from 'lucide-react'

const Model = ({ children, setOpen }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] h-screen w-screen bg-black/60 p-4 backdrop-blur-md"
      onClick={()=>setOpen(false)}
    >
      <X  onClick={()=>setOpen(false)} className=" cursor-pointer "/>

      <div
        className="h-full w-full overflow-y-auto gym-scrollbar p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Model;
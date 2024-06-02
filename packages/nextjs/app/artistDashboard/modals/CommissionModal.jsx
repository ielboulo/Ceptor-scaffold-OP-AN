import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-[#181818] p-8 rounded-xl shadow-lg z-10 max-w-3xl w-full overflow-y-auto max-h-[80vh]">
        <button onClick={onClose} className="w-full flex justify-end mb-2">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

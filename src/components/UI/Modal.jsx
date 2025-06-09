import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  console.log("Modal render, open =", open);

  useEffect(() => {
    const modal = dialog.current;
    console.log("Modal ref:", modal);

    if (!modal) return;

    if (open && !modal.open) {
      console.log("Calling showModal()");
      modal.showModal();
    } else if (!open && modal.open) {
      console.log("Calling close()");
      modal.close();
    }
  }, [open]);

  if (!document.getElementById("modal")) {
    console.warn("No #modal element found in DOM!");
    return null;
  }

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onClose={() => {
        console.log("Dialog onClose triggered");
        onClose && onClose();
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

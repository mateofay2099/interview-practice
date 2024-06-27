import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ onClose, children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.body;
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            inset: "0",
            width: "100%",
            minHeight: "100%",
            height: "max-content",
            background: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            padding: "5rem 1rem 1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              borderRadius: 12,
              padding: "2rem",
              backgroundColor: "white",
              overflow: "auto",
              position: "relative",
              width: "40rem",
              height: "30rem",
            }}
          >
            <p
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              X
            </p>
            {children}
          </div>
        </div>,
        ref.current
      )
    : null;
};

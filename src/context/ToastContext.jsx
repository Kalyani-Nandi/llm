import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ toastType, message,title, duration = 5000 }) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, toastType, message, title,duration },
    ]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-16 right-5 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.toastType}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              )
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

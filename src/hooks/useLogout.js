import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const useLogout = () => {
  const router = useRouter();
  const { logout, currentUser, setUserInfo } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        // Sign-out successful.
        setSuccess("Successfully signed out");
        setUserInfo(null);

        setTimeout(() => {
          setSuccess("");
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        const errorMessage = error?.message
          ?.replace(/firebase/gi, "")
          ?.replace(":", "");
        setError(errorMessage);

        setTimeout(() => {
          setError("");
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { handleLogout, currentUser, success, error, isLoading };
};

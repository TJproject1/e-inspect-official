import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const { login, userInfo: user, setLoading: setGlobalLoading } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (email, password) => {
    setLoading(true);
    login(email, password)
      .then(async (userCredential) => {
        // Signed in
        setSuccess("Successfully signed in");
        setTimeout(() => {
          setSuccess("");
          setGlobalLoading(true);
          //redirect
          router.push("/dashboard");
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

  return { user, success, error, handleLogin, isLoading };
};

import { useAuth } from "@/context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "../../firebase";

export const useRegister = () => {
  const { signup, userInfo: user } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleRegister = ({ email, password, ...props }) => {
    setLoading(true);
    signup(email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(true);
        const user = userCredential.user;
        const userRef = collection(db, "users");

        setDoc(doc(userRef, user.uid), {
          ...props,
        })
          .then(() => {
            // Profile updated!
            // ...
            setSuccess("Registration was successful");
            setTimeout(() => {
              setSuccess("");
              //redirect
              router.push("/dashboard");
            }, 3000);
          })
          .catch((error) => {
            // An error occurred
            // ...

            let errorMessage = "";
            if (typeof error === "string") {
              errorMessage = error?.replace(/firebase/gi, "")?.replace(":", "");
            }
            setError(errorMessage || "Failed to update profile");

            setTimeout(() => {
              setError("");
            }, 5000);
          })
          .finally(() => {
            setLoading(false);
          });
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

  return { user, success, error, handleRegister, isLoading };
};

import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

const useStudentValidator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentIsRegistered, setStudentIsRegistered] = useState(false);

  const validateStudent = async (descriptor, code) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "students"),

        where("courses", "array-contains", code)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setStudentIsRegistered(true);
      });

      if (querySnapshot.docs?.length === 0) {
        setError("Student is not registered for this course");
      }
    } catch (err) {
      setError("Failed to validate student code");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return {
    loading,
    error,
    studentIsRegistered,
    validateStudent,
    setStudentIsRegistered,
  };
};

export default useStudentValidator;

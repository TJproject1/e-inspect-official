import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

const useCourseChecker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);

  const validCourseCode = async (code) => {
    setLoading(true);
    try {
      const docRef = doc(db, "courses", code.trim());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourse(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        setError("Invalid course code!");
      }
    } catch (err) {
      setError("Failed to validate course code");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return { loading, error, course, validCourseCode };
};

export default useCourseChecker;

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function useFetchCourses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  const [revalidate, setRevalidate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });

        setCourses(data);
      } catch (err) {
        setError("failed to load courses");
      } finally {
        setLoading(false);
        setRevalidate(false);
      }
    }
    if (revalidate || courses?.length === 0) {
      fetchData();
    }
  }, [revalidate]);

  return {
    loading,
    error,
    courses,
    setRevalidate,
  };
}

export default useFetchCourses;

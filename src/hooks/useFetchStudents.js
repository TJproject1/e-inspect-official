import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function useFetchStudents() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  const [revalidate, setRevalidate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });

        setStudents(data);
      } catch (err) {
        setError("failed to load students");
      } finally {
        setLoading(false);
        setRevalidate(false);
      }
    }
    if (revalidate || students?.length === 0) {
      fetchData();
    }
  }, [revalidate]);

  return {
    loading,
    error,
    students,
    setRevalidate,
  };
}

export default useFetchStudents;

import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { ImSpinner } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { db } from "../../firebase";
import ToastNotification from "./ToastNotification";

function CoursesTable({ courses, loading, handleEdit, revalidate }) {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [courseId, setCourseId] = useState(null);

  const handleDelete = async (id) => {
    setCourseId(id);
    setLoading(true);
    try {
      await deleteDoc(doc(db, "courses", id));
      revalidate();
      setLoading(false);
      setCourseId(null);
      setSuccess("Successfully deleted course");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setCourseId(null);
      if (error) {
        setError("Failed to delete course");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <div className="w-full overflow-auto">
      <ToastNotification
        message={success || error}
        type={success ? "success" : "error"}
        style={{
          margin: "0",
        }}
      />
      {loading && <span className="block my-3 text-sm">Loading...</span>}
      <table className="w-full mt-4 overflow-scroll text-center">
        <thead>
          <tr className="text-sm opacity-50">
            <th>S/N</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>No Of Students Registered</th>
          </tr>
        </thead>
        <tbody className="relative text-xs">
          {courses?.length > 0 &&
            courses?.map((course, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.noOfStudentsRegistered}</td>
                <td>
                  <span className="flex items-center justify-center mt-4">
                    <HiOutlinePencil
                      size={18}
                      color={"#000000"}
                      onClick={() => handleEdit(course)}
                      className="mr-8 opacity-50"
                      role="button"
                    />

                    {isLoading && courseId === course?.id ? (
                      <ImSpinner size={18} className="animate-spin" />
                    ) : (
                      <MdDeleteOutline
                        size={18}
                        color={"#000000"}
                        className="opacity-50"
                        role="button"
                        onClick={() => handleDelete(course?.id)}
                      />
                    )}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesTable;

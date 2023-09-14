import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { ImSpinner } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { db } from "../../firebase";
import ToastNotification from "./ToastNotification";

function StudentsTable({ students, revalidate, loading, handleEdit }) {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [studentId, setStudentId] = useState(null);

  const handleDelete = async (id) => {
    setStudentId(id);
    setLoading(true);
    try {
      await deleteDoc(doc(db, "students", id));
      revalidate();
      setLoading(false);
      setStudentId(null);
      setSuccess("Successfully deleted student");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setStudentId(null);
      if (error) {
        setError("Failed to delete student");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };
  if (students?.length === 0) {
    return <></>;
  }

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
            <th>Mat No</th>
            <th>Name</th>
            <th>No Of Students Registered</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student?.mat_no}</td>
              <td>{student?.name}</td>
              <td>{student?.courses?.length ?? 0}</td>
              <td>
                <span className="flex items-center justify-center mt-4">
                  <HiOutlinePencil
                    size={18}
                    color={"#000000"}
                    onClick={() => handleEdit(student)}
                    className="mr-8 opacity-50"
                    role="button"
                  />

                  {isLoading && studentId === student?.id ? (
                    <ImSpinner size={18} className="animate-spin" />
                  ) : (
                    <MdDeleteOutline
                      size={18}
                      color={"#000000"}
                      className="opacity-50"
                      role="button"
                      onClick={() => handleDelete(student?.id)}
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

export default StudentsTable;

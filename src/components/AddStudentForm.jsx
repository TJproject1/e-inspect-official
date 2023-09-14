import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { PrimaryButton } from "./Buttons";
import { TextInput } from "./Inputs";
import ToastNotification from "./ToastNotification";

function AddStudentForm({ edit, studentToEdit, editDone, revalidate }) {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [student, setStudentData] = useState({
    name: "",
    mat_no: "",
    courses: [],
  });

  useEffect(() => {
    if (edit) {
      setStudentData(studentToEdit);
    }
  }, [edit, studentToEdit]);

  const editStudentHandler = async () => {
    const studentRef = doc(db, "students", studentToEdit?.id);

    try {
      await updateDoc(studentRef, {
        name: student?.name,
        mat_no: student?.mat_no,
        courses: student?.courses,
      });
      revalidate();
      setLoading(false);
      setSuccess("Successfully updated student");
      setStudentData({
        mat_no: "",
        name: "",
        courses: [],
      });
      editDone();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setLoading(false);
      if (error) {
        setError("Failed to update student");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!student) {
      return;
    }

    if (edit) {
      editStudentHandler();
      return;
    }

    const studentsRef = collection(db, "students");

    try {
      await setDoc(doc(studentsRef), {
        ...student,
      });
      revalidate();
      setLoading(false);
      setSuccess("Successfully uploaded student");
      setStudentData({
        mat_no: "",
        name: "",
        courses: [],
      });

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error) {
        setError("Failed to upload student");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full mb-24">
      <div
        className={`cursor-pointer border rounded h-[40vh] bg-gray-200 w-full mt-10 mb-10 text-center p-8`}
      >
        <span className="text-sm opacity-40">
          Click to Scan or Upload picture of a Face
        </span>
        <Image
          src={"/images/face-scan.png"}
          className="mx-auto"
          width={200}
          height={200}
          alt="scan"
        />
      </div>
      <form onSubmit={handleAddStudent} className="mx-auto lg:max-w-2xl">
        <h2 className="mb-4 text-base font-semibold text-center lg:text-lg">
          {edit ? `Update ${studentToEdit?.name}'s profile` : "Add Student"}
        </h2>
        <ToastNotification
          message={success || error}
          type={success ? "success" : "error"}
        />
        <TextInput
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          name="name"
          value={student.name}
          type="text"
          className="w-full p-5 my-4 border rounded"
          placeholder="Enter Student's Name"
        />
        <TextInput
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              mat_no: e.target.value,
            }))
          }
          name="mat_no"
          value={student.mat_no}
          type="text"
          className="w-full p-5 my-4 border rounded"
          placeholder="Enter Matriculation Number"
          minLength={10}
          maxLength={10}
        />
        <textarea
          onChange={(e) => {
            let value = e.target.value;
            let courses = value.split(",");
            setStudentData((prev) => ({
              ...prev,
              courses: [...courses],
            }));
          }}
          name="mat_no"
          value={student?.courses?.join(",")}
          className="w-full p-5 my-4 border rounded"
          placeholder="Students offered(separate with comma) e.g MTH317,CSC111,..."
          rows={5}
        />
        <PrimaryButton
          type="submit"
          className="w-full rounded mt-6 bg-[#115baa] text-white text-sm py-3 px-5"
          loading={isLoading}
          disabled={isLoading}
          text="Register Student"
        />
      </form>
    </div>
  );
}

export default AddStudentForm;

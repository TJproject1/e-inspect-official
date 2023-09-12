import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { PrimaryButton } from "./Buttons";
import { TextInput } from "./Inputs";
import ToastNotification from "./ToastNotification";

const AddCourseForm = ({ edit, courseToEdit, editDone, revalidate }) => {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    noOfStudentsRegistered: 0,
  });

  useEffect(() => {
    if (edit) {
      setCourse(courseToEdit);
    }
  }, [edit, courseToEdit]);

  const editCourseHandler = async () => {
    const courseRef = doc(db, "courses", courseToEdit?.id);

    try {
      await updateDoc(courseRef, {
        courseName: course?.courseName,
        courseCode: course?.courseCode,
      });
      revalidate();
      setLoading(false);
      setSuccess("Successfully updated course");
      setCourse({
        courseCode: "",
        courseName: "",
        noOfStudentsRegistered: 0,
      });
      editDone();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setLoading(false);
      if (error) {
        setError("Failed to update course");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!course) {
      return;
    }

    if (edit) {
      editCourseHandler();
      return;
    }

    const coursesRef = collection(db, "courses");

    try {
      await setDoc(doc(coursesRef), {
        ...course,
      });
      revalidate();
      setLoading(false);
      setSuccess("Successfully uploaded course");
      setCourse({
        courseCode: "",
        courseName: "",
        noOfStudentsRegistered: 0,
      });

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error) {
        setError("Failed to upload course");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  return (
    <form onSubmit={handleAddCourse} className="mt-10 lg:max-w-2xl">
      <h2 className="mb-4 text-base font-semibold">
        {edit ? `Update ${courseToEdit?.courseCode} Course` : "Add New Course"}
      </h2>
      <ToastNotification
        message={success || error}
        type={success ? "success" : "error"}
        style={{
          margin: "0",
        }}
      />
      <TextInput
        onChange={(e) =>
          setCourse({
            ...course,
            courseCode: e.target.value,
          })
        }
        name="courseCode"
        value={course.courseCode}
        className="w-full p-4 my-4 border rounded"
        type="text"
        placeholder="ENTER COURSE CODE e.g MTH317"
      />
      <TextInput
        onChange={(e) =>
          setCourse({
            ...course,
            courseName: e.target.value,
          })
        }
        name="courseName"
        value={course.courseName}
        className="w-full p-4 border rounded"
        type="text"
        placeholder="ENTER COURSE NAME e.g LINEAR ALGEBRA"
      />

      <PrimaryButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className="w-[35%] text-sm mt-5 rounded text-white text-center py-4 bg-[#115baa]"
        text={edit ? "Update Course" : "Add Course"}
      />
    </form>
  );
};

export default AddCourseForm;

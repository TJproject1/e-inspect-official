"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsBook } from "react-icons/bs";
import { HiMiniUserPlus } from "react-icons/hi2";
import { PiStudent } from "react-icons/pi";

import AddCourseForm from "@/components/AddCourseForm";
import AddStudentForm from "@/components/AddStudentForm";
import CoursesTable from "@/components/CoursesTable";
import StudentsTable from "@/components/StudentsTable";
import useFetchCourses from "@/hooks/fetchCourses";
import { useLogout } from "@/hooks/useLogout";

function CourseAdviserDashboard() {
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [showAllStudentsRegistered, setShowAllStudentsRegistered] =
    useState(false);
  const [showAddStudentDetails, setShowAddStudentDetails] = useState(false);
  const { handleLogout } = useLogout();

  const { courses, loading, error, setRevalidate } = useFetchCourses();

  const [edit, setEdit] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    courseName: "",
    courseCode: "",
    id: "",
  });

  const handleEdit = (course) => {
    setEdit(true);
    setEditedCourse(course);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const editDone = () => {
    setEdit(false);
    setEditedCourse({
      courseName: "",
      courseCode: "",
      id: "",
    });
  };

  return (
    <main className="bg-[#FEFEFE  w-screen">
      <div className="header border-b  p-5 lg:px-16 border-[#EAEAEA] flex w-full items-center justify-between">
        <div className=" bg-[#FEFEFE]  text-[#3a3a3a] border-[#EAEAEA]">
          <Image width={50} height={50} src={"/images/pi2.png"} alt="logo" />
        </div>

        <button
          onClick={handleLogout}
          className="text-white text-sm text-center py-2 px-5 font-medium bg-[#115baa]"
        >
          Logout
        </button>
      </div>

      <section id="course-adviser-dashboard" className="px-5 lg:px-16">
        <div className="mt-10 mb-5 text-base font-bold ">
          Course Adviser Dashboard
        </div>
        <div className="px-4 py-2 mb-5 text-sm font-semibold bg-white rounded shadow session">
          Current Session : 2021/2022
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 text-[0.79rem] mt-10">
          <div
            onClick={() => {
              setShowAllCourses(true);
              setShowAllStudentsRegistered(false);
              setShowAddStudentDetails(false);
            }}
            className="cursor-pointer bg-[#115baa] text-white h-[20vh] flex justify-between px-5 rounded items-center"
          >
            <div className="text-left justify-self-start">
              <div className="font-extrabold">All Courses</div>
              <div className="mt-2 font-medium">{courses?.length}</div>
            </div>
            <div className="icon">
              <PiStudent color="#fff" size={64} />
            </div>
          </div>
          <div
            onClick={() => {
              setShowAllCourses(false);
              setShowAllStudentsRegistered(true);
              setShowAddStudentDetails(false);
            }}
            className="cursor-pointer bg-[#115baa] text-white h-[20vh] flex justify-between px-5 rounded items-center"
          >
            <div className="text-left justify-self-start">
              <div className="font-extrabold">All Students Registered</div>
              <div className="mt-2 font-medium">12,744</div>
            </div>
            <div className="icon">
              <BsBook color="#fff" size={64} />
            </div>
          </div>
          <div
            onClick={() => {
              setShowAllCourses(false);
              setShowAllStudentsRegistered(false);
              setShowAddStudentDetails(true);
            }}
            className="cursor-pointer bg-[#115baa] text-white h-[20vh] flex justify-between px-5 rounded items-center"
          >
            <div className="text-left justify-self-start">
              <div className="font-extrabold">Add Student Details</div>
            </div>
            <div className="icon">
              <HiMiniUserPlus color="#fff" fill="white" size={64} />
            </div>
          </div>
        </div>

        {showAllCourses && (
          <>
            <AddCourseForm
              edit={edit}
              courseToEdit={editedCourse}
              editDone={editDone}
              revalidate={() => setRevalidate(true)}
            />
            <div
              className={`table  overflow-hidden mt-10 w-full border rounded py-6 px-5 mb-20 `}
            >
              <span className="flex items-center justify-between ">
                <h2 className="text-lg">All Courses</h2>
              </span>
              <CoursesTable
                courses={courses}
                loading={loading}
                error={error}
                handleEdit={handleEdit}
                revalidate={() => setRevalidate(true)}
              />
            </div>
          </>
        )}

        <div
          className={`table  overflow-hidden mt-10 w-full border rounded py-6 px-5 mb-20 ${
            showAllStudentsRegistered ? "" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between ">
            <div className="text-lg">All Registered Students</div>
            {/* <div className="text-[0.65rem] opacity-80">Show All</div> */}
          </div>

          <StudentsTable />
        </div>
        {showAddStudentDetails ? <AddStudentForm /> : null}
      </section>
    </main>
  );
}

export default CourseAdviserDashboard;

"use client";

import { PrimaryButton } from "@/components/Buttons";
import FaceRecognition from "@/components/FacialRecognition";
import ToastNotification from "@/components/ToastNotification";
import useCourseChecker from "@/hooks/useCourseChecker";
import { useLogout } from "@/hooks/useLogout";
import useStudentValidator from "@/hooks/useStudentValidator";
import Image from "next/image";
import React, { useState } from "react";

function ExamInvigilator() {
  const [courseCode, setCourseCode] = useState("");
  const [mat_no, setMatNo] = useState("");
  const { handleLogout } = useLogout();
  const { loading, error, validCourseCode, course } = useCourseChecker();

  const [detections, setDetections] = useState([]);

  const {
    studentIsRegistered,
    validateStudent,
    loading: validating,
    setStudentIsRegistered,
    error: invalid,
  } = useStudentValidator();

  return (
    <main className="bg-[#FEFEFE   w-screen">
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
        <div className="mt-10 mb-5 text-base font-bold ">Exam Invigilator</div>
        <div className="px-4 py-2 mb-5 text-sm font-semibold bg-white rounded shadow session">
          Current Session : 2021/2022
        </div>

        <div className="">
          <div className="mt-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validCourseCode(courseCode);
              }}
            >
              <label
                htmlFor="code"
                className="text-[0.79rem] mb-2 font-bold block"
              >
                Current Course Exam Being Invigilated
              </label>
              <ToastNotification
                message={error}
                type={"error"}
                style={{
                  margin: "0",
                }}
              />
              {/* to be used when submit button is clicked */}
              <div className="flex items-center justify-between w-full h-full mt-2">
                <input
                  onChange={(e) => setCourseCode(e.target.value)}
                  type="text"
                  name="code"
                  id="code"
                  value={courseCode}
                  placeholder="Course Code: e.g MTH317"
                  className={`border w-[70%] py-3 text-sm px-4 rounded mt-2`}
                  required
                />
                <PrimaryButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="py-3 mt-2 px-5 bg-[#115baa] text-white w-[25%] text-[0.75rem] rounded"
                  text="Validate"
                />
              </div>
            </form>
            <div
              className={`font-bold text-lg text-center mt-4 text-[#115baa] ${
                course !== null ? "" : "hidden"
              }`}
            >
              <h3 className="mb-2">Course: {course?.courseName}</h3>
              <h3>Course Code: {course?.courseCode}</h3>
            </div>
          </div>
        </div>

        {studentIsRegistered && (
          <div className="mx-auto mt-8 authorized w-fit">
            <div className="positive flex text-[#115baa] font-semibold">
              Student is eligible for the Exam{" "}
              <span className="ml-4">
                <Image
                  src={"/images/check.png"}
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                  alt="check"
                />
              </span>
            </div>
            {/* <div className="negative flex text-[#aa2d11] font-semibold">Student is not eligible for the Exam <span className='ml-2 '><Image src={"/images/delete.png"} width={24} height={24} className="w-[24px] h-[24px]"/></span></div> */}
          </div>
        )}

        {invalid && (
          <div className="mx-auto mt-8 authorized w-fit">
            <div className="flex font-semibold text-red-500 positive">
              Student not eligible for the Exam
            </div>
            {/* <div className="negative flex text-[#aa2d11] font-semibold">Student is not eligible for the Exam <span className='ml-2 '><Image src={"/images/delete.png"} width={24} height={24} className="w-[24px] h-[24px]"/></span></div> */}
          </div>
        )}

        {/* remove this to remove mat no */}
        {course && (
          <div className="w-full px-3 mx-auto lg:max-w-xl">
            <input
              onChange={(e) => setMatNo(e.target.value)}
              type="text"
              name="mat_no"
              id="mat_no"
              value={mat_no}
              placeholder="Mat No: e.g PSC2001113"
              className={`border py-3 w-full text-sm px-4 rounded mx-auto mt-6`}
              required
            />
          </div>
        )}

        {course && mat_no && (
          <div className="mt-10 mb-20">
            <div
              className="mx-auto mb-20 w-fit"
              style={{
                display: detections?.length === 0 ? "none" : "block",
              }}
            >
              <h2 className="text-lg font-semibold text-center">
                Face Detected
              </h2>
              <span className="flex flex-wrap items-center mt-4 space-x-6">
                <PrimaryButton
                  text="Validate"
                  loading={validating}
                  disabled={validating}
                  onClick={() =>
                    validateStudent(detections[0], courseCode, mat_no)
                  }
                  className="px-6 py-3 mx-auto text-lg font-semibold text-center text-white bg-green-500 rounded w-fit"
                />
                <PrimaryButton
                  text="Re-scan"
                  onClick={() => {
                    setDetections([]);
                    setStudentIsRegistered(false);
                  }}
                  disabled={validating}
                  className="w-fit mx-auto font-semibold bg-[#115baa] text-white py-3 px-6 text-lg text-center rounded"
                />
              </span>
            </div>
            <div
              style={{
                display: detections?.length > 0 ? "none" : "block",
              }}
            >
              <FaceRecognition setDetections={setDetections} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default ExamInvigilator;

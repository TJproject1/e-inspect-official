"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

function ExamInvigilator() {
  const [course, setCourse] = useState("");
  const [showCourse, setShowCourse] = useState(false);
  return (
    <main className="bg-[#FEFEFE   w-screen">
      <div className="header border-b  p-5 lg:px-16 border-[#EAEAEA] flex w-full items-center justify-between">
        <div className=" bg-[#FEFEFE]  text-[#3a3a3a] border-[#EAEAEA]">
          <Image width={50} height={50} src={"/images/pi2.png"} alt="logo" />
        </div>
        <button className="flex items-center space-x-3 text-[#115baa]">
          <FaUserCircle size={32} className="" />
          <CgMenuRight size={32} />
        </button>
      </div>

      <section id="course-adviser-dashboard" className="px-5 lg:px-16">
        <div className="mt-10 mb-5 text-base font-bold ">Exam Invigilator</div>
        <div className="px-4 py-2 mb-5 text-sm font-semibold bg-white rounded shadow session">
          Current Session : 2021/2022
        </div>

        <div className="">
          <div className="mt-12 inputgrp">
            <label htmlFor="" className="text-[0.79rem] font-bold ">
              Current Course Exam Being Invigilated
            </label>
            {/* to be used when submit button is clicked */}
            <div
              className={`font-bold text-lg text-center mt-4 text-[#115baa] ${
                showCourse ? "" : "hidden"
              }`}
            >
              {course}
            </div>
            <div className="flex items-center justify-between w-full h-full">
              <input
                onChange={(e) => setCourse(e.target.value)}
                type="text"
                placeholder="Course Code: e.g MTH317"
                className={`border w-[70%] py-3 text-sm px-4 rounded mt-2 `}
              />
              <button
                onClick={() => {
                  if (course !== "") {
                    setShowCourse(true);
                    setCourse(course);
                  }
                }}
                className="py-3 mt-2 px-5 bg-[#115baa] text-white w-[25%] text-[0.75rem] rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* <div className="table w-full px-5 py-6 mt-10 mb-20 overflow-hidden border rounded">

            <div className="flex items-center justify-between ">
              <div className="text-lg">All Courses</div>
              <div className="text-[0.65rem] opacity-80">Show All</div>
            </div>
            
            <div className="w-full overflow-auto">
              <table className='text-[0.65rem] overflow-scroll  mt-4 w-[220%] text-center'>
                <thead>
                <tr className='opacity-50 '>
                  <th>S/N</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>No Of Students Registered</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
           

          </div> */}

        {/* <div className="table w-full px-5 py-6 mt-10 mb-20 overflow-hidden border rounded">

          <div className="flex items-center justify-between ">
            <div className="text-lg">All Registered Students</div>
            <div className="text-[0.65rem] opacity-80">Show All</div>
          </div>

          <div className="w-full overflow-auto">
            <table className='text-[0.65rem] overflow-scroll  mt-4 w-[220%] text-center'>
              <thead>
              <tr className='opacity-50 '>
                <th>S/N</th>
                <th>Mat No</th>
                <th>Name</th>
                <th>No Of Courses Registered</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>PSC18809922</td>
                  <td>Thomas Johnson</td>
                  <td>9</td>
                  <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PSC1909234</td>
                  <td>David Uwasota</td>
                  <td>10</td>
                  <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>PSC1809292</td>
                  <td>Jane Williams</td>
                  <td>10</td>
                  <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>PSC1808945</td>
                  <td>Tobi Michaels</td>
                  <td>11</td>
                  <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>PSC1802238</td>
                  <td>Jennifer Aworika</td>
                  <td>8</td>
                  <td><button className='px-4 py-2 m-2 text-center border rounded'>View More</button></td>
                </tr>
              </tbody>
            </table>
          </div>


          </div> */}

        <div className="mt-8 authorized">
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

        <div className="border rounded h-[40vh] bg-gray-200 w-full mt-10 mb-24 text-center p-8">
          <span className="text-sm opacity-40">Click to Scan before entry</span>
          <Image
            src={"/images/face-scan.png"}
            width={200}
            height={200}
            alt="face"
            className="mx-auto"
          />
        </div>
      </section>
    </main>
  );
}

export default ExamInvigilator;

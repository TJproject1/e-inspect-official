"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {CgMenuRight, CgProfile} from 'react-icons/cg'
import {PiStudent} from 'react-icons/pi'
import {HiOutlinePencil} from 'react-icons/hi'
import {MdDeleteOutline} from 'react-icons/md'
import {BsBook} from 'react-icons/bs'
import {HiMiniUserPlus} from 'react-icons/hi2'

import { useAuth} from "../../../context/AuthContext";
import {useRouter} from "next/navigation"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../../firebase'
import useFetchCourses from '../../../hooks/fetchCourses'

function CourseAdviserDashboard() {
  const [showAllCourses, setShowAllCourses] = useState(true)
  const [showAllStudentsRegistered, setShowAllStudentsRegistered] = useState(false)
  const [showAddStudentDetails, setShowAddStudentDetails] = useState(false)

  const { courses, loading, error } = useFetchCourses()
  console.log(courses)

  const [edit, setEdit] = useState(null)
  const [editedCourse, setEditedCourse] = useState({
    courseName:null,
    courseCode:null,
  })
  const [courseIndex, setCourseIndex] = useState(null)

  // const [courseList, setCourseList] = useState([])
  // const [addCourses, setAddC///ourses] = useState(false)
  const [noOfStudentsRegistered, setNoOfStudentsRegistered] = useState(0)
  const [course, setCourse] = useState({
    courseName: null,
    courseCode: null,
    noOfStudentsRegistered: noOfStudentsRegistered,
  })
  

  console.log(courses)

  
  
  
  const router = useRouter()
  const { logout, currentUser, userInfo } = useAuth()

  async function handleAddCourse() {
    if (!course) {return}
    courses.push(course)
    // setCourses(courseList)
    setCourse({
      ...course,
      courseName:'',
      courseCode:'',
      noOfStudentsRegistered: noOfStudentsRegistered,})

      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
        'courses': courses
      }, {merge:true})
  }

  function handleAddEdit(courseKey) {
    return () => {
      setEdit(courseKey)
      setEditedCourse({
        ...course,
      })
    }
  }

  return (
    <div className="">
      { 
      (userInfo && !loading) && (
        <>
          
          <main  className='bg-[#FEFEFE    w-screen'>
        <div className="header border-b  p-5 border-[#EAEAEA] flex w-full items-center justify-between">
            <div className=" bg-[#FEFEFE]  text-[#3a3a3a] w-full border-[#EAEAEA]">
                <Image className='w-[20%]' width={200} height={100} src={"/images/pi2.png"}/>
            </div>
            {/* <div className=" mr-3 rounded-full overflow-hidden">
              <Image src={"/images/avatar.jpg"} width={64} height={64} className='w-full h-full'/>
            </div> */}
            <div onClick={()=> {
              logout()
              router.push('/')
            }} className="">Logout</div>
        </div>

        <section id="course-adviser-dashboard" className='px-5'>
          <div className="mt-10 mb-5 text-base font-bold ">Course Adviser Dashboard</div>
          <div className="session font-semibold shadow rounded py-2 px-4 text-sm bg-white mb-5">Current Session : 2021/2022</div>

          <div className="scroll-container overflow-auto">
            <div className="course-adviser-actions flex w-[200vw] overflow-x-scroll text-[0.79rem] mt-10">
                <div onClick={()=> {
                  setShowAllCourses(true)
                  setShowAllStudentsRegistered(false)
                  setShowAddStudentDetails(false)
                  }} className="card1 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>All Courses</div>
                    <div className="font-medium mt-2">10</div>
                  </div>
                  <div className="icon"><PiStudent color='#fff' size={64}/></div>
                </div>
                <div onClick={()=> {
                  setShowAllCourses(false)
                  setShowAllStudentsRegistered(true)
                  setShowAddStudentDetails(false)
                  }} className="card2 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>All Students Registered</div>
                    <div className="font-medium mt-2">12,744</div>
                  </div>
                  <div className="icon"><BsBook color='#fff' size={64}/></div>
                </div>
                <div onClick={()=> {
                  setShowAllCourses(false)
                  setShowAllStudentsRegistered(false)
                  setShowAddStudentDetails(true)
                  }} className="card3 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>Add Student Details</div>
                    <div className="font-medium mt-2">12,744</div>
                  </div>
                  <div className="icon"><HiMiniUserPlus color='#fff' fill='white' size={64}/></div>
                </div>
            </div>
          </div>

          {
            showAllCourses && (
                  <>
                    <div className=" mt-10">
                      <input onChange={(e)=> setCourse({
                        ...course,
                        courseCode: e.target.value,
                      })} name='courseCode' value={course.courseCode} className='p-4 border rounded w-full' type="text" placeholder='ENTER COURSE CODE e.g MTH317' />
                      <input onChange={(e)=> setCourse({
                        ...course,
                        courseName: e.target.value
                      })} name='courseName' value={course.courseName} className='p-4 border rounded w-full' type="text" placeholder='ENTER COURSE NAME e.g LINEAR ALGEBRA' />
                      
                      <div onClick={handleAddCourse} className="w-[35%] text-sm mt-5 rounded text-white text-center py-4 bg-[#115baa]">Add Course</div>
                      
                    </div>
                    
                    {
                      !(edit === courseKey) ? null : (
                        <div className=" mt-10">
                          <input onChange={(e)=> setEditedCourse({
                            ...course,
                            courseCode: e.target.value,
                          })} name='courseCode' value={editedCourse.courseCode} className='p-4 border rounded w-full' type="text" placeholder='ENTER COURSE CODE e.g MTH317' />
                          <input onChange={(e)=> setEditedCourse({
                            ...course,
                            courseName: e.target.value
                          })} name='courseName' value={editedCourse.courseName} className='p-4 border rounded w-full' type="text" placeholder='ENTER COURSE NAME e.g LINEAR ALGEBRA' />
                          
                          <div onClick={handleAddEdit(courseKey)} className="w-[35%] text-sm mt-5 rounded text-white text-center py-4 bg-[#115baa]">Add Course</div>
                        </div>
                      )
                    }

                    <div  className={`table  overflow-hidden mt-10 w-full border rounded py-6 px-5 mb-20 `}>
    
                      <div className="flex justify-between items-center ">
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
                          <tbody className='relative'>
                            {(userInfo && loading) && (<div>
                              Loading...
                            </div>)}
                                {courses.map((course,i) => {
                                  setCourseIndex(i)
                                  return (
                                    
                                    <tr className="" key={i}>
                                      
                                      <td>{i+1}</td>
                                      <td>{course.courseCode}</td>
                                      <td>{course.courseName}</td>
                                      <td>{course.noOfStudentsRegistered}</td>
                                      <div className='flex justify-center items-center mt-4'>
                                      <div onClick={() => setEdit(true)} className="mr-8 opacity-50">
                                        <HiOutlinePencil size={18} color={"#000000"}/>
                                      </div>
                                      <div className="opacity-50">
                                        <MdDeleteOutline size={18} color={"#000000"}/>
                                      </div>
                                    </div>
                                    </tr>
                                  )
                                })}
                            <tr>
                              <td>2</td>
                              <td>MTH317</td>
                              <td>Linear Algebra</td>
                              <td>200</td>
                              <td>
                        <div className='flex justify-center items-center mt-4'>
                          <div className="mr-8 opacity-50">
                            <HiOutlinePencil size={18} color={"#000000"}/>
                          </div>
                          <div className="opacity-50">
                            <MdDeleteOutline size={18} color={"#000000"}/>
                          </div>
                        </div>
                      </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>MTH317</td>
                              <td>Linear Algebra</td>
                              <td>200</td>
                              <td>
                        <div className='flex justify-center items-center mt-4'>
                          <div className="mr-8 opacity-50">
                            <HiOutlinePencil size={18} color={"#000000"}/>
                          </div>
                          <div className="opacity-50">
                            <MdDeleteOutline size={18} color={"#000000"}/>
                          </div>
                        </div>
                      </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>MTH317</td>
                              <td>Linear Algebra</td>
                              <td>200</td>
                              <td>
                        <div className='flex justify-center items-center mt-4'>
                          <div className="mr-8 opacity-50">
                            <HiOutlinePencil size={18} color={"#000000"}/>
                          </div>
                          <div className="opacity-50">
                            <MdDeleteOutline size={18} color={"#000000"}/>
                          </div>
                        </div>
                      </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>MTH317</td>
                              <td>Linear Algebra</td>
                              <td>200</td>
                              <td>
                        <div className='flex justify-center items-center mt-4'>
                          <div className="mr-8 opacity-50">
                            <HiOutlinePencil size={18} color={"#000000"}/>
                          </div>
                          <div className="opacity-50">
                            <MdDeleteOutline size={18} color={"#000000"}/>
                          </div>
                        </div>
                      </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>MTH317</td>
                              <td>Linear Algebra</td>
                              <td>200</td>
                              <td>
                        <div className='flex justify-center items-center mt-4'>
                          <div className="mr-8 opacity-50">
                            <HiOutlinePencil size={18} color={"#000000"}/>
                          </div>
                          <div className="opacity-50">
                            <MdDeleteOutline size={18} color={"#000000"}/>
                          </div>
                        </div>
                      </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    
    
                    </div>
                  </>
                )
          }

            
          

          <div className={`table  overflow-hidden mt-10 w-full border rounded py-6 px-5 mb-20 ${showAllStudentsRegistered ? '' : 'hidden'}`}>
          
          <div className="flex justify-between items-center ">
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
                  <td>
                    <div className='flex justify-center items-center mt-4'>
                      <div className="mr-8 opacity-50">
                        <HiOutlinePencil size={18} color={"#000000"}/>
                      </div>
                      <div className="opacity-50">
                        <MdDeleteOutline size={18} color={"#000000"}/>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PSC1909234</td>
                  <td>David Uwasota</td>
                  <td>10</td>
                  <td>
                    <div className='flex justify-center items-center mt-4'>
                      <div className="mr-8 opacity-50">
                        <HiOutlinePencil size={18} color={"#000000"}/>
                      </div>
                      <div className="opacity-50">
                        <MdDeleteOutline size={18} color={"#000000"}/>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>PSC1809292</td>
                  <td>Jane Williams</td>
                  <td>10</td>
                  <td>
                    <div className='flex justify-center items-center mt-4'>
                      <div className="mr-8 opacity-50">
                        <HiOutlinePencil size={18} color={"#000000"}/>
                      </div>
                      <div className="opacity-50">
                        <MdDeleteOutline size={18} color={"#000000"}/>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>PSC1808945</td>
                  <td>Tobi Michaels</td>
                  <td>11</td>
                  <td>
                    <div className='flex justify-center items-center mt-4'>
                      <div className="mr-8 opacity-50">
                        <HiOutlinePencil size={18} color={"#000000"}/>
                      </div>
                      <div className="opacity-50">
                        <MdDeleteOutline size={18} color={"#000000"}/>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>PSC1802238</td>
                  <td>Jennifer Aworika</td>
                  <td>8</td>
                  <td>
                    <div className='flex justify-center items-center mt-4'>
                      <div className="mr-8 opacity-50">
                        <HiOutlinePencil size={18} color={"#000000"}/>
                      </div>
                      <div className="opacity-50">
                        <MdDeleteOutline size={18} color={"#000000"}/>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          </div>
          {
            showAddStudentDetails ? (
              <div className="w-full mb-24">
                <div className={`  border rounded h-[40vh] bg-gray-200 w-full mt-10 mb-10 text-center p-8`}>
                  <span className="text-sm opacity-40">Click to Scan or Upload picture of a Face</span>
                  <Image src={'/images/face-scan.png'} className="w-full h-full" width={100} height={100}/>
                </div>
                <div className="inpt-grp">
                  <input type="text" className="my-4 p-5 border rounded w-full" placeholder="Enter Student's Name" />
                  <input type="text" className="my-4 p-5 border rounded w-full" placeholder="Enter Matriculation Number" />
                  <textarea className="my-4 p-5 border rounded w-full" placeholder="Courses offered(separate with comma) e.g MTH317,CSC111,..."  rows={5}></textarea>
                  <button className='w-full rounded mt-6 bg-[#115baa] text-white text-sm py-3 px-5'>Register Student</button>
                <div className="success text-green-950 bg-green-200 w-full mt-5 p-4">Uploaded successfuly</div>
                </div>
              </div>
            ): null
          }

        </section>

        

    </main>
        </>
      )
    }
    </div>
    
  )
}

export default CourseAdviserDashboard
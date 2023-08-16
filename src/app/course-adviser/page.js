import React from 'react'
import Image from 'next/image'
import {CgMenuRight, CgProfile} from 'react-icons/cg'
import {PiStudent} from 'react-icons/pi'
import {BsBook} from 'react-icons/bs'
import {HiMiniUserPlus} from 'react-icons/hi2'

function CourseAdviserDashboard() {
  return (
    <main  className='bg-[#FEFEFE    w-screen'>
        <div className="header border-b  p-5 border-[#EAEAEA] flex w-full items-center justify-between">
            <div className=" bg-[#FEFEFE]  text-[#3a3a3a] w-full border-[#EAEAEA]">
                <Image className='w-[20%]' width={200} height={100} src={"/images/pi2.png"}/>
            </div>
            <div className=" mr-3">
              <CgProfile color='#000' size={36} cl/>
            </div>
            <div className=""><CgMenuRight color='#000' size={36}/></div>
        </div>

        <section id="course-adviser-dashboard" className='px-5'>
          <div className="mt-10 mb-5 text-base font-bold ">Course Adviser Dashboard</div>
          <div className="session font-semibold shadow rounded py-2 px-4 text-sm bg-white mb-5">Current Session : 2021/2022</div>

          <div className="scroll-container overflow-auto">
            <div className="course-adviser-actions flex w-[200vw] overflow-x-scroll text-[0.79rem] mt-10">
                <div className="card1 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>All Courses</div>
                    <div className="font-medium mt-2">10</div>
                  </div>
                  <div className="icon"><PiStudent color='#fff' size={64}/></div>
                </div>
                <div className="card2 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>All Students Registered</div>
                    <div className="font-medium mt-2">12,744</div>
                  </div>
                  <div className="icon"><BsBook color='#fff' size={64}/></div>
                </div>
                <div className="card3 bg-[#115baa] text-white h-[20vh] w-[55%] flex justify-between px-5 rounded items-center border mr-8">
                  <div className="justify-self-start text-left">
                    <div className='font-extrabold'>Add Student Details</div>
                    <div className="font-medium mt-2">12,744</div>
                  </div>
                  <div className="icon"><HiMiniUserPlus color='#fff' fill='white' size={64}/></div>
                </div>
            </div>
          </div>

          <div className="table  overflow-hidden mt-10 w-full border rounded py-6 px-5 mb-20">

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
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='border py-2 px-4 rounded m-2 text-center'>View More</button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='border py-2 px-4 rounded m-2 text-center'>View More</button></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='border py-2 px-4 rounded m-2 text-center'>View More</button></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='border py-2 px-4 rounded m-2 text-center'>View More</button></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>MTH317</td>
                    <td>Linear Algebra</td>
                    <td>200</td>
                    <td><button className='border py-2 px-4 rounded m-2 text-center'>View More</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
           

          </div>
        </section>

        

    </main>
  )
}

export default CourseAdviserDashboard
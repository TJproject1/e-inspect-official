"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown} from 'react-icons/ai'
import { useAuth } from "../../../context/AuthContext";
import {useRouter} from "next/navigation"

export default function Register() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [title, setTitle] = useState('')
  const [password, setPassword ] = useState('')
  const [error, setError] = useState(null)

  const { signup, currentUser } = useAuth()
  console.log(currentUser)

  const router = useRouter()

  async function handleSignup(e) {
    e.preventDefault();
    if(!email || !password) {
      setError('Please enter email and password')
      return
    }
    try {
      await signup(email, password)
      router.push('/course-adviser')
    } catch (error) {
      setError(error)
    }
  }
  return (
    <main className="app">
      <div className=" w-full flex flex-col items-center mx-auto">
        <div className="logo w-[186px] mt-16 my-8">
          <Image
            className="w-full h-full"
            src={"/images/p1.png"}
            width={725}
            height={255}
          />
        </div>
        <div className="text-sm text-[#3a3a3a]">
          Integrity in school assessments...
        </div>

        <form onSubmit={(e) => handleSignup(e)} className="form mt-16 w-[85%] mx-auto ">
          <div className="input-grp mb-8">
            {/* <label className='font-bold' htmlFor="">Email Address</label> */}
            <input
              placeholder="Title(Mr, Mrs, Prof,...)"
              type="text"
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
            />
          </div>
          <div className="input-grp mb-8">
            {/* <label className='font-bold' htmlFor="">Email Address</label> */}
            <input
              placeholder="Full Name"
              type="text"
              name='displayName'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
            />
          </div>
          <div className="input-grp mb-8 text-[#3a3a3a] flex items-center rounded border border-[#3a3a3a]">
            
            <select name="role" id="role"  className=" rounded p-4 appearance-none w-[90%] ">
              <option value="course-advisor">Course Adviser</option>
              <option value="exam-invigilator">Exam Invigilator</option>
            </select>
              <span className="w-[10%] pr-9"> <AiFillCaretDown size={24}/> </span>
          </div>

          <div className="input-grp mb-8">
            {/* <label className='font-bold' htmlFor="">Email Address</label> */}
            <input
              placeholder="Email Address"
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
            />
          </div>
          <div className="input-grp mb-8">
            {/* <label className='font-bold' htmlFor="">Email Address</label> */}
            <input
              placeholder="Phone Number"
              type="text"
              className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
            />
          </div>
          <div className="input-grp">
            {/* <label className='font-bold' htmlFor="">Password</label> */}
            <input
              placeholder="Password"
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
            />
          </div>
          <button type="submit" className="w-full mt-8 font-semibold bg-[#115baa] text-white p-4 text-lg text-center rounded">
            Register
          </button>
        </form>
        <div className="w-full text-center text-[#3a3a3a] mt-16">
          <Link href="/">
            Already have an account?{" "}
            <span className="text-[#115baa]">Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

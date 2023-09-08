"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, currentUser } = useAuth()

  console.log(currentUser)

  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault();
    if(!email || !password) {
      setError('Please Enter email and password')
      return
    }
    try {
      await login(email, password)
      router.push('/course-adviser')
    } catch(err) {
      setError('Incorrect email or password')
    }
  }

  return (
    <main className="app">
      { currentUser ? router.push('/course-adviser') : (
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

        <form onSubmit={(e) => handleLogin(e)} className="form mt-16 w-[85%] mx-auto ">
          <div className="input-grp mb-8">
            {/* <label className='font-bold' htmlFor="">Email Address</label> */}
            <input
              placeholder="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#3a3a3a] px-5 py-4 rounded"
            />
          </div>
          <div className="input-grp">
            {/* <label className='font-bold' htmlFor="">Password</label> */}
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#3a3a3a] px-5 py-4 rounded"
            />
            <button type='submit' className="w-full mt-8 font-semibold bg-[#115baa] text-white p-4 text-lg text-center rounded">
              Login
            </button>
            {/* <button className="w-full border-[#3a3a3a] border mt-4 bg-[transparent] font-semibold text-[#3a3a3a] p-4 text-lg text-center rounded flex items-center justify-center">
              <span className="bg-transparent mr-4">
                <Image
                  className="w-[26px]"
                  src={"/images/g3.png"}
                  width={52}
                  height={52}
                />
              </span>
              Sign in with Google
            </button> */}
          </div>

        </form>
        <div className="w-full text-center text-[#3a3a3a] mt-16"><Link href="/register">Don't have an account yet? <span className="text-[#115baa]">Register</span></Link></div>
      </div>
      )}
    </main>
  );
}

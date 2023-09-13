"use client";

import { PrimaryButton } from "@/components/Buttons";
import { TextInput } from "@/components/Inputs";
import ToastNotification from "@/components/ToastNotification";
import { useRegister } from "@/hooks/useRegister";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    error,
    success,
    handleRegister,
    user: currentUser,
    isLoading,
  } = useRegister();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser]);

  if (currentUser) {
    return (
      <div className="grid w-full h-screen place-content-center">
        <ImSpinner className="w-8 h-8 text-[#115baa] mx-auto animate-spin" />
      </div>
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    handleRegister({ email, password, displayName, title, role, phoneNumber });
  };

  return (
    <main className="app">
      <div className="flex flex-col items-center w-full mx-auto mb-10">
        <span className="logo w-[186px] mt-16 mb-4 block">
          <Image
            className="w-full h-full"
            src={"/images/p1.png"}
            width={725}
            height={255}
            alt="logo"
            priority
          />
        </span>
        <p className="text-sm text-[#3a3a3a]">
          Integrity in school assessments...
        </p>

        <div className="w-full transition-all duration-75 h-fit">
          <ToastNotification
            message={success || error}
            type={success ? "success" : "error"}
          />

          <form
            onSubmit={submitHandler}
            className="form mt-16 w-[85%] lg:w-1/2 xl:w-2/5 mx-auto "
          >
            <div className="mb-8 input-grp">
              <TextInput
                placeholder="Title(Mr, Mrs, Prof,...)"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
                required
              />
            </div>
            <div className="mb-8 input-grp">
              <TextInput
                placeholder="Full Name"
                type="text"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
                required
              />
            </div>
            <div className="input-grp mb-8 text-[#3a3a3a] flex items-center relative rounded border border-[#3a3a3a]">
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 rounded appearance-none cursor-pointer"
                required
              >
                <option value="">Default</option>
                <option value="course-advisor">Course Adviser</option>
                <option value="exam-invigilator">Exam Invigilator</option>
              </select>

              <AiFillCaretDown
                size={20}
                className="absolute -translate-y-1/2 top-1/2 right-6"
              />
            </div>

            <div className="mb-8 input-grp">
              <TextInput
                placeholder="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
                required
              />
            </div>
            <div className="mb-8 input-grp">
              <TextInput
                placeholder="Phone Number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
                required
              />
            </div>
            <div className="input-grp">
              <TextInput
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded bg-transparent border border-[#3a3a3a]"
                required
                minLength={6}
              />
            </div>
            <PrimaryButton
              text="Register"
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              className="w-full mt-8 font-semibold bg-[#115baa] text-white p-4 text-lg text-center rounded"
            />
          </form>
        </div>
        <div className="w-full text-center text-sm text-[#3a3a3a] mt-16">
          <Link href="/">
            Already have an account?{" "}
            <span className="text-[#115baa]">Register</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

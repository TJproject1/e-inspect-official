"use client";

import { PrimaryButton } from "@/components/Buttons";
import { TextInput } from "@/components/Inputs";
import ToastNotification from "@/components/ToastNotification";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    error,
    success,
    handleLogin,
    user: currentUser,
    isLoading,
  } = useLogin();

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
    handleLogin(email, password);
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
                placeholder="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#3a3a3a] px-5 py-4 rounded"
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
                className="w-full border border-[#3a3a3a] px-5 py-4 rounded"
                required
              />
              <PrimaryButton
                text="Login"
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                className="w-full mt-8 font-semibold bg-[#115baa] text-white p-4 text-lg text-center rounded"
              />
              {/* <button className="w-full border-[#3a3a3a] border mt-4 bg-[transparent] font-semibold text-[#3a3a3a] p-4 text-lg text-center rounded flex items-center justify-center">
              <span className="mr-4 bg-transparent">
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
        </div>

        <div className="w-full text-center text-sm text-[#3a3a3a] mt-16">
          <Link href="/register">
            Don't have an account yet?{" "}
            <span className="text-[#115baa]">Register</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

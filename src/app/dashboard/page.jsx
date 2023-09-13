"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner } from "react-icons/im";
import CourseAdviserDashboard from "../course-adviser/page";
import ExamInvigilator from "../exam-invigilator/page";

function Dashboard() {
  const router = useRouter();
  const { userInfo, loading } = useAuth();

  useEffect(() => {
    if (!loading && !userInfo) {
      router.push("/");
    }
  }, [userInfo, loading]);

  if (!userInfo) {
    return (
      <div className="grid w-full h-screen place-content-center">
        <ImSpinner className="w-8 h-8 text-[#115baa] mx-auto animate-spin" />
      </div>
    );
  }

  return userInfo?.role === "course-advisor" ? (
    <CourseAdviserDashboard />
  ) : (
    <ExamInvigilator />
  );
}

export default Dashboard;

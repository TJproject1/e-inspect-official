import Image from "next/image";
import React from "react";

function AddStudentForm() {
  return (
    <div className="w-full mb-24">
      <div
        className={`  border rounded h-[40vh] bg-gray-200 w-full mt-10 mb-10 text-center p-8`}
      >
        <span className="text-sm opacity-40">
          Click to Scan or Upload picture of a Face
        </span>
        <Image
          src={"/images/face-scan.png"}
          className="mx-auto"
          width={200}
          height={200}
        />
      </div>
      <div className="inpt-grp">
        <input
          type="text"
          className="w-full p-5 my-4 border rounded"
          placeholder="Enter Student's Name"
        />
        <input
          type="text"
          className="w-full p-5 my-4 border rounded"
          placeholder="Enter Matriculation Number"
        />
        <textarea
          className="w-full p-5 my-4 border rounded"
          placeholder="Courses offered(separate with comma) e.g MTH317,CSC111,..."
          rows={5}
        ></textarea>
        <button className="w-full rounded mt-6 bg-[#115baa] text-white text-sm py-3 px-5">
          Register Student
        </button>
      </div>
    </div>
  );
}

export default AddStudentForm;

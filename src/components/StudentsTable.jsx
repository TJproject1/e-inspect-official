import React from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";

function StudentsTable() {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full mt-4 overflow-scroll text-center">
        <thead>
          <tr className="text-sm opacity-50">
            <th>S/N</th>
            <th>Mat No</th>
            <th>Name</th>
            <th>No Of Courses Registered</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr>
            <td>1</td>
            <td>PSC18809922</td>
            <td>Thomas Johnson</td>
            <td>9</td>
            <td>
              <span className="flex items-center justify-center mt-4">
                <HiOutlinePencil
                  size={18}
                  color={"#000000"}
                  className="mr-8 opacity-50"
                  role="button"
                />

                <MdDeleteOutline
                  size={18}
                  color={"#000000"}
                  className="opacity-50"
                  role="button"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentsTable;

import React from "react";
import { CSVLink } from "react-csv";
import { IoMdDownload } from "react-icons/io";

function ReactCSV({ data, selectedOption }) {
  // console.log("data: ", data);
  let filteredArray = data.filter((obj) => {
    for (let key in obj) {
      if (
        obj[key] != null &&
        !obj[key].toString().toLowerCase().includes("undefined")
      ) {
        return true; // Remove this object from the array
      }
    }
    return false; // Keep this object in the array
  });
  // console.log("filteredArray: ", filteredArray);
  const timestamp = new Date().toLocaleString().replace(/:/g, "-");
  return (
    <CSVLink
      data={filteredArray}
      filename={`${selectedOption}_${timestamp}.csv`}
    >
      <button className="flex items-center gap-3 border border-gray-400 px-3 py-2 rounded-md text-sm hover:bg-black hover:text-white duration-200 ease-in-out mt-4">
        <IoMdDownload />
        Download CSV
      </button>
    </CSVLink>
  );
}

export default ReactCSV;

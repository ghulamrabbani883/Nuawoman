import React from "react";

const Pagination = ({ page, setPage }) => {

  return (
    <div className="h-10  w-fit flex gap-5 mx-auto">
      {Array.from({ length: 10 })
        .fill(1)
        .map((pg, index) => (
          <p
            className={`text-xl flex items-center justify-center text-gray-800 border border-gray-800 px-3 cursor-pointer ${
              page == index + 1 ? "px-4 font-bold text-white bg-gray-800 text-2xl" : ""
            }`}
            onClick={() => setPage(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </p>
        ))}
    </div>
  );
};

export default Pagination;

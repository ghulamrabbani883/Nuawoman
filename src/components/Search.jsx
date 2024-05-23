import React from "react";
import { CSVLink } from "react-csv";

const Search = ({ setLimit, setSort, books }) => {
  console.log(books);

  const columns = [
    {
      key: 1,
      label: "Title",
    },
    {
      key: 2,
      label: "Author Name",
    },
    {
      key: 3,
      label: "Subject",
    },
    {
      key: 4,
      label: "Author DOB",
    },
    {
      key: 5,
      label: "First Publish",
    },
    {
      key: 6,
      label: "Average Ratings",
    },
    {
      key: 7,
      label: "Top Work",
    },
  ];
  return (
    <section className="flex items-center gap-20 w-full justify-center h-24">
      <div className="border w-44 text-center border-gray-800 py-2 px-3 rounded mt-8">
        <CSVLink
          data={books}
          //   headers={columns}
          filename={"bookdata.csv"}
          className="w-44 relative"
          target="_blank"
        >
          Download me
        </CSVLink>
        
      </div>
      <div className="flex flex-col gap-2">
        <label>Sort</label>
        <select
          className="w-44 outline-none border border-gray-800 py-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value={"asc"}>asc </option>
          <option value={"desc"}>desc </option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label>Limit</label>
        <select
          className="w-44 outline-none border border-gray-800 py-2 rounded"
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value={10}>10 </option>
          <option value={20}>20 </option>
          <option value={25}>25 </option>
          <option value={30}>30 </option>
          <option value={40}>40 </option>
          <option value={50}>50 </option>
          <option value={75}>75 </option>
          <option value={100}>100 </option>
        </select>
      </div>
    </section>
  );
};

export default Search;

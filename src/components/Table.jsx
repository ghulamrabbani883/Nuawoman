import React from "react";

const Table = ({ book, index }) => {
  return (
    <tr className="h-8">
      <td className="border border-gray-800 text-start px-2">{index + 1}</td>
      <td className="border border-gray-800 text-start px-2">{book.title}</td>
      <td className="border border-gray-800 text-start px-2">
        {book.author_name}
      </td>
      <td className="border border-gray-800 text-start px-2">{book.subject}</td>
      <td className="border border-gray-800 text-start px-2">
        {book.author_birth_date}
      </td>
      <td className="border border-gray-800 text-start px-2">
        {book.first_publish_year}
      </td>
      <td className="border border-gray-800 text-start px-2">
        {book.ratings_average}
      </td>
      <td className="border border-gray-800 text-start px-2">
        {book.author_top_work}
      </td>
    </tr>
  );
};

export default Table;

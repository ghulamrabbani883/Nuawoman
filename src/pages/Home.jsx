import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Table from "../components/Table";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const sortBooks = (books, sortOrder) => {
      return books.sort((a, b) => {
        for (const column in a) {
          // Compare values of corresponding columns
          const valueA = a[column];
          const valueB = b[column];
          if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
          if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        }
        return 0; 
      });
    };
    const sorted = sortBooks(books, sort);
    setBooks(sorted);
    setLoading(false);
  }, [sort]);

  useEffect(() => {
    const fetchBooksData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://openlibrary.org/search.json?q=all&fields=ratings_average,author_name,title,first_publish_year,subject,author_key&limit=${limit}&page=${page}`
      );
      const bookDetailswithAuthor = await Promise.all(
        data?.docs?.map(async (book, i) => {
          const authorDetails = await axios.get(
            `https://openlibrary.org/authors/${book.author_key[0]}.json`
          );
          const authorworks = await axios.get(
            `https://openlibrary.org/search/authors.json?q=${book.author_name[0]}`
          );
          return {
            ratings_average: book.ratings_average || "N/A",
            author_name: authorDetails?.data?.name || "N/A",
            title: book.title || "N/A",
            first_publish_year: book.first_publish_year || "N/A",
            subject: book.subject ? book.subject[0] : "N/A",
            author_birth_date: authorDetails?.data?.birth_date || "N/A",
            author_top_work: authorworks.data.docs[0].top_work || "N/A",
          };
        })
      );
      setBooks(bookDetailswithAuthor);
      setLoading(false);
    };
    fetchBooksData();
  }, [limit, page]);
  return (
    <main className="flex flex-col gap-12 pb-12">
      <header className="text-center h-44 bg-gray-300 text-gray-800 text-6xl flex items-center justify-center">
        Book Dashboard
      </header>
      <Search setLimit={setLimit} setSort={setSort} books={books} />
      <section className="px-32">
        <table className="w-full">
          <thead className="border border-gray-800 h-10 text-lg">
            <tr>
              <th className="border border-gray-800 text-start px-2">Sr No.</th>

              <th className="border border-gray-800 text-start px-2">Title</th>
              <th className="border border-gray-800 text-start px-2">
                Author Name
              </th>
              <th className="border border-gray-800 text-start px-2">
                Subject
              </th>
              <th className="border border-gray-800 text-start px-2">
                Author Birth
              </th>
              <th className="border border-gray-800 text-start px-2">
                First Publish Year
              </th>
              <th className="border border-gray-800 text-start px-2">
                Ratings
              </th>
              <th className="border border-gray-800 text-start px-2">Top Work</th>
            </tr>
          </thead>
          {loading ? (
            <p className="relative w-full h-full text-gray-800 text-3xl flex items-center justify-center">
              Loading...
            </p>
          ) : (
            <tbody>
              {books.map((book, index) => (
                <Table book={book} key={index} index={index} />
              ))}
            </tbody>
          )}
        </table>
      </section>
      <Pagination page={page} setPage={setPage} limit={limit} />
    </main>
  );
};

export default Home;

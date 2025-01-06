import React, { useEffect, useState } from "react";

const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [sortorder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const resultPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/results")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const filteredData = results.filter(
    (result) =>
      result.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.leading_party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.leading_candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedResults = [...filteredData].sort((a, b) => {
    if (sortorder === "desc") {
      return b.margin - a.margin;
    } else {
      return a.margin - b.margin;
    }
  });

  const LastIndexedPage = resultPerPage * currentPage;
  const FirstIndexedPage = LastIndexedPage - resultPerPage;
  const currentResults = sortedResults.slice(FirstIndexedPage, LastIndexedPage);

  const TotalPages = Math.ceil(sortedResults.length / resultPerPage);

  return (
    <div>
      <h1>Election Results</h1>
      <input
        type="text"
        placeholder="Search By Party or Constituency"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
      <ol>
        {currentResults.map((result) => (
          <li key={result.id}>
            <strong>{result.state}</strong>:{result.leading_party}(
            {result.leading_candidate}) ({result.margin} votes) (
            {result.constituency} City)
          </li>
        ))}
      </ol>

      <button
        onClick={() => setSortOrder(sortorder === "desc" ? "asc" : "desc")}
      >
        Sort by Vote Margin ({sortorder === "desc" ? "Ascending" : "Descending"}
        )
      </button>

      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {TotalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === TotalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ElectionResults;

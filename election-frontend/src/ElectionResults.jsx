import React, { useEffect, useState } from "react";

const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from backend API
    fetch("http://localhost:5000/api/results")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const filteredData = results.filter(
    (result) =>
      result.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.leading_party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.leading_candidate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Election Results</h1>
      <input
        type="text"
        placeholder="Search By Party or Constituency"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
      <ul>
        {filteredData.map((result) => (
          <li key={result.id}>
            <strong>{result.state}</strong>: {result.leading_party}(
            {result.leading_candidate}) ({result.margin} votes) (
            {result.constituency} City)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElectionResults;

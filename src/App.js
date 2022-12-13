import React, { useEffect, useState } from "react";
import axios from "axios";

export function App(props) {
  const [data, setData] = useState(null); // State variable to store the data

  const [page, setPage] = useState(0);
  const entriesPerPage = 20;
  const startIndex = page * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  let currentData;
  if (data) {
    currentData = data.slice(startIndex, endIndex);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.publicapis.org/entries");
      setData(response.data.entries); // Update the state with the fetched data
    };

    fetchData(); // Fetch the data when the component is mounted
  }, [data]);

  return (
    <div>
      {currentData === null && <p>Loading...</p>}{" "}
      {currentData !== undefined &&
        currentData !== null &&
        currentData.length > 0 && (
          <ul>
            {currentData.map((item, index) => (
              <li key={index}>{item.Link}</li>
            ))}
          </ul>
        )}
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
export default App;

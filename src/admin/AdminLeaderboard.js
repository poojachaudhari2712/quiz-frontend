import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminLeaderboard.css"; 

const AdminLeaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      const sortedData = res.data.sort((a, b) => b.totalScore - a.totalScore); // Descending 
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      setError("Error fetching leaderboard data.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard (Top Scorers First)</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const student = entry.student || {};
            return (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{student.name || "N/A"}</td>
                <td>{student.email || "N/A"}</td>
                <td>{entry.totalScore}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaderboard;

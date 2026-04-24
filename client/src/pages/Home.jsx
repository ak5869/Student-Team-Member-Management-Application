import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/members")
      .then((res) => setMemberCount(res.data.length))
      .catch(() => setMemberCount(0));
  }, []);

  return (
    <div className="home-container">
      {/* Badge */}
      <span className="home-badge">Student Team Management</span>

      {/* Title */}
      <h1 className="home-title">
        Manage Your <span className="gradient-text">Team Members</span>
        <br />
        Effortlessly
      </h1>

      {/* Subtitle */}
      <p className="home-subtitle">
        Welcome to <strong>Team FourX's</strong> management application. Add new members,
        view the full roster, and access detailed profiles — all in one place.
      </p>

      {/* Action Buttons */}
      <div className="home-actions">
        <Link to="/add" className="btn btn-primary">
          Add Member
        </Link>
        <Link to="/members" className="btn btn-secondary">
          View Members
        </Link>
      </div>

      {/* Stats */}
      <div className="home-stats">
        <div className="home-stat">
          <div className="home-stat-value">{memberCount}</div>
          <div className="home-stat-label">Team Members</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">1</div>
          <div className="home-stat-label">Team</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">Unlimited</div>
          <div className="home-stat-label">Possibilities</div>
        </div>
      </div>
    </div>
  );
}
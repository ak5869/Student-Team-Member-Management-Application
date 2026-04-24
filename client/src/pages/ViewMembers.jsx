import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MemberCard from "../components/MemberCard";

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/members")
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading team members...</p>
      </div>
    );
  }

  // Empty state
  if (members.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">No Data</div>
        <h3 className="empty-state-title">No Members Yet</h3>
        <p className="empty-state-text">
          Your team roster is empty. Start by adding your first team member!
        </p>
        <Link to="/add" className="btn btn-primary">
          Add First Member
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">Team Members</h2>
        <p className="page-subtitle">
          {members.length} member{members.length !== 1 ? "s" : ""} in your team
        </p>
      </div>

      {/* Members Grid */}
      <div className="member-grid">
        {members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onDelete={(id) => setMembers(members.filter((m) => m._id !== id))}
          />
        ))}
      </div>
    </div>
  );
}
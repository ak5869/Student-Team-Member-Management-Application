import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/members/${id}`)
      .then((res) => {
        setMember(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove ${member.name} from the team?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      navigate("/members");
    } catch (err) {
      alert("Failed to delete member. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading member details...</p>
      </div>
    );
  }

  // Not found
  if (!member) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">Not Found</div>
        <h3 className="empty-state-title">Member Not Found</h3>
        <p className="empty-state-text">
          The member you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/members" className="btn btn-primary">
          Back to Members
        </Link>
      </div>
    );
  }

  // Avatar source (falls back to initials if no image)
  const avatarSrc = member.image
    ? `http://localhost:5000/uploads/${member.image}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6c5ce7&color=fff&size=600`;

  // Format the joined date
  const joinedDate = member.createdAt
    ? new Date(member.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
      })
    : null;

  return (
    <div className="detail-container">
      <div className="detail-card">
        {/* Member Image */}
        <div className="detail-image-wrapper">
          <img
            src={avatarSrc}
            alt={member.name}
            className="detail-image"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6c5ce7&color=fff&size=600`;
            }}
          />
          <div className="detail-image-overlay"></div>
        </div>

        {/* Member Detail Body */}
        <div className="detail-body">
          <h1 className="detail-name">{member.name}</h1>
          <span className="detail-role">{member.role}</span>

          {/* Degree & Year & Batch Badges */}
          <div className="detail-badges">
            {member.degree && <span className="detail-badge">{member.degree}</span>}
            {member.year && <span className="detail-badge">{member.year}</span>}
            {member.batch && <span className="detail-badge">Batch: {member.batch}</span>}
          </div>

          {/* All Info Items — always show every entered field */}
          <div className="detail-info-grid">

            {/* Full Name */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Full Name</span>
                <span className="detail-info-value">{member.name}</span>
              </div>
            </div>

            {/* Roll Number */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Roll Number</span>
                <span className="detail-info-value">{member.rollNumber || "—"}</span>
              </div>
            </div>

            {/* Email */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Email Address</span>
                <span className="detail-info-value">{member.email}</span>
              </div>
            </div>

            {/* Role */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Role / Position</span>
                <span className="detail-info-value">{member.role}</span>
              </div>
            </div>

            {/* Degree */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Degree</span>
                <span className="detail-info-value">{member.degree || "—"}</span>
              </div>
            </div>

            {/* Year */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Year</span>
                <span className="detail-info-value">{member.year || "—"}</span>
              </div>
            </div>

            {/* Batch */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Batch</span>
                <span className="detail-info-value">{member.batch || "—"}</span>
              </div>
            </div>

            {/* Phone */}
            {member.phone && (
              <div className="detail-info-item">
                <div className="detail-info-content">
                  <span className="detail-info-label">Phone Number</span>
                  <span className="detail-info-value">{member.phone}</span>
                </div>
              </div>
            )}

            {/* Aim / Goal */}
            {member.aim && (
              <div className="detail-info-item">
                <div className="detail-info-content">
                  <span className="detail-info-label">Aim / Goal</span>
                  <span className="detail-info-value">{member.aim}</span>
                </div>
              </div>
            )}

            {/* Skills */}
            {member.skills && (
              <div className="detail-info-item">
                <div className="detail-info-content">
                  <span className="detail-info-label">Skills</span>
                  <span className="detail-info-value">{member.skills}</span>
                </div>
              </div>
            )}

            {/* LinkedIn */}
            {member.linkedin && (
              <div className="detail-info-item">
                <div className="detail-info-content">
                  <span className="detail-info-label">LinkedIn</span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-info-link"
                  >
                    {member.linkedin}
                  </a>
                </div>
              </div>
            )}

            {/* Joined Date */}
            {joinedDate && (
              <div className="detail-info-item">
                <div className="detail-info-content">
                  <span className="detail-info-label">Joined On</span>
                  <span className="detail-info-value">{joinedDate}</span>
                </div>
              </div>
            )}

            {/* Member ID */}
            <div className="detail-info-item">
              <div className="detail-info-content">
                <span className="detail-info-label">Member ID</span>
                <span className="detail-info-value" style={{ fontSize: "0.8rem", fontFamily: "monospace" }}>
                  {member._id}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="detail-actions">
            <Link to="/members" className="btn btn-secondary">
              Back
            </Link>
            <Link to={`/edit/${member._id}`} className="btn btn-edit">
              Edit Member
            </Link>
            <button onClick={handleDelete} className="btn btn-danger-light">
              Delete Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
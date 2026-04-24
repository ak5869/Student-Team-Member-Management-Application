import { Link } from "react-router-dom";
import axios from "axios";

export default function MemberCard({ member, onDelete }) {
  // Avatar: use uploaded image or fallback to initials
  const avatarSrc = member.image
    ? `http://localhost:5000/uploads/${member.image}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6c5ce7&color=fff&size=300`;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to remove ${member.name} from the team?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/members/${member._id}`);
      if (onDelete) onDelete(member._id);
    } catch (err) {
      alert("Failed to delete member. Please try again.");
    }
  };

  return (
    <div className="member-card">
      {/* Member Image with hover zoom */}
      <div className="member-card-image-wrapper">
        <img
          src={avatarSrc}
          alt={member.name}
          className="member-card-image"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6c5ce7&color=fff&size=300`;
          }}
        />
      </div>

      {/* Card Body */}
      <div className="member-card-body">
        <h3 className="member-card-name">{member.name}</h3>
        <span className="member-card-role">{member.role}</span>
        {/* Meta info row */}
        <div className="member-card-meta">
          {member.rollNumber && <span className="member-card-meta-item">{member.rollNumber}</span>}
          {member.degree && member.year && (
            <span className="member-card-meta-item">{member.degree} · {member.year}</span>
          )}
          {member.batch && <span className="member-card-meta-item">Batch: {member.batch}</span>}
        </div>
      </div>

      {/* Card Footer — light subtle buttons */}
      <div className="member-card-footer">
        <Link to={`/member/${member._id}`} className="btn btn-ghost btn-sm">
          View
        </Link>
        <Link to={`/edit/${member._id}`} className="btn btn-ghost-edit btn-sm">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-ghost-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

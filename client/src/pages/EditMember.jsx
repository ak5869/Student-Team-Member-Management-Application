import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    rollNumber: "",
    year: "",
    degree: "",
    batch: "",
    aim: "",
    phone: "",
    linkedin: "",
    skills: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [existingImage, setExistingImage] = useState("");

  // Fetch existing member data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/members/${id}`)
      .then((res) => {
        const m = res.data;
        setForm({
          name: m.name || "",
          role: m.role || "",
          email: m.email || "",
          rollNumber: m.rollNumber || "",
          year: m.year || "",
          degree: m.degree || "",
          batch: m.batch || "",
          aim: m.aim || "",
          phone: m.phone || "",
          linkedin: m.linkedin || "",
          skills: m.skills || "",
          image: null,
        });
        if (m.image) {
          setExistingImage(m.image);
          setPreview(`http://localhost:5000/uploads/${m.image}`);
        }
        setFetching(false);
      })
      .catch(() => {
        setToast({ type: "error", message: "Failed to load member data." });
        setFetching(false);
      });
  }, [id]);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.role.trim()) newErrors.role = "Role is required";
    if (!form.rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    if (!form.year) newErrors.year = "Year is required";
    if (!form.degree) newErrors.degree = "Degree is required";
    if (!form.batch.trim()) newErrors.batch = "Batch is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
      setExistingImage("");
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setPreview(null);
    setExistingImage("");
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("role", form.role);
      data.append("email", form.email);
      data.append("rollNumber", form.rollNumber);
      data.append("year", form.year);
      data.append("degree", form.degree);
      data.append("batch", form.batch);
      data.append("aim", form.aim);
      data.append("phone", form.phone);
      data.append("linkedin", form.linkedin);
      data.append("skills", form.skills);

      if (form.image) {
        data.append("image", form.image);
      }

      await axios.put(`http://localhost:5000/api/members/${id}`, data);

      setToast({ type: "success", message: "Member updated successfully!" });

      setTimeout(() => navigate(`/member/${id}`), 1500);
    } catch (err) {
      const serverMsg = err.response?.data?.error;
      setToast({
        type: "error",
        message: serverMsg || "Failed to update member. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  const degreeOptions = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc", "BBA", "MBA", "Ph.D", "Other"];

  if (fetching) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading member data...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="form-card">
        <h2 className="form-title">Edit Member</h2>
        <p className="form-subtitle">
          Update the details below and save your changes.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Section: Personal Info */}
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Roll Number <span className="required">*</span></label>
                <input
                  type="text"
                  className={`form-input ${errors.rollNumber ? "error" : ""}`}
                  placeholder="e.g. RA2211003010XXX"
                  value={form.rollNumber}
                  onChange={(e) => handleChange("rollNumber", e.target.value)}
                />
                {errors.rollNumber && <p className="form-error">{errors.rollNumber}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="member@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section: Academic Info */}
          <div className="form-section">
            <h3 className="form-section-title">Academic Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Degree <span className="required">*</span></label>
                <select
                  className={`form-input form-select ${errors.degree ? "error" : ""}`}
                  value={form.degree}
                  onChange={(e) => handleChange("degree", e.target.value)}
                >
                  <option value="">Select Degree</option>
                  {degreeOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.degree && <p className="form-error">{errors.degree}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Year <span className="required">*</span></label>
                <select
                  className={`form-input form-select ${errors.year ? "error" : ""}`}
                  value={form.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {errors.year && <p className="form-error">{errors.year}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Batch <span className="required">*</span></label>
                <input
                  type="text"
                  className={`form-input ${errors.batch ? "error" : ""}`}
                  placeholder="e.g. 2022-2026"
                  value={form.batch}
                  onChange={(e) => handleChange("batch", e.target.value)}
                />
                {errors.batch && <p className="form-error">{errors.batch}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Role / Position <span className="required">*</span></label>
                <input
                  type="text"
                  className={`form-input ${errors.role ? "error" : ""}`}
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
                {errors.role && <p className="form-error">{errors.role}</p>}
              </div>
            </div>
          </div>

          {/* Section: Additional Info */}
          <div className="form-section">
            <h3 className="form-section-title">Additional Information</h3>

            <div className="form-group">
              <label className="form-label">Aim / Goal</label>
              <textarea
                className="form-input form-textarea"
                placeholder="What is your career goal or aspiration?"
                value={form.aim}
                onChange={(e) => handleChange("aim", e.target.value)}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Skills</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. React, Node.js, Python, Figma"
                value={form.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">LinkedIn Profile</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://linkedin.com/in/username"
                value={form.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-section">
            <h3 className="form-section-title">Profile Photo <span className="optional-badge">Optional</span></h3>
            <div className={`file-upload-area ${preview ? "has-file" : ""}`}>
              <input
                type="file"
                accept="image/*"
                className="file-upload-input"
                onChange={handleImageChange}
              />
              {!preview ? (
                <>
                  <div className="file-upload-icon">Upload</div>
                  <p className="file-upload-text">
                    <strong>Click to upload</strong> or drag and drop
                    <br />
                    PNG, JPG up to 5MB
                  </p>
                  <p className="file-upload-hint">If skipped, initials will be used as avatar</p>
                </>
              ) : (
                <div className="file-preview">
                  <img src={preview} alt="Preview" />
                  <span className="file-preview-name">{form.image?.name || existingImage || "Current photo"}</span>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

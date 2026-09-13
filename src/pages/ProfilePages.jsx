import { useEffect, useState } from "react";
import { Edit, Plus, X, Mail, MapPin, Camera } from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";

/* ---------------- Modal ---------------- */
function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        {children}

        <button
          onClick={onSave}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
function Section({ title, icon, onEdit, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>

        <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-full">
          {icon}
        </button>
      </div>

      {children}
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const token = localStorage.getItem("token");

  /* ---------------- GET PROFILE ---------------- */
  const getProfile = async () => {
    try {
      const { data } = await api.get("/api/users/user-data", {
        headers: { Authorization: token },
      });

      setUser(data.user);
      setFormData(data.user);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  /* ---------------- UPDATE PROFILE (ONLY ONE FN) ---------------- */
  const updateProfile = async () => {
    try {
      await api.put("/api/users/update-profile", formData, {headers: { Authorization: token }});

      toast.success("Profile updated successfully");
      setActiveModal(null);
      getProfile();
    } catch {
      toast.error("Update failed");
    }
  };

  /* ---------------- GENERIC HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- SKILLS ---------------- */
  const addSkill = () => {
    if (!skillInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), skillInput.trim()],
    }));

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

 

  /* ---------------- EDUCATION ---------------- */
  const updateEducation = (index, field, value) => {
    const updated = [...(formData.educations || [])];
    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      educations: updated,
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [
        ...(prev.educations || []),
        { degree: "", college: "", year: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- PROFILE PIC ---------------- */
  const updateProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      profilePicture: imageUrl,
    }));

    setShowProfileOptions(false);
  };

  const deleteProfilePic = () => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: "",
    }));

    setShowProfileOptions(false);
  };

  /* ---------------- LOADING ---------------- */
  if (!formData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HERO */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="h-52 bg-gradient-to-r from-blue-500 to-green-500 relative">
            <label className="absolute top-4 right-4 bg-white p-3 rounded-full cursor-pointer shadow">
              <Camera size={18} />
              <input type="file" className="hidden" onChange={updateProfilePic} />
            </label>
          </div>

          <div className="p-8 relative">
            <img
              src={
                formData.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-40 h-40 rounded-full border-4 border-white absolute -top-20 object-cover cursor-pointer"
              onClick={() => setShowProfileOptions(true)}
            />

            <div className="ml-48">
              <h1 className="text-3xl font-bold">{formData.name}</h1>

              <p className="text-gray-700 mt-2">
                {formData.bio || "No bio added"}
              </p>

              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <Mail size={16} />
                {formData.email}
              </p>

              <p className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin size={16} />
                India
              </p>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <Section title="About" icon={<Edit />} onEdit={() => setActiveModal("about")}>
          <p>{formData.bio || "No bio added"}</p>
        </Section>

        {/* SKILLS */}
        <Section title="Skills" icon={<Edit />} onEdit={() => setActiveModal("skills")}>
          <div className="flex flex-wrap gap-3">
            {formData.skills?.length ? (
              formData.skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-blue-100 rounded-full">
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills added</p>
            )}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section title="Education" icon={<Plus />} onEdit={() => setActiveModal("education")}>
          {formData.educations?.length ? (
            formData.educations.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p>{edu.college}</p>
                <p className="text-gray-500">{edu.year}</p>
              </div>
            ))
          ) : (
            <p>No education added</p>
          )}
        </Section>

        {/* CONTACT */}
        <Section title="Contact" icon={<Edit />} onEdit={() => setActiveModal("contact")}>
          <p>{formData.email}</p>
        </Section>
      </div>

      {/* ---------------- ABOUT MODAL ---------------- */}
      {activeModal === "about" && (
        <Modal title="Edit About" onClose={() => setActiveModal(null)} onSave={updateProfile}>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </Modal>
      )}

     

      {/* ---------------- SKILLS MODAL ---------------- */}
      {activeModal === "skills" && (
        <Modal title="Edit Skills" onClose={() => setActiveModal(null)} onSave={updateProfile}>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter skill"
            />
            <button onClick={addSkill} className="bg-green-500 text-white px-4 rounded-lg">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {formData.skills?.map((skill, i) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                {skill}
                <X className="h-4 w-4 cursor-pointer" onClick={() => removeSkill(i)} />
              </span>
            ))}
          </div>
        </Modal>
      )}

      {/* ---------------- EDUCATION MODAL ---------------- */}
      {activeModal === "education" && (
        <Modal title="Edit Education" onClose={() => setActiveModal(null)} onSave={updateProfile}>
          {formData.educations?.map((edu, i) => (
            <div key={i} className="space-y-3 mb-5 border-b pb-4">
              <input
                value={edu.degree}
                onChange={(e) => updateEducation(i, "degree", e.target.value)}
                className="w-full border p-3 rounded-lg"
                placeholder="Degree"
              />

              <input
                value={edu.college}
                onChange={(e) => updateEducation(i, "college", e.target.value)}
                className="w-full border p-3 rounded-lg"
                placeholder="College"
              />

              <input
                value={edu.year}
                onChange={(e) => updateEducation(i, "year", e.target.value)}
                className="w-full border p-3 rounded-lg"
                placeholder="Year"
              />

              <button
                onClick={() => removeEducation(i)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <button onClick={addEducation} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Add Education
          </button>
        </Modal>
      )}

      {/* PROFILE OPTIONS */}
      {showProfileOptions && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <label className="block bg-blue-600 text-white text-center py-3 rounded-xl cursor-pointer mb-3">
              Update Profile
              <input type="file" className="hidden" onChange={updateProfilePic} />
            </label>

            <button onClick={deleteProfilePic} className="w-full bg-red-500 text-white py-3 rounded-xl mb-3">
              Delete Profile
            </button>

            <button onClick={() => setShowProfileOptions(false)} className="w-full bg-gray-200 py-3 rounded-xl">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
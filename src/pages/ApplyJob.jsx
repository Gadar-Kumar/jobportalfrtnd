import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobs } from "../assets/dummyJob.js";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === parseInt(id));

  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  if (!job) return <p className="text-center mt-10 text-red-500">Job not found!</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setResumeFile(files[0]);
    else setFormData({ ...formData, [name]: value });
  };

  const analyzeResume = () => {
    let text = resumeText;
    if (resumeFile) {
      text += ` ${resumeFile.name}`;
    }
    const keywords = job.title.toLowerCase().split(" ");
    const matches = keywords.filter((kw) => text.toLowerCase().includes(kw));
    alert(`Found ${matches.length} relevant keywords: ${matches.join(", ")}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted!");
    navigate("/job");
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">{job.title}</h1>

      {/* Job Description */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Job Description</h2>
        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo eget libero faucibus, vel pretium metus sollicitudin.</p>
      </section>

      {/* Job Specification */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Job Specification</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><span className="font-semibold">Location:</span> {job.location}</li>
          <li><span className="font-semibold">Salary:</span> {job.salary}</li>
          <li><span className="font-semibold">Type:</span> {job.type}</li>
        </ul>
      </section>

      {/* Resume Analyzer */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Resume Analyzer</h2>
        <textarea
          rows="5"
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="mb-2"
        />
        {resumeFile && <p className="text-gray-600 mb-2">Uploaded: {resumeFile.name}</p>}
        <button
          onClick={analyzeResume}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Analyze Resume
        </button>
      </section>

      {/* Application Form */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Apply</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
            <label id="cgpa" >Upload Your UG Marksheet</label>
          <input type="file" 
          placeholder="CGPA"
          id="cgpa"
            className="w-2/5 h-10 bg-gray-200 px-4 p-2 rounded-md"
            onChange={handleChange}
          />

           <label id="resume" >Upload Your Resume</label>
          <input type="file" 
          placeholder="Resume"
          id="resume"
            className="w-2/5 h-10 bg-gray-200 px-4 p-2 rounded-md"
            onChange={handleChange}
          />
         
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
};

export default ApplyJob;
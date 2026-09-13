import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobCategories from "../assets/Jobcategory";
import { jobs } from "../assets/dummyJob.js";

const Job = () => {
  const { categorySlug } = useParams();

  // Sidebar filters
  const [filters, setFilters] = useState({
    category: categorySlug || "",
    location: "",
  });

  const navigate = useNavigate();

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.category || job.category === filters.category) &&
      (!filters.location || job.location === filters.location)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      <h1 className="text-3xl font-bold mb-8">
        {filters.category
          ? `Jobs in: ${jobCategories.find((c) => c.slug === filters.category)?.title}`
          : "All Jobs"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white p-5 rounded-lg shadow h-fit space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All</option>
              {jobCategories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="lg:col-span-3 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600">
                  {job.company} • {job.location}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {job.salary} • {job.type}
                </p>
                <p>📅 {new Date(job.createdAt ).toLocaleString()}</p>
                <p>👥 Applied: {job.applicantsCount || 0}</p>

                <button
                  onClick={() => navigate(`/job/apply/${job.id}`)}
                  className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No jobs found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
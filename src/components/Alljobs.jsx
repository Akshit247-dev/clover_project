import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import axios from "axios";

function Alljobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        axios.get("http://localhost:5000/api/job")
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Job Listings</h2>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
                <div className="space-y-4">
                    {jobs.length > 0 ? (
                        jobs.map(job => (
                            <div key={job.id} className="p-4 bg-white rounded-lg shadow-md">
                                <h4 className="text-lg font-bold">{job.job_name}</h4>
                                <p className="text-sm text-gray-600">Skills: {job.skill}</p>
                                <p className="text-sm text-gray-600">Positions: {job.number_positions}</p>
                                <p className="text-sm text-gray-600">Description: {job.description}</p>
                                <p className="text-sm text-gray-600">Contact: {job.contact_information}</p>
                                <p className="text-sm text-gray-600">
                                    End Date: {new Date(job.end_date).toLocaleDateString()}
                                </p>

                                {/* Navigate to ApplyForm page */}
                                <button
                                    onClick={() => navigate(`/ApplyForm?jobId=${job.id}`)}
                                    className="bg-blue-500 text-black px-4 py-2 mt-3 rounded hover:bg-blue-600"
                                >
                                    Apply
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No jobs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Alljobs;

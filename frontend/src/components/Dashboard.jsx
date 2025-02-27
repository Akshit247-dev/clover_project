import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        job_name: "",
        skill: "",
        number_positions: "",
        description: "",
        contact_information: "",
        end_date: "",
    });

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/jobs");
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Job added successfully!");
                fetchJobs(); // Refresh job list
                setFormData({ job_name: "", skill: "", number_positions: "", description: "", contact_information: "", end_date: "" });
            } else {
                alert("Failed to add job.");
            }
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    // Handle Accept Job Click
    const handleAcceptJob = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/accept`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                alert("Job accepted successfully!");
                fetchJobs(); // Refresh job list to reflect the change
            } else {
                alert("Failed to accept job.");
            }
        } catch (error) {
            console.error("Error accepting job:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Jobs</h1>

            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-center mb-6">Job Listings</h2>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
                    <div className="space-y-4">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job.id} className="p-4 bg-white rounded-lg shadow-md">
                                    <h4 className="text-lg font-bold">{job.job_name}</h4>
                                    <p className="text-sm text-gray-600">Skills: {job.skill}</p>
                                    <p className="text-sm text-gray-600">Positions: {job.number_positions}</p>
                                    <p className="text-sm text-gray-600">Description: {job.description}</p>
                                    <p className="text-sm text-gray-600">Contact: {job.contact_information}</p>
                                    <p className="text-sm text-gray-600">
                                        End Date: {new Date(job.end_date).toLocaleDateString()}
                                    </p>
                                    <button
                                        className="bg-amber-800 text-black px-4 py-2 rounded-lg mt-2 hover:bg-amber-700 transition"
                                        onClick={() => handleAcceptJob(jobs)}
                                    >
                                        Accept
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No jobs available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

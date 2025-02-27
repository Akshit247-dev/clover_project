import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        job_name: "",
        skill: "",
        number_positions: "",
        description: "",
        contact_information: "",
        end_date: "",
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    // Fetch jobs from the server
    const fetchJobs = () => {
        axios.get("http://localhost:5000/api/jobs")
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/jobs", formData)
            .then(() => {
                alert("Job added successfully!");
                setFormData({
                    job_name: "",
                    skill: "",
                    number_positions: "",
                    description: "",
                    contact_information: "",
                    end_date: "",
                });
                fetchJobs(); // Incorrect
            })
            .catch(error => {
                console.error("Error adding job:", error);
                alert("Error adding job. Please try again.");
            });
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

export default JobList;

import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/jobs");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/jobs", formData);
            alert("Job added successfully!");
            setFormData({
                job_name: "",
                skill: "",
                number_positions: "",
                description: "",
                contact_information: "",
                end_date: "",
            });
            fetchJobs(); // Refresh jobs after adding
        } catch (error) {
            console.error("Error adding job:", error);
            alert("Error adding job. Please try again.");
        }
    };

    // Handle job deletion
const handleDelete = async (jobId) => {
    if (!Number(jobId)) {
        alert("Invalid Job ID.");
        return;
    }

    if (window.confirm("Are you sure you want to delete this job?")) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/job/${jobId}`);
            alert(response.data.message);
            fetchJobs(); // Refresh job list
        } catch (error) {
            console.error("Error deleting job:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error deleting job.");
        }
    }
};


    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Job Listings</h2>

            {/* Job Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <input type="text" name="job_name" placeholder="Job Name" value={formData.job_name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="skill" placeholder="Required Skills" value={formData.skill} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="number_positions" placeholder="Number of Positions" value={formData.number_positions} onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="contact_information" placeholder="Contact Information" value={formData.contact_information} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Job</button>
            </form>

            {/* Job Listings */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
                {loading ? (
                    <p className="text-center text-gray-500">Loading jobs...</p>
                ) : (
                    <div className="space-y-4">
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <div key={job.id} className="p-4 bg-white rounded-lg shadow-md">
                                    <h4 className="text-lg font-bold">{job.job_name}</h4>
                                    <p className="text-sm text-gray-600">Skills: {job.skill}</p>
                                    <p className="text-sm text-gray-600">Positions: {job.number_positions}</p>
                                    <p className="text-sm text-gray-600">Description: {job.description}</p>
                                    <p className="text-sm text-gray-600">Contact: {job.contact_information}</p>
                                    <p className="text-sm text-gray-600">End Date: {new Date(job.end_date).toLocaleDateString()}</p>

                                        
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No jobs available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobList;

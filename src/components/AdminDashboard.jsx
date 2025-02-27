import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobApplications, setJobApplications] = useState([]);
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
        fetchApplications();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/job");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/job_applications");
            setJobApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/job", formData);
            alert("Job added successfully!");
            setFormData({
                job_name: "",
                skill: "",
                number_positions: "",
                description: "",
                contact_information: "",
                end_date: "",
            });
            fetchJobs();
        } catch (error) {
            console.error("Error adding job:", error);
            alert("Error adding job. Please try again.");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">Job Listings</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <input type="text" name="job_name" placeholder="Job Name" value={formData.job_name} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="skill" placeholder="Required Skills" value={formData.skill} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="number" name="number_positions" placeholder="Number of Positions" value={formData.number_positions} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="contact_information" placeholder="Contact Information" value={formData.contact_information} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600">Add Job</button>
                </form>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">User Applications</h2>
                <div className="space-y-4">
                    {jobApplications.length > 0 ? (
                        jobApplications.map(application => (
                            <div key={application.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="text-sm text-gray-600"><strong>Name:</strong> {application.name}</p>
                                <p className="text-sm text-gray-600"><strong>Email:</strong> {application.email}</p>
                                <p className="text-sm text-gray-600"><strong>Phone:</strong> {application.phone}</p>
                                {application.resume && (
                                    <p className="text-sm text-gray-600">
                                        <strong>Resume:</strong> <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">Download</a>
                                    </p>
                                )}
                                
                            </div>
                            
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No applications available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobList;

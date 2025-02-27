import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ApplyForm() {
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get("jobId"); // Get job ID from URL
    const userId = 1; // Replace with actual logged-in user ID

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        resume: null
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({ ...prevState, resume: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.resume) {
            setMessage("Please upload a resume.");
            return;
        }

        const data = new FormData();
        data.append("user_id", userId);
        data.append("job_id", jobId);
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("resume", formData.resume);

        // Debugging: Check data before sending
        console.log("Submitting Application:", Object.fromEntries(data));

        try {
            const response = await axios.post("http://localhost:5000/api/apply", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Application Error:", error.response?.data || error.message);
            setMessage("Failed to apply. Try again later.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Apply for Job #{jobId}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-medium">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-medium">Phone Number:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-medium">Upload Resume (PDF):</label>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} required className="border p-2 w-full rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">Apply Now</button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
        </div>
    );
}

export default ApplyForm;

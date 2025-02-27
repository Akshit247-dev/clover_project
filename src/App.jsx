import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Alljobs from "./components/Alljobs";
import AdminDashboard from "./components/AdminDashboard";
import ApplyForm from "./components/ApplyForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Alljobs />} />
                <Route path="/admin" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/ApplyForm" element={<ApplyForm />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;

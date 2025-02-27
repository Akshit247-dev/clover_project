import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-black rounded-lg">Login</button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-green-500 text-black rounded-lg">Register</button>
        </Link>
      </div>
    </div>
  );
}

function Login() {
  return <h2 className="text-center mt-20 text-xl">Login Page</h2>;
}

function Register() {
  return <h2 className="text-center mt-20 text-xl">Register Page</h2>;
}


export default Welcome;

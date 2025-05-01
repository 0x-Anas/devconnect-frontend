import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetails"; // ✅ Import PostDetail

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/:id" element={<PostDetail />} /> {/* ✅ Add this route */}
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { updateMyProfile, getMyProfile } from "../api/profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";
import {
  Edit,
  Globe,
  Github,
  Linkedin,
  MapPin,
  User,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    website: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        toast.error("Please login to view your profile");
        navigate("/");
      }

      try {
        const profileData = await getMyProfile(token);
        setProfile(profileData);
        setFormData({
          bio: profileData.bio || "",
          skills: profileData.skills?.join(", ") || "",
          github: profileData.github || "",
          linkedin: profileData.linkedin || "",
          website: profileData.website || "",
          location: profileData.location || "",
        });
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          return navigate("/login");
        } else {
          toast.error("Failed to load profile");
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);
  //handle logout function in profile page

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { 
        withCredentials: true 
      });
      
      // Clear all client-side storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      
      // Redirect to login
      navigate("/login", { replace: true });
      
      // Optional: Refresh to ensure clean state
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
      
      // Force cleanup even if request fails
      localStorage.clear();
      sessionStorage.clear();
      
      toast.error(
        err.response?.data?.message || 
        "Logged out locally (server unreachable)"
      );
      
      navigate("/login");
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login again.");
      return navigate("/login");
    }

    try {
      setIsLoading(true);
      const updatedProfile = await updateMyProfile(formData, token);
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex justify-between items-end">
              <div className="flex items-end">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-md">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="rounded-full h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="ml-6 mb-2">
                  <h1 className="text-4xl font-extrabold text-gray-900">
                    {profile?.user?.username || "No Username"}
                  </h1>
                  {profile?.title && (
                    <p className="text-gray-600">{profile.title}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <span>Logout</span>
              </button>
            </div>

            {/* Social Links */}
            {(profile?.github || profile?.linkedin || profile?.website) && (
              <div className="mt-4 flex space-x-4">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: "Bio", name: "bio", type: "textarea", icon: null },
                    {
                      label: "Skills",
                      name: "skills",
                      type: "input",
                      placeholder: "JavaScript, React, Node.js",
                      icon: null,
                    },
                    {
                      label: "GitHub URL",
                      name: "github",
                      type: "url",
                      icon: <Github className="h-5 w-5 text-gray-400" />,
                    },
                    {
                      label: "LinkedIn URL",
                      name: "linkedin",
                      type: "url",
                      icon: <Linkedin className="h-5 w-5 text-gray-400" />,
                    },
                    {
                      label: "Website",
                      name: "website",
                      type: "url",
                      icon: <Globe className="h-5 w-5 text-gray-400" />,
                    },
                    {
                      label: "Location",
                      name: "location",
                      type: "text",
                      icon: <MapPin className="h-5 w-5 text-gray-400" />,
                    },
                  ].map(({ label, name, type, placeholder, icon }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {label}
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        {icon && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                          </div>
                        )}
                        {type === "textarea" ? (
                          <textarea
                            id={name}
                            name={name}
                            rows={4}
                            value={formData[name]}
                            onChange={handleChange}
                            className={`block w-full ${
                              icon ? "pl-10" : "pl-3"
                            } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        ) : (
                          <input
                            id={name}
                            name={name}
                            type={type}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`block w-full ${
                              icon ? "pl-10" : "pl-3"
                            } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  About
                </h2>
                {profile?.bio ? (
                  <p className="text-gray-700 whitespace-pre-line">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No bio added yet</p>
                )}

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Skills
                  </h2>
                  {profile?.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No skills added yet</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Details
              </h2>
              <div className="space-y-4">
                {profile?.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{profile.location}</p>
                    </div>
                  </div>
                )}
                {profile?.github && (
                  <div className="flex items-start">
                    <Github className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">GitHub</p>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.github.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
                {profile?.linkedin && (
                  <div className="flex items-start">
                    <Linkedin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.linkedin.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
                {profile?.website && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

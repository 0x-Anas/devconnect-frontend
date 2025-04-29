import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../api/profile'; // Adjust this path based on your actual file structure
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    website: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile(token);
        setProfile(profileData);
        setFormData({
          bio: profileData.bio || '',
          skills: profileData.skills?.join(', ') || '',
          github: profileData.github || '',
          linkedin: profileData.linkedin || '',
          website: profileData.website || '',
          location: profileData.location || '',
        });
      } catch (err) {
        toast.error('Failed to load profile',err);
        navigate('/login'); // Redirect to login if not authenticated
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateMyProfile(formData, token);
      setProfile(updatedProfile); // Update state with the new profile
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile',err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-gray-700">Skills</label>
            <input
              id="skills"
              name="skills"
              type="text"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Github */}
          <div>
            <label htmlFor="github" className="block text-gray-700">GitHub</label>
            <input
              id="github"
              name="github"
              type="url"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedin" className="block text-gray-700">LinkedIn</label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-gray-700">Website</label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

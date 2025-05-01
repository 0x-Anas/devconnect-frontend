import React, { useState, useEffect } from 'react';
import { updateMyProfile, getMyProfile } from '../api/profile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile=()=>{
    const[profile,setProfile]=useState(null)
    const[formData,setFormData]=useState({
        bio: '',
    skills: '',
    github: '',
    linkedin: '',
    website: '',
    location: '',
    })
const [isLoading, setIsLoading] = useState(true);
   const  navigate=useNavigate();

    useEffect(()=>{
        const fetchProfile=async()=>{
            const token=localStorage.getItem('token')|| sessionStorage.getItem('token');

            if(!token){
                toast.error('please login to view your profile')
                navigate('/')
              }
       try{
        const profileData=await getMyProfile(token);
        setProfile(profileData);
        setFormData({
            bio:profileData.bio || '',
            skills: profileData.skills?.join(', ') || '',
          github: profileData.github || '',
          linkedin: profileData.linkedin || '',
          website: profileData.website || '',
          location: profileData.location || '',
        });
       }catch(err){
        if(err.response?.status===401){
            toast.error('session expired please log in')
            localStorage.removeItem('token')
            sessionStorage.removeItem('token');
            return navigate('/login')
        }else{
            toast.error('failed to load profile')
            console.error(err);
        }
       }finally{
        setIsLoading(false)
       }
        }
        fetchProfile();
    },[navigate]);

    const handleChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }));
    };
 const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      toast.error('Please login again.');
      return navigate('/login');
    }

    try {
      const updatedProfile = await updateMyProfile(formData, token);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      {profile && (
        <p className="text-center text-gray-600 mb-4">
          Welcome, {profile.name}
        </p>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Bio', name: 'bio', type: 'textarea' },
            { label: 'Skills', name: 'skills', type: 'input', placeholder: 'e.g., JavaScript, React' },
            { label: 'GitHub', name: 'github', type: 'url' },
            { label: 'LinkedIn', name: 'linkedin', type: 'url' },
            { label: 'Website', name: 'website', type: 'url' },
            { label: 'Location', name: 'location', type: 'text' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-gray-700">
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

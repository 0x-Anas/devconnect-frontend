// src/api/profile.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Get current user's profile
export const getMyProfile = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update current user's profile
export const updateMyProfile = async (profileData, token) => {
  const res = await axios.post(`${API_BASE_URL}/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

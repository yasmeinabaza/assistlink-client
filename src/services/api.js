import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//////////////////////////////////////////////////
// AUTH SERVICES


// Signup
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

/////////////////////////////////////////////////////
// USER SERVICES


// Get all users (admin only)
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get patients
export const getPatients = async () => {
  try {
    const response = await api.get('/users/patients');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Update user (admin only)
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

/////////////////////////////////////////////////////
// REQUEST SERVICES


// Get all requests
export const getRequests = async () => {
  try {
    const response = await api.get('/requests');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get requests by patient ID
export const getRequestsByPatient = async (patientId) => {
  try {
    const response = await api.get(`/requests/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get request by ID
export const getRequestById = async (id) => {
  try {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Create request
export const createRequest = async (requestData) => {
  try {
    const response = await api.post('/requests', requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Update request status (care center only)
export const updateRequestStatus = async (id, statusData) => {
  try {
    const response = await api.put(`/requests/${id}/status`, statusData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Add measurements to request
export const addMeasurements = async (id, measurements) => {
  try {
    const response = await api.post(`/requests/${id}/measurements`, measurements);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

/////////////////////////////////////////////////////
// CARE CENTER SERVICES

// Get all care centers
export const getCareCenters = async () => {
  try {
    const response = await api.get('/carecenters');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

///////////////////////////////////////////////////
// ENGINEER SERVICES

// Get all engineers
export const getEngineers = async () => {
  try {
    const response = await api.get('/engineers');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
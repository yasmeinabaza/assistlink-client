import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// AUTH SERVICES
// ============================================

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// ============================================
// USER SERVICES
// ============================================

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const getPatients = async () => {
  try {
    const response = await api.get('/users/patients');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// ============================================
// REQUEST SERVICES
// ============================================

export const getRequests = async () => {
  try {
    const response = await api.get('/requests');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const getRequestsByPatient = async (patientId) => {
  try {
    const response = await api.get(`/requests/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// ============================================
//Get requests by engineer
// ============================================
export const getRequestsByEngineer = async (engineerId) => {
  try {
    const response = await api.get(`/requests/engineer/${engineerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const getRequestById = async (id) => {
  try {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await api.post('/requests', requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const updateRequestStatus = async (id, statusData) => {
  try {
    const response = await api.put(`/requests/${id}/status`, statusData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const addMeasurements = async (id, measurements) => {
  try {
    const response = await api.post(`/requests/${id}/measurements`, measurements);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

////////////////////////////////////////////////////////
// CARE CENTER SERVICES

export const getCareCenters = async () => {
  try {
    const response = await api.get('/carecenters');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

//Create care center
export const createCareCenter = async (centerData) => {
  try {
    const response = await api.post('/carecenters', centerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

//Delete care center
export const deleteCareCenter = async (id) => {
  try {
    const response = await api.delete(`/carecenters/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

//////////////////////////////////////////////////////
// ENGINEER SERVICES

export const getEngineers = async () => {
  try {
    const response = await api.get('/engineers');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

//Create engineer
export const createEngineer = async (engineerData) => {
  try {
    const response = await api.post('/engineers', engineerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

//Update engineer
export const updateEngineer = async (id, engineerData) => {
  try {
    const response = await api.put(`/engineers/${id}`, engineerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};


//Delete engineer
export const deleteEngineer = async (id) => {
  try {
    const response = await api.delete(`/engineers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};


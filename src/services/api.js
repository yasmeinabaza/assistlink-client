import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

////////////////////////////////////////////////////////
// AUTH SERVICES

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

////////////////////////////////////////////////////////
// USER SERVICES

// GET all users - sends x-role header
export const getUsers = async () => {
  try {
    // Get user from localStorage
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.get('/users', {
      headers: {
        'x-role': userData.role || 'user'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// GET patients
export const getPatients = async () => {
  try {
    const response = await api.get('/users/patients');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// GET user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// DELETE user - sends x-role header
export const deleteUser = async (id) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.delete(`/users/${id}`, {
      headers: {
        'x-role': userData.role || 'user' 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// UPDATE user - sends x-role header
export const updateUser = async (id, userData) => {
  try {
    const savedUser = localStorage.getItem('user');
    const adminData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.put(`/users/${id}`, userData, {
      headers: {
        'x-role': adminData.role || 'user' 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

////////////////////////////////////////////////////////
// REQUEST SERVICES

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

// UPDATE request status - sends x-role header (like course demo)
export const updateRequestStatus = async (id, statusData) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.put(`/requests/${id}/status`, statusData, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
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

// CREATE care center - sends x-role header (like course demo)
export const createCareCenter = async (centerData) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.post('/carecenters', centerData, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// DELETE care center - sends x-role header (like course demo)
export const deleteCareCenter = async (id) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.delete(`/carecenters/${id}`, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

////////////////////////////////////////////////////////
// ENGINEER SERVICES

export const getEngineers = async () => {
  try {
    const response = await api.get('/engineers');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// CREATE engineer - sends x-role header (like course demo)
export const createEngineer = async (engineerData) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.post('/engineers', engineerData, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// UPDATE engineer - sends x-role header (like course demo)
export const updateEngineer = async (id, engineerData) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.put(`/engineers/${id}`, engineerData, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// DELETE engineer - sends x-role header (like course demo)
export const deleteEngineer = async (id) => {
  try {
    const savedUser = localStorage.getItem('user');
    const userData = savedUser ? JSON.parse(savedUser) : {};
    
    const response = await api.delete(`/engineers/${id}`, {
      headers: {
        'x-role': userData.role || 'user'  // ← Like course demo
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};


////////////////////////////////////////////////////////
// ACCESSGUDID API

export const searchDevices = async (searchTerm) => {
  try {
    // If no search term, return empty array or some default results
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }

    // Fetch a fixed number of devices (limit=50 for reasonable results)
    const response = await axios.get(
      `https://accessgudid.nlm.nih.gov/api/v3/devices/implantable/list.json?limit=50`
    );
    
    const devices = response.data.devices || [];
    const search = searchTerm.toLowerCase().trim();
    
    // Simple filter on brand name and company name
    const filtered = devices.filter(device => {
      const brand = (device.brandName || '').toLowerCase();
      const company = (device.companyName || '').toLowerCase();
      return brand.includes(search) || company.includes(search);
    });
    
    return filtered.slice(0, 10); // Return max 10 results
    
  } catch (error) {
    console.error('AccessGUDID API error:', error);
    return []; // Return empty array on error
  }
};
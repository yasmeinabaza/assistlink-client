
// ============================================
// PATIENT REQUESTS
// ============================================
export const dummyRequests = [
  {
    id: 1,
    requestNumber: 'REQ-1042',
    deviceType: 'Prosthetic Limb',
    reason: 'New Device',
    status: 'In Progress',
    submittedDate: '2025-03-12',
    notes: 'Lost right leg below knee in December 2024.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    patientName: 'Sarah Johnson',
    patientId: 1
  },
  {
    id: 2,
    requestNumber: 'REQ-0987',
    deviceType: 'Orthotic Device',
    reason: 'Replacement',
    status: 'Delivered',
    submittedDate: '2024-11-08',
    notes: 'Foot drop following ischemic stroke.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    patientName: 'Sarah Johnson',
    patientId: 1
  },
  {
    id: 3,
    requestNumber: 'REQ-1038',
    deviceType: 'Prosthetic Limb',
    reason: 'New Device',
    status: 'Under Review',
    submittedDate: '2025-04-10',
    notes: 'Congenital limb difference. Right-hand dominant.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '5 Jacaranda Close, Nairobi 00200',
    patientName: 'Michael Tran',
    patientId: 2
  },
  {
    id: 4,
    requestNumber: 'REQ-1031',
    deviceType: 'Orthotic Device',
    reason: 'New Device',
    status: 'Approved',
    submittedDate: '2025-04-02',
    notes: 'Foot drop following stroke.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '32 Kiambu Road, Nairobi 00600',
    patientName: 'Grace Wambui',
    patientId: 3
  },
  {
    id: 5,
    requestNumber: 'REQ-1050',
    deviceType: 'Prosthetic Limb',
    reason: 'New Device',
    status: 'Approved',
    submittedDate: '2025-04-15',
    notes: 'Lost left leg below knee in accident. Active lifestyle.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    patientName: 'Sarah Johnson',
    patientId: 1,
    measurements: null
  }
];

// ============================================
// CURRENT LOGGED IN USER (Patient View)
// ============================================
export const dummyUser = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+254 712 345 678',
  role: 'patient',
  careCenter: 'Metropolitan Rehab Center',
  careCenterLocation: 'Nairobi',
  careCenterPhone: '+254 20 123 4567',
  deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100',
  memberSince: '2025-01-10' 

};

// ============================================
// CARE CENTER STAFF
// ============================================
export const dummyCareCenterStaff = {
  id: 1,
  name: 'Dr. Amara Osei',
  role: 'care-center',
  careCenter: 'Metropolitan Rehab Center',
  careCenterLocation: 'Nairobi'
};

// ============================================
// PATIENTS LIST (For Care Center View)
// ============================================
export const dummyPatients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    dateOfBirth: '1985-03-14',
    email: 'sarah.johnson@email.com',
    phone: '+254 712 345 678',
    address: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    registeredDate: '2025-01-10'
  },
  {
    id: 2,
    name: 'Michael Tran',
    dateOfBirth: '1992-07-20',
    email: 'm.tran@email.com',
    phone: '+254 723 456 789',
    address: '5 Jacaranda Close, Nairobi 00200',
    registeredDate: '2025-04-01'
  },
  {
    id: 3,
    name: 'Grace Wambui',
    dateOfBirth: '1978-11-02',
    email: 'g.wambui@email.com',
    phone: '+254 734 567 890',
    address: '32 Kiambu Road, Nairobi 00600',
    registeredDate: '2025-03-15'
  }
];

// ============================================
// ENGINEERS (For Assignment)
// ============================================
export const dummyEngineers = [
  { id: 1, name: 'John Kamau', specialization: 'Prosthetics', status: 'active' },
  { id: 2, name: 'Mary Akinyi', specialization: 'Orthotics', status: 'active' },
  { id: 3, name: 'Peter Ochieng', specialization: 'General', status: 'active' },
  { id: 4, name: 'James Okafor', specialization: 'Prosthetics', status: 'active' },
  { id: 5, name: 'Elena Petrov', specialization: 'Orthotics', status: 'inactive' }
];

// ============================================
// CURRENT LOGGED IN ENGINEER
// ============================================
export const dummyEngineer = {
  id: 1,
  name: 'John Kamau',
  specialization: 'Prosthetics',
  email: 'john.kamau@assistlink.com',
  phone: '+254 712 345 678'
};

// ============================================
// ENGINEER CASES
// ============================================
export const dummyEngineerCases = [
  {
    id: 1,
    requestNumber: 'REQ-1042',
    deviceType: 'Prosthetic Limb',
    status: 'In Progress',
    submittedDate: '2025-03-12',
    patientName: 'Sarah Johnson',
    patientId: 1,
    careCenter: 'Metropolitan Rehab Center',
    notes: 'Lost right leg below knee in December 2024. Active lifestyle, prefer lightweight device.',
    measurements: {
      height: 165,
      weight: 72,
      limbLength: 45,
      circumference: 38,
      additionalNotes: 'Patient prefers lightweight materials'
    },
    assignedDate: '2025-03-15',
    engineer: 'John Kamau'
  },
  {
    id: 2,
    requestNumber: 'REQ-1031',
    deviceType: 'Orthotic Device',
    status: 'Approved',
    submittedDate: '2025-04-02',
    patientName: 'Grace Wambui',
    patientId: 3,
    careCenter: 'Metropolitan Rehab Center',
    notes: 'Foot drop following stroke. Requires AFO for daily mobility.',
    measurements: {
      height: 160,
      weight: 68,
      limbLength: 40,
      circumference: 32,
      additionalNotes: ''
    },
    assignedDate: '2025-04-05',
    engineer: 'John Kamau'
  },
  {
    id: 3,
    requestNumber: 'REQ-1038',
    deviceType: 'Prosthetic Limb',
    status: 'Delivered',
    submittedDate: '2025-04-10',
    patientName: 'Michael Tran',
    patientId: 2,
    careCenter: 'Metropolitan Rehab Center',
    notes: 'Congenital limb difference. Right-hand dominant. Functional grip and ease of attachment are priorities.',
    measurements: {
      height: 175,
      weight: 80,
      limbLength: 50,
      circumference: 42,
      additionalNotes: 'Right arm, below elbow'
    },
    assignedDate: '2025-04-12',
    engineer: 'John Kamau',
    deliveredDate: '2025-04-20'
  }
];

// ============================================
// ADMIN
// ============================================
export const dummyAdmin = {
  id: 1,
  name: 'Admin User',
  email: 'admin@assistlink.com',
  role: 'admin',
  phone: '+254 700 000 000'
};

// ============================================
// ALL USERS IN THE SYSTEM
// ============================================
export const dummyUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+254 712 345 678',
    role: 'patient',
    status: 'active',
    registeredDate: '2025-01-10',
    careCenter: 'Metropolitan Rehab Center'
  },
  {
    id: 2,
    name: 'Michael Tran',
    email: 'm.tran@email.com',
    phone: '+254 723 456 789',
    role: 'patient',
    status: 'active',
    registeredDate: '2025-04-01',
    careCenter: 'Metropolitan Rehab Center'
  },
  {
    id: 3,
    name: 'Grace Wambui',
    email: 'g.wambui@email.com',
    phone: '+254 734 567 890',
    role: 'patient',
    status: 'active',
    registeredDate: '2025-03-15',
    careCenter: 'Metropolitan Rehab Center'
  },
  {
    id: 4,
    name: 'Dr. Amara Osei',
    email: 'amara.osei@assistlink.com',
    phone: '+254 745 678 901',
    role: 'care-center',
    status: 'active',
    registeredDate: '2024-12-01',
    careCenter: 'Metropolitan Rehab Center'
  },
  {
    id: 5,
    name: 'Dr. Fatima Al-Hassan',
    email: 'fatima.alhassan@assistlink.com',
    phone: '+254 756 789 012',
    role: 'care-center',
    status: 'active',
    registeredDate: '2024-11-15',
    careCenter: 'City Orthopedic Clinic'
  },
  {
    id: 6,
    name: 'James Okafor',
    email: 'james.okafor@assistlink.com',
    phone: '+254 767 890 123',
    role: 'engineer',
    status: 'active',
    registeredDate: '2024-10-20',
    specialization: 'Prosthetics'
  },
  {
    id: 7,
    name: 'Elena Petrov',
    email: 'elena.petrov@assistlink.com',
    phone: '+254 778 901 234',
    role: 'engineer',
    status: 'inactive',
    registeredDate: '2024-09-01',
    specialization: 'Orthotics'
  },
  {
    id: 8,
    name: 'Admin User',
    email: 'admin@assistlink.com',
    phone: '+254 700 000 000',
    role: 'admin',
    status: 'active',
    registeredDate: '2024-08-01'
  }
];

// ============================================
// CARE CENTERS (For Admin Management)
// ============================================
export const dummyCareCenters = [
  {
    id: 1,
    name: 'Metropolitan Rehab Center',
    location: 'Nairobi',
    phone: '+254 20 123 4567',
    patients: 3,
    staff: 2
  },
  {
    id: 2,
    name: 'City Orthopedic Clinic',
    location: 'Nairobi',
    phone: '+254 20 234 5678',
    patients: 0,
    staff: 1
  },
  {
    id: 3,
    name: 'National Prosthetics Institute',
    location: 'Mombasa',
    phone: '+254 41 345 6789',
    patients: 0,
    staff: 0
  },
  {
    id: 4,
    name: "St. Luke's Rehabilitation",
    location: 'Kisumu',
    phone: '+254 57 456 7890',
    patients: 0,
    staff: 0
  }
];
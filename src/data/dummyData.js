// Temporary dummy data (will be replaced by backend later)

// Patient requests
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
    status: 'Approved',  // ← This one is approved, needs measurements
    submittedDate: '2025-04-15',
    notes: 'Lost left leg below knee in accident. Active lifestyle.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    patientName: 'Sarah Johnson',
    patientId: 1,
    measurements: null  // No measurements yet
    }
];

// Current logged in user (patient view)
export const dummyUser = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+254 712 345 678',
  role: 'patient',
  careCenter: 'Metropolitan Rehab Center',
  careCenterLocation: 'Nairobi',
  careCenterPhone: '+254 20 123 4567',
  deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100'
};

// Care center staff (for care center view)
export const dummyCareCenterStaff = {
  id: 1,
  name: 'Dr. Amara Osei',
  role: 'care-center',
  careCenter: 'Metropolitan Rehab Center',
  careCenterLocation: 'Nairobi'
};

// Patients list (for care center view)
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

// Engineers list for assignment
export const dummyEngineers = [
  { id: 1, name: 'John Kamau', specialization: 'Prosthetics' },
  { id: 2, name: 'Mary Akinyi', specialization: 'Orthotics' },
  { id: 3, name: 'Peter Ochieng', specialization: 'General' }
];
// Temporary dummy data (will be replaced by backend later)

export const dummyRequests = [
  {
    id: 1,
    requestNumber: 'REQ-1042',
    deviceType: 'Prosthetic Limb',
    reason: 'New Device',
    status: 'Submitted',
    submittedDate: '2025-03-12',
    notes: 'Lost right leg below knee in December 2024.',
    careCenter: 'Metropolitan Rehab Center',
    careCenterLocation: 'Nairobi',
    careCenterPhone: '+254 20 123 4567',
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100'
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
    deliveryAddress: '14 Maple Avenue, Apt 2B, Nairobi 00100'
  }
];

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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyRequests, dummyPatients, dummyCareCenterStaff } from '../../data/dummyData';
import StatusBadge from '../../components/StatusBadge';

function CareCenterDashboard() {
  const [viewMode, setViewMode] = useState('requests'); // 'requests' or 'patients'
  
  const staff = dummyCareCenterStaff;
  const patients = dummyPatients;
  const requests = dummyRequests;

  // counts
  const totalPatients = patients.length;
  const totalRequests = requests.length;
  
  // Count pending requests (status is Submitted or Under Review)
  const pendingRequests = requests.filter(
    r => r.status === 'Submitted' || r.status === 'Under Review'
  ).length;

  // Count active requests (status is not Delivered or Rejected)
  const activeRequests = requests.filter(
    r => r.status !== 'Delivered' && r.status !== 'Rejected'
  ).length;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">{staff.careCenter}</h2>
          <p className="text-muted">
            {totalPatients} patients · {totalRequests} requests
          </p>
        </div>
        <div className="text-end">
          <span className="badge bg-success p-2">Care Center Staff</span>
          <div className="small text-muted">{staff.name}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">{totalPatients}</h5>
              <p className="card-text small">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">{pendingRequests}</h5>
              <p className="card-text small">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">{activeRequests}</h5>
              <p className="card-text small">Active Requests</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">{totalRequests}</h5>
              <p className="card-text small">Total Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={`btn ${viewMode === 'requests' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('requests')}
        >
          Requests
        </button>
        <button 
          className={`btn ${viewMode === 'patients' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('patients')}
        >
          My Patients
        </button>
      </div>

      {/* Requests View */}
      {viewMode === 'requests' && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title fw-bold">All Requests</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Patient</th>
                    <th>Device Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.requestNumber}</td>
                            <td>{request.patientName}</td>
                            <td>{request.deviceType}</td>
                            <td>{request.submittedDate}</td>
                            <td><StatusBadge status={request.status} /></td>
                            <td>
                                <Link to={`/care-center/request/${request.id}`} className="btn btn-sm btn-outline-primary">
                                 Review
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Patients View */}
      {viewMode === 'patients' && (
        <div>
          <h5 className="fw-bold mb-3">My Patients</h5>
          {patients.map(patient => (
            <div key={patient.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h6 className="fw-bold mb-1">{patient.name}</h6>
                    <div className="small text-muted">
                      <div>DOB: {patient.dateOfBirth}</div>
                      <div>{patient.email}</div>
                      <div>{patient.phone}</div>
                      <div>{patient.address}</div>
                    </div>
                  </div>
                  <div className="col-md-4 text-md-end">
                    <Link 
                      to={`/care-center/patient/${patient.id}`} 
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareCenterDashboard;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyEngineer, dummyEngineerCases } from '../../data/dummyData';
import StatusBadge from '../../components/StatusBadge';

function EngineerDashboard() {
  const [filter, setFilter] = useState('all'); // 'all', 'in-progress', 'pending', 'delivered'
  
  const engineer = dummyEngineer;
  const cases = dummyEngineerCases;

  // Filter cases
  const filteredCases = cases.filter(caseItem => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') return caseItem.status === 'In Progress';
    if (filter === 'pending') return caseItem.status === 'Approved';
    if (filter === 'delivered') return caseItem.status === 'Delivered';
    return true;
  });

  // Count stats
  const totalCases = cases.length;
  const inProgress = cases.filter(c => c.status === 'In Progress').length;
  const pending = cases.filter(c => c.status === 'Approved').length;
  const delivered = cases.filter(c => c.status === 'Delivered').length;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">My Cases</h2>
          <p className="text-muted">Welcome back, {engineer.name}</p>
        </div>
        <div className="text-end">
          <span className="badge bg-info p-2">{engineer.specialization}</span>
          <div className="small text-muted">{engineer.email}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">{totalCases}</h5>
              <p className="card-text small">Total Cases</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">{pending}</h5>
              <p className="card-text small">Pending Start</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <h5 className="card-title">{inProgress}</h5>
              <p className="card-text small">In Progress</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">{delivered}</h5>
              <p className="card-text small">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="btn-group mb-4" role="group">
        <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>
          All Cases
        </button>
        <button className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('pending')}>
          Pending
        </button>
        <button className={`btn ${filter === 'in-progress' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('in-progress')}>
          In Progress
        </button>
        <button className={`btn ${filter === 'delivered' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('delivered')}>
          Delivered
        </button>
      </div>

      {/* Cases List */}
      {filteredCases.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No cases found in this category.</p>
        </div>
      ) : (
        filteredCases.map(caseItem => (
          <div key={caseItem.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="fw-bold mb-1">
                    {caseItem.requestNumber}
                    <span className="ms-2">
                      <StatusBadge status={caseItem.status} />
                    </span>
                  </h6>
                  <p className="fw-semibold mb-1">{caseItem.deviceType}</p>
                  <p className="small text-muted mb-1">
                    Patient: {caseItem.patientName}
                  </p>
                  <p className="small text-muted mb-1">
                    Submitted: {caseItem.submittedDate}
                  </p>
                  {caseItem.assignedDate && (
                    <p className="small text-muted mb-1">
                      Assigned: {caseItem.assignedDate}
                    </p>
                  )}
                  {caseItem.deliveredDate && (
                    <p className="small text-muted mb-1">
                      Delivered: {caseItem.deliveredDate}
                    </p>
                  )}
                </div>
                <Link to={`/engineer/case/${caseItem.id}`} className="btn btn-outline-primary btn-sm">
                  View Case
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EngineerDashboard;
import { Link } from 'react-router-dom';
import { dummyRequests, dummyUser } from '../../data/dummyData';

function PatientDashboard() {
  const requests = dummyRequests;
  const user = dummyUser;

  return (
    <div className="container py-4">
      <div className="row">
        {/* Main content - left side */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>My Requests</h2>
              <p className="text-muted">Welcome back, {user.name.split(' ')[0]}.</p>
            </div>
            <Link to="/patient/request/new" className="btn btn-success">
              + New Request
            </Link>
          </div>
          
          {requests.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">You haven't submitted any requests yet.</p>
              <Link to="/patient/request/new" className="btn btn-primary">
                Create Your First Request
              </Link>
            </div>
          ) : (
            requests.map(request => (
              <div key={request.id} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title fw-bold">{request.requestNumber}</h5>
                      <h6 className="card-subtitle text-muted">{request.deviceType}</h6>
                    </div>
                    <span className="badge bg-secondary px-3 py-2">
                      {request.status}
                    </span>
                  </div>
                  
                  <p className="card-text small text-muted">
                    Submitted: {request.submittedDate}
                  </p>
                  
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Status: {request.status}</span>
                    <Link to={`/patient/request/${request.id}`} className="btn btn-outline-primary btn-sm">
                      View Request
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Sidebar - right side */}
        <div className="col-lg-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold">My Care Center</h6>
              <p className="mb-0 fw-semibold">{user.careCenter}</p>
              <p className="text-muted small mb-1">{user.careCenterLocation}</p>
              <p className="text-muted small">{user.careCenterPhone}</p>
            </div>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title fw-bold">Delivery Address</h6>
              <p className="text-muted small mb-0">{user.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
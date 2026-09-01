import { Link, useParams } from 'react-router-dom';
import { dummyRequests } from '../../data/dummyData';

function RequestDetails() {
  const { id } = useParams();
  const requestId = parseInt(id);
  const request = dummyRequests.find(r => r.id === requestId);

  if (!request) {
    return (
      <div className="container py-5 text-center">
        <h4>Request not found</h4>
        <Link to="/patient" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/patient" className="btn btn-outline-secondary btn-sm mb-3">← Back to Dashboard</Link>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">{request.requestNumber}</h3>
        <span className="badge bg-secondary px-3 py-2">{request.status}</span>
      </div>
      
      <p className="text-muted">Submitted: {request.submittedDate}</p>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold">Request Information</h6>
              <p className="small mb-1"><strong>Device Type:</strong> {request.deviceType}</p>
              <p className="small mb-1"><strong>Reason:</strong> {request.reason}</p>
              <p className="small mb-1"><strong>Care Center:</strong> {request.careCenter}</p>
              <p className="small mb-0"><strong>Status:</strong> {request.status}</p>
            </div>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Your Notes</h6>
              <p className="small text-muted mb-0">{request.notes}</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Delivery Address</h6>
              <p className="small text-muted mb-0">{request.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummyRequests } from '../../data/dummyData';
import StatusBadge from '../../components/StatusBadge';
import MeasurementsForm from '../../components/MeasurementsForm';

function RequestDetails() {
  const { id } = useParams();
  const requestId = parseInt(id);
  const [request, setRequest] = useState(
    dummyRequests.find(r => r.id === requestId)
  );
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measurementsSubmitted, setMeasurementsSubmitted] = useState(
    request?.measurements !== null && request?.measurements !== undefined
  );

  // Status order for progress
  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];
  const currentStep = request ? statusOrder.indexOf(request.status) + 1 : 0;
  const totalSteps = statusOrder.length;
  const progressPercent = (currentStep / totalSteps) * 100;

  // Handle measurements submit
  const handleMeasurementsSubmit = (measurementsData) => {
    // In the future: send to API
    console.log('Measurements submitted:', measurementsData);
    
    // Update local state
    setRequest(prev => ({
      ...prev,
      measurements: measurementsData,
      status: 'In Progress' // Status changes to In Progress
    }));
    
    setMeasurementsSubmitted(true);
    setShowMeasurements(false);
    alert('Measurements submitted successfully! Your request is now in progress.');
  };

  // Check if request not found
  if (!request) {
    return (
      <div className="container py-5 text-center">
        <h4>Request not found</h4>
        <Link to="/patient" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  // Status message
  const getStatusMessage = () => {
    switch(request.status) {
      case 'Submitted':
        return 'Your request has been submitted and is waiting for review.';
      case 'Under Review':
        return 'Your request is currently being reviewed by the care center.';
      case 'Approved':
        return 'Your request has been approved! Please provide your measurements.';
      case 'In Progress':
        return 'An engineer is currently working on your device.';
      case 'Delivered':
        return 'Your device has been delivered!';
      default:
        return 'Status update pending.';
    }
  };

  return (
    <div className="container py-4">
      <Link to="/patient" className="btn btn-outline-secondary btn-sm mb-3">
        ← Back to Dashboard
      </Link>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">{request.requestNumber}</h3>
        <StatusBadge status={request.status} />
      </div>
      
      <p className="text-muted">Submitted: {request.submittedDate}</p>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Progress */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold">Progress</h6>
              <div className="progress mb-2" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="d-flex justify-content-between small text-muted">
                {statusOrder.map((status, index) => (
                  <span key={status}>
                    {index + 1}. {status}
                  </span>
                ))}
              </div>
              <div className="alert alert-info mt-3 mb-0">
                <small>{getStatusMessage()}</small>
              </div>
            </div>
          </div>

          {/* Measurements Section - Show if approved and not yet submitted */}
          {request.status === 'Approved' && !measurementsSubmitted && (
            <div>
              {!showMeasurements ? (
                <div className="card shadow-sm mb-4">
                  <div className="card-body text-center">
                    <h6 className="fw-bold">Ready for Measurements</h6>
                    <p className="text-muted small">
                      Your request has been approved. Please provide your measurements.
                    </p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowMeasurements(true)}
                    >
                      Add Measurements
                    </button>
                  </div>
                </div>
              ) : (
                <MeasurementsForm 
                  onSubmit={handleMeasurementsSubmit}
                  onCancel={() => setShowMeasurements(false)}
                />
              )}
            </div>
          )}

          {/* Show measurements if already submitted */}
          {measurementsSubmitted && request.measurements && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h6 className="fw-bold text-success">✓ Measurements Submitted</h6>
                <div className="row small">
                  <div className="col-md-4">
                    <strong>Height:</strong> {request.measurements.height} cm
                  </div>
                  <div className="col-md-4">
                    <strong>Weight:</strong> {request.measurements.weight} kg
                  </div>
                  <div className="col-md-4">
                    <strong>Limb Length:</strong> {request.measurements.limbLength} cm
                  </div>
                  <div className="col-md-4">
                    <strong>Circumference:</strong> {request.measurements.circumference} cm
                  </div>
                  {request.measurements.additionalNotes && (
                    <div className="col-12 mt-2">
                      <strong>Notes:</strong> {request.measurements.additionalNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Request Details */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Request Information</h6>
              <p className="small mb-1"><strong>Device Type:</strong> {request.deviceType}</p>
              <p className="small mb-1"><strong>Reason:</strong> {request.reason}</p>
              <p className="small mb-1"><strong>Care Center:</strong> {request.careCenter}</p>
              <p className="small mb-0"><strong>Your Notes:</strong> {request.notes}</p>
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
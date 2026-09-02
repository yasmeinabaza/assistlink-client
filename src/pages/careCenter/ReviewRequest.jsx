// import { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { dummyRequests, dummyEngineers } from '../../data/dummyData';
// import StatusBadge from '../../components/StatusBadge';

// function ReviewRequest() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const requestId = parseInt(id);
  
//   // Find request
//   const request = dummyRequests.find(r => r.id === requestId);

//   // State for engineer assignment
//   const [selectedEngineer, setSelectedEngineer] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Handle approve
//   const handleApprove = () => {
//     if (!selectedEngineer) {
//       alert('Please select an engineer before approving.');
//       return;
//     }
    
//     setIsProcessing(true);
//     // For now, before using API
//     setTimeout(() => {
//       alert(`Request ${request.requestNumber} approved! Assigned to: ${selectedEngineer}`);
//       setIsProcessing(false);
//       navigate('/care-center');
//     }, 500);
//   };

//   // Handle reject
//   const handleReject = () => {
//     if (window.confirm(`Are you sure you want to reject request ${request.requestNumber}?`)) {
//       setIsProcessing(true);
//       setTimeout(() => {
//         alert(`Request ${request.requestNumber} rejected.`);
//         setIsProcessing(false);
//         navigate('/care-center');
//       }, 500);
//     }
//   };

//   // If request not found
//   if (!request) {
//     return (
//       <div className="container py-5 text-center">
//         <h4>Request not found</h4>
//         <Link to="/care-center" className="btn btn-primary">Back to Dashboard</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Back button */}
//       <Link to="/care-center" className="btn btn-outline-secondary btn-sm mb-3">
//         ← Back to Dashboard
//       </Link>

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-start mb-3">
//         <div>
//           <h3 className="fw-bold">{request.requestNumber}</h3>
//           <StatusBadge status={request.status} />
//           <p className="text-muted mt-1">Submitted: {request.submittedDate}</p>
//         </div>
//       </div>

//       <div className="row">
//         {/* Main content - left side */}
//         <div className="col-lg-8">
//           {/* Patient Information */}
//           <div className="card shadow-sm mb-4">
//             <div className="card-body">
//               <h6 className="fw-bold">Patient Information</h6>
//               <div className="row">
//                 <div className="col-md-6">
//                   <p className="small mb-1"><strong>Patient Name:</strong> {request.patientName}</p>
//                   <p className="small mb-1"><strong>Device Type:</strong> {request.deviceType}</p>
//                   <p className="small mb-1"><strong>Reason:</strong> {request.reason}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <p className="small mb-1"><strong>Care Center:</strong> {request.careCenter}</p>
//                   <p className="small mb-1"><strong>Submitted:</strong> {request.submittedDate}</p>
//                   <p className="small mb-0"><strong>Current Status:</strong> {request.status}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Patient Notes */}
//           <div className="card shadow-sm mb-4">
//             <div className="card-body">
//               <h6 className="fw-bold">Patient Notes</h6>
//               <p className="small text-muted mb-0">{request.notes}</p>
//             </div>
//           </div>

//           {/* Delivery Address */}
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h6 className="fw-bold">Delivery Address</h6>
//               <p className="small text-muted mb-0">{request.deliveryAddress}</p>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar - right side */}
//         <div className="col-lg-4">
//           {/* Assign Engineer */}
//           <div className="card shadow-sm mb-3">
//             <div className="card-body">
//               <h6 className="fw-bold">Assign Engineer</h6>
//               <p className="small text-muted">Select an engineer for this request.</p>
//               <select
//                 className="form-select mb-3"
//                 value={selectedEngineer}
//                 onChange={(e) => setSelectedEngineer(e.target.value)}
//               >
//                 <option value="">Select engineer...</option>
//                 {dummyEngineers.map(engineer => (
//                   <option key={engineer.id} value={engineer.name}>
//                     {engineer.name} - {engineer.specialization}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h6 className="fw-bold">Actions</h6>
//               <button
//                 className="btn btn-success w-100 mb-2"
//                 onClick={handleApprove}
//                 disabled={isProcessing || !selectedEngineer}
//               >
//                 {isProcessing ? 'Processing...' : 'Approve Request'}
//               </button>
//               <button
//                 className="btn btn-danger w-100"
//                 onClick={handleReject}
//                 disabled={isProcessing}
//               >
//                 {isProcessing ? 'Processing...' : 'Reject Request'}
//               </button>
//               {!selectedEngineer && (
//                 <p className="text-warning small mt-2 mb-0">
//                   Please select an engineer before approving.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewRequest;


import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyRequests, dummyCareCenterStaff, dummyEngineers } from '../../data/dummyData';
import './ReviewRequest.css';

function ReviewRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const requestId = parseInt(id);
  const request = dummyRequests.find(r => r.id === requestId);
  const staff = dummyCareCenterStaff;

  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!request) {
    return (
      <Layout userRole="Care Center" userName={staff.name} userEmail="amara.osei@assistlink.com">
        <div className="not-found">Request not found</div>
      </Layout>
    );
  }

  const handleApprove = () => {
    if (!selectedEngineer) {
      alert('Please select an engineer.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Request ${request.requestNumber} approved! Assigned to: ${selectedEngineer}`);
      setIsProcessing(false);
      navigate('/care-center');
    }, 500);
  };

  const handleReject = () => {
    if (window.confirm(`Reject request ${request.requestNumber}?`)) {
      setIsProcessing(true);
      setTimeout(() => {
        alert(`Request ${request.requestNumber} rejected.`);
        setIsProcessing(false);
        navigate('/care-center');
      }, 500);
    }
  };

  return (
    <Layout userRole="Care Center" userName={staff.name} userEmail="amara.osei@assistlink.com">
      <div className="review-request-page">
        <Link to="/care-center" className="back-link">← Back</Link>

        <div className="review-header">
          <h1>{request.requestNumber}</h1>
          <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
            {request.status}
          </span>
        </div>
        <p className="review-submitted">Submitted {request.submittedDate}</p>

        <div className="review-grid">
          <div className="review-main">
            <div className="info-card">
              <h3>Patient Information</h3>
              <div className="info-row"><strong>Patient Name:</strong> {request.patientName}</div>
              <div className="info-row"><strong>Device Type:</strong> {request.deviceType}</div>
              <div className="info-row"><strong>Reason:</strong> {request.reason}</div>
              <div className="info-row"><strong>Care Center:</strong> {request.careCenter}</div>
            </div>

            <div className="info-card">
              <h3>Patient Notes</h3>
              <p className="notes-text">{request.notes}</p>
            </div>

            <div className="info-card">
              <h3>Delivery Address</h3>
              <p className="address-text">{request.deliveryAddress}</p>
            </div>
          </div>

          <div className="review-sidebar">
            <div className="action-card">
              <h3>Assign Engineer</h3>
              <select
                className="engineer-select"
                value={selectedEngineer}
                onChange={(e) => setSelectedEngineer(e.target.value)}
              >
                <option value="">Select engineer...</option>
                {dummyEngineers.map(e => (
                  <option key={e.id} value={e.name}>{e.name} - {e.specialization}</option>
                ))}
              </select>

              <div className="action-buttons">
                <button 
                  className="btn-approve"
                  onClick={handleApprove}
                  disabled={isProcessing || !selectedEngineer}
                >
                  {isProcessing ? 'Processing...' : 'Approve Request'}
                </button>
                <button 
                  className="btn-reject"
                  onClick={handleReject}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Reject Request'}
                </button>
              </div>
              {!selectedEngineer && (
                <p className="warning-text">Please select an engineer before approving.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewRequest;
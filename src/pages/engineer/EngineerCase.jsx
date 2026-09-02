// import { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { dummyEngineerCases } from '../../data/dummyData';
// import StatusBadge from '../../components/StatusBadge';

// function EngineerCase() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const caseId = parseInt(id);
  
//   // Find the case
//   const caseItem = dummyEngineerCases.find(c => c.id === caseId);
  
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Handle status update to "In Progress"
//   const handleStartWork = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       alert(`Case ${caseItem.requestNumber} is now in progress.`);
//       setIsProcessing(false);
//       navigate('/engineer');
//     }, 500);
//   };

//   // Handle status update to "Delivered"
//   const handleDeliver = () => {
//     if (window.confirm(`Mark ${caseItem.requestNumber} as delivered?`)) {
//       setIsProcessing(true);
//       setTimeout(() => {
//         alert(`Case ${caseItem.requestNumber} marked as delivered!`);
//         setIsProcessing(false);
//         navigate('/engineer');
//       }, 500);
//     }
//   };

//   // If case not found
//   if (!caseItem) {
//     return (
//       <div className="container py-5 text-center">
//         <h4>Case not found</h4>
//         <Link to="/engineer" className="btn btn-primary">Back to Dashboard</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Back button */}
//       <Link to="/engineer" className="btn btn-outline-secondary btn-sm mb-3">
//         ← Back to Dashboard
//       </Link>

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-start mb-3">
//         <div>
//           <h3 className="fw-bold">{caseItem.requestNumber}</h3>
//           <StatusBadge status={caseItem.status} />
//           <p className="text-muted mt-1">Submitted: {caseItem.submittedDate}</p>
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
//                   <p className="small mb-1"><strong>Patient Name:</strong> {caseItem.patientName}</p>
//                   <p className="small mb-1"><strong>Device Type:</strong> {caseItem.deviceType}</p>
//                   <p className="small mb-1"><strong>Care Center:</strong> {caseItem.careCenter}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <p className="small mb-1"><strong>Status:</strong> {caseItem.status}</p>
//                   {caseItem.assignedDate && (
//                     <p className="small mb-1"><strong>Assigned:</strong> {caseItem.assignedDate}</p>
//                   )}
//                   {caseItem.deliveredDate && (
//                     <p className="small mb-0"><strong>Delivered:</strong> {caseItem.deliveredDate}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Patient Notes */}
//           <div className="card shadow-sm mb-4">
//             <div className="card-body">
//               <h6 className="fw-bold">Patient Notes</h6>
//               <p className="small text-muted mb-0">{caseItem.notes}</p>
//             </div>
//           </div>

//           {/* Measurements */}
//           {caseItem.measurements && (
//             <div className="card shadow-sm mb-4">
//               <div className="card-body">
//                 <h6 className="fw-bold">Measurements</h6>
//                 <div className="row">
//                   <div className="col-md-3">
//                     <p className="small mb-0"><strong>Height:</strong> {caseItem.measurements.height} cm</p>
//                   </div>
//                   <div className="col-md-3">
//                     <p className="small mb-0"><strong>Weight:</strong> {caseItem.measurements.weight} kg</p>
//                   </div>
//                   <div className="col-md-3">
//                     <p className="small mb-0"><strong>Limb Length:</strong> {caseItem.measurements.limbLength} cm</p>
//                   </div>
//                   <div className="col-md-3">
//                     <p className="small mb-0"><strong>Circumference:</strong> {caseItem.measurements.circumference} cm</p>
//                   </div>
//                 </div>
//                 {caseItem.measurements.additionalNotes && (
//                   <div className="mt-2">
//                     <p className="small mb-0"><strong>Additional Notes:</strong> {caseItem.measurements.additionalNotes}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar - right side */}
//         <div className="col-lg-4">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h6 className="fw-bold">Actions</h6>
              
//               {caseItem.status === 'Approved' && (
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={handleStartWork}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? 'Processing...' : 'Start Work'}
//                 </button>
//               )}

//               {caseItem.status === 'In Progress' && (
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={handleDeliver}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? 'Processing...' : 'Mark as Delivered'}
//                 </button>
//               )}

//               {caseItem.status === 'Delivered' && (
//                 <div className="alert alert-success mb-0">
//                   <small>✓ This case has been delivered.</small>
//                 </div>
//               )}

//               {caseItem.status === 'Submitted' || caseItem.status === 'Under Review' || caseItem.status === 'Rejected' && (
//                 <div className="alert alert-info mb-0">
//                   <small>This case is not yet assigned to you.</small>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EngineerCase;


import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyEngineer, dummyEngineerCases } from '../../data/dummyData';
import './EngineerCase.css';

function EngineerCase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseId = parseInt(id);
  const caseItem = dummyEngineerCases.find(c => c.id === caseId);
  const engineer = dummyEngineer;

  const [isProcessing, setIsProcessing] = useState(false);

  if (!caseItem) {
    return (
      <Layout userRole="Engineer" userName={engineer.name} userEmail={engineer.email}>
        <div className="not-found">Case not found</div>
      </Layout>
    );
  }

  const handleStartWork = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Case ${caseItem.requestNumber} is now in progress.`);
      setIsProcessing(false);
      navigate('/engineer');
    }, 500);
  };

  const handleDeliver = () => {
    if (window.confirm(`Mark ${caseItem.requestNumber} as delivered?`)) {
      setIsProcessing(true);
      setTimeout(() => {
        alert(`Case ${caseItem.requestNumber} marked as delivered!`);
        setIsProcessing(false);
        navigate('/engineer');
      }, 500);
    }
  };

  return (
    <Layout userRole="Engineer" userName={engineer.name} userEmail={engineer.email}>
      <div className="engineer-case-page">
        <Link to="/engineer" className="back-link">← Back to Cases</Link>

        <div className="case-header">
          <div>
            <h1>{caseItem.requestNumber}</h1>
            <p className="case-subtitle">{caseItem.deviceType} · {caseItem.patientName}</p>
          </div>
          <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
            {caseItem.status}
          </span>
        </div>

        <div className="case-grid">
          <div className="case-main">
            <div className="info-card">
              <h3>Production Status</h3>
              <div className="status-steps">
                <span className={`step ${caseItem.status === 'Approved' ? 'active' : ''}`}>Assessment</span>
                <span className={`step ${caseItem.status === 'In Progress' ? 'active' : ''}`}>Production</span>
                <span className={`step ${caseItem.status === 'Delivered' ? 'active' : ''}`}>Ready</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Delivery Information</h3>
              <div className="delivery-row"><strong>Patient:</strong> {caseItem.patientName}</div>
              <div className="delivery-row"><strong>Delivery Address:</strong> 14 Maple Avenue, Apt 2B, Nairobi 00100</div>
              <div className="delivery-row"><strong>Expected Delivery:</strong> May 12–15, 2025</div>
              <div className="delivery-row"><strong>Delivery Status:</strong> Awaiting dispatch</div>
            </div>

            {caseItem.measurements && (
              <div className="info-card">
                <h3>Measurements</h3>
                <div className="measurements-grid">
                  <span>Height: {caseItem.measurements.height} cm</span>
                  <span>Weight: {caseItem.measurements.weight} kg</span>
                  <span>Limb Length: {caseItem.measurements.limbLength} cm</span>
                  <span>Circumference: {caseItem.measurements.circumference} cm</span>
                </div>
                {caseItem.measurements.additionalNotes && (
                  <p className="measurement-notes"><strong>Notes:</strong> {caseItem.measurements.additionalNotes}</p>
                )}
              </div>
            )}

            <div className="info-card">
              <h3>Patient Notes</h3>
              <p className="notes-text">{caseItem.notes}</p>
            </div>
          </div>

          <div className="case-sidebar">
            <div className="action-card">
              <h3>Update Status</h3>
              
              {caseItem.status === 'Approved' && (
                <button className="btn-start" onClick={handleStartWork} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Mark as Ready for Delivery'}
                </button>
              )}

              {caseItem.status === 'In Progress' && (
                <button className="btn-deliver" onClick={handleDeliver} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Mark as Delivered'}
                </button>
              )}

              {caseItem.status === 'Delivered' && (
                <div className="delivered-message">✓ This case has been delivered.</div>
              )}

              <div className="device-info">
                <h4>Device</h4>
                <p className="device-name">Ossur Proprio Foot</p>
                <p className="device-manufacturer">Ossur Americas, Inc.</p>
                <p className="device-id">00811632010017</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EngineerCase;
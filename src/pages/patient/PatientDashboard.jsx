// import { Link } from 'react-router-dom';
// import Layout from '../../components/Layout';
// import { dummyRequests, dummyUser } from '../../data/dummyData';
// import './PatientDashboard.css';

// function PatientDashboard() {
//   const requests = dummyRequests;
//   const user = dummyUser;

//   const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];

//   const getProgressWidth = (status) => {
//     const index = statusOrder.indexOf(status);
//     return ((index + 1) / statusOrder.length) * 100;
//   };

//   return (
//     <Layout userRole="Patient" userName={user.name} userEmail={user.email}>
//       <div className="patient-dashboard">
//         <div className="page-header">
//           <h1>My Dashboard</h1>
//           <p className="welcome-text">Welcome back, {user.name.split(' ')[0]}.</p>
//         </div>

//         <div className="dashboard-grid">
//           {/* Requests Section */}
//           <div className="requests-section">
//             <div className="section-header">
//               <h2>My Requests</h2>
//               <Link to="/patient/request/new" className="btn-new-request">
//                 + New Request
//               </Link>
//             </div>

//             {requests.map(request => (
//               <div key={request.id} className="request-card">
//                 <div className="request-header">
//                   <div className="request-id-status">
//                     <span className="request-number">{request.requestNumber}</span>
//                     <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
//                       {request.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="request-body">
//                   <h4>{request.deviceType}</h4>
//                   <p className="request-meta">Submitted {request.submittedDate}</p>
                  
//                   <div className="progress-steps">
//                     {statusOrder.map((step, index) => (
//                       <div key={step} className="step-item">
//                         <div className={`step-dot ${index <= statusOrder.indexOf(request.status) ? 'completed' : ''}`} />
//                         <span className="step-label">{step}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="request-footer">
//                   <Link to={`/patient/request/${request.id}`} className="btn-view">
//                     View Request
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Sidebar */}
//           <div className="dashboard-sidebar">
//             <div className="sidebar-card">
//               <h3>My Care Center</h3>
//               <p className="center-name">{user.careCenter}</p>
//               <p className="center-location">{user.careCenterLocation}</p>
//               <p className="center-phone">{user.careCenterPhone}</p>
//             </div>

//             <div className="sidebar-card">
//               <div className="address-header">
//                 <h3>Delivery Address</h3>
//                 <button className="btn-edit-address">Edit address</button>
//               </div>
//               <p className="address-text">{user.deliveryAddress}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default PatientDashboard;

import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyRequests, dummyUser } from '../../data/dummyData';
import './PatientDashboard.css';

function PatientDashboard() {
  const requests = dummyRequests;
  const user = dummyUser;

  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];

  return (
    <Layout userRole="Patient" userName={user.name} userEmail={user.email}>
      <div className="patient-dashboard">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p className="welcome-text">Welcome back, {user.name.split(' ')[0]}.</p>
        </div>

        <div className="dashboard-grid">
          {/* Left - Requests */}
          <div className="requests-column">
            <div className="section-header">
              <h2>My Requests</h2>
              <Link to="/patient/request/new" className="btn-new-request">
                + New Request
              </Link>
            </div>

            {requests.map(request => {
              const currentStep = statusOrder.indexOf(request.status) + 1;
              const totalSteps = statusOrder.length;
              const progressWidth = (currentStep / totalSteps) * 100;

              return (
                <div key={request.id} className="request-card">
                  <div className="request-top">
                    <span className="request-id">{request.requestNumber}</span>
                    <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                      {request.status}
                    </span>
                  </div>

                  <h3 className="request-device">{request.deviceType}</h3>
                  <p className="request-meta">Submitted {request.submittedDate}</p>

                  <div className="progress-steps">
                    {statusOrder.map((step, idx) => (
                      <div key={step} className="step-wrapper">
                        <div className={`step-dot ${idx < currentStep ? 'done' : ''}`} />
                        <span className={`step-label ${idx < currentStep ? 'done' : ''}`}>
                          {step}
                        </span>
                        {idx < statusOrder.length - 1 && (
                          <div className={`step-line ${idx < currentStep - 1 ? 'done' : ''}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="request-footer">
                    <Link to={`/patient/request/${request.id}`} className="btn-view">
                      View Request
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Sidebar */}
          <div className="sidebar-column">
            <div className="sidebar-card">
              <h3>My Care Center</h3>
              <p className="center-name">{user.careCenter}</p>
              <p className="center-location">{user.careCenterLocation}</p>
              <p className="center-phone">📞 {user.careCenterPhone}</p>
            </div>

            <div className="sidebar-card">
              <div className="address-header">
                <h3>Delivery Address</h3>
                <button className="btn-edit">Edit address</button>
              </div>
              <p className="address-text">{user.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PatientDashboard;
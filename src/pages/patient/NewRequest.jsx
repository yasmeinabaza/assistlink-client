import { Link } from 'react-router-dom';

function NewRequest() {
  return (
    <div className="container py-5 text-center">
      <h2>New Request</h2>
      <p className="text-muted">This feature will be added in the next branch.</p>
      <Link to="/patient" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NewRequest;
function StatusBadge({ status }) {
  let colorClass = '';
  
  if (status === 'Submitted') colorClass = 'bg-primary';
  else if (status === 'Under Review') colorClass = 'bg-warning text-dark';
  else if (status === 'Approved') colorClass = 'bg-info text-dark';
  else if (status === 'In Progress') colorClass = 'bg-secondary';
  else if (status === 'Delivered') colorClass = 'bg-success';
  else if (status === 'Rejected') colorClass = 'bg-danger';
  else colorClass = 'bg-secondary';
  
  return (
    <span className={`badge ${colorClass} px-3 py-2`}>
      {status}
    </span>
  );
}

export default StatusBadge;
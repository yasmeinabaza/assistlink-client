import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';

function SideNav({ userRole, userName, userEmail, onNavigate, onTabChange }) {
  const location = useLocation();

  const getNavItems = () => {
    const role = userRole?.toLowerCase() || '';
    
    switch (role) {
      case 'patient':
        return [
          { path: '/patient', label: 'Dashboard', icon: '⌂' },
          { path: '/patient/request/new', label: 'New Request', icon: '+' },
          { path: '/patient/profile', label: 'My Profile', icon: '○' }
        ];

      case 'care center':
      case 'care-center':
        return [
          { path: '/care-center', label: 'Dashboard', icon: '⌂' },
          { path: '/care-center/requests', label: 'Requests', icon: '📋' },
          { path: '/care-center/patients', label: 'My Patients', icon: '○' }
        ];

      case 'engineer':
        return [
          { path: '/engineer', label: 'My Cases', icon: '⌂' }
        ];

      case 'administrator':
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: '⌂' },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleClick = (item, e) => {
    if (onNavigate) onNavigate();
    if (onTabChange && item.path.includes('/care-center')) {
      if (item.path === '/care-center/requests') {
        onTabChange('requests');
      } else if (item.path === '/care-center/patients') {
        onTabChange('patients');
      } else if (item.path === '/care-center') {
        onTabChange('dashboard');
      }
    }
  };

  const isActivePath = (path) => {
    if (path === '/patient' || path === '/care-center' || path === '/admin' || path === '/engineer') {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="side-nav">
      <div className="side-nav-header">
        <Link to="/" className="side-nav-brand" onClick={onNavigate}>
          <span className="brand-mark">A</span>
          <span className="brand-name">AssistLink</span>
        </Link>
        <p className="side-nav-role">{userRole || 'Guest'}</p>
      </div>

      <nav className="side-nav-menu">
        {navItems.map((item) => {
          const isActive = isActivePath(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleClick(item, e)}
              className={`side-nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="side-nav-footer">
        <div className="user-avatar">
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="side-nav-user-info">
          <span className="side-nav-user-name">{userName || 'User'}</span>
          {userEmail && <span className="side-nav-user-email">{userEmail}</span>}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
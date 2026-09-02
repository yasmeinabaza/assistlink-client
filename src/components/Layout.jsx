import { useState } from 'react';
import Navbar from './Navbar';
import SideNav from './SideNav';
import './Layout.css';

function Layout({ children, userRole, userName, userEmail, onTabChange }) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const normalizedRole = userRole === 'Care Center' ? 'Care Center' : userRole;

  return (
    <div className="app-layout">
      <aside className="desktop-sidebar">
        <SideNav
          userRole={normalizedRole}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setShowMobileNav(false)}
          onTabChange={onTabChange}
        />
      </aside>

      <Navbar onMenuClick={() => setShowMobileNav(true)} />

      <div
        className={`mobile-sidebar-overlay ${showMobileNav ? 'show' : ''}`}
        onClick={() => setShowMobileNav(false)}
      />

      <aside className={`mobile-sidebar ${showMobileNav ? 'open' : ''}`}>
        <SideNav
          userRole={normalizedRole}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setShowMobileNav(false)}
          onTabChange={onTabChange}
        />
      </aside>

      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
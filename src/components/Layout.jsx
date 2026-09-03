import { useState } from 'react';
import Navbar from './Navbar';
import SideNav from './SideNav';
import './Layout.css';

function Layout({ children, userRole, userName, userEmail, onTabChange }) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const normalizedRole = userRole === 'Care Center' ? 'Care Center' : userRole;

  return (
    <div className="app-layout">
      {/* Desktop Sidebar - ONLY on desktop */}
      <aside className="desktop-sidebar">
        <SideNav
          userRole={normalizedRole}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setShowMobileNav(false)}
          onTabChange={onTabChange}
        />
      </aside>

      {/* Mobile Navbar - ONLY on mobile */}
      <Navbar onMenuClick={() => setShowMobileNav(true)} />

      {/* Mobile Sidebar Overlay - ONLY on mobile */}
      <div
        className={`mobile-sidebar-overlay ${showMobileNav ? 'show' : ''}`}
        onClick={() => setShowMobileNav(false)}
      />

      {/* Mobile Sidebar - ONLY on mobile */}
      <aside className={`mobile-sidebar ${showMobileNav ? 'open' : ''}`}>
        <SideNav
          userRole={normalizedRole}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setShowMobileNav(false)}
          onTabChange={onTabChange}
        />
      </aside>

      {/* Main Content */}
      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
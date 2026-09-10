import { useState } from 'react';
import MobileNavbar from './MobileNavbar';  
import SideNav from './SideNav';
import './Layout.css';

function Layout({ children, userRole, userName, userEmail, onTabChange }) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const normalizedRole = userRole === 'Care Center' ? 'Care Center' : userRole;

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar">
        <SideNav
          userRole={normalizedRole}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setShowMobileNav(false)}
          onTabChange={onTabChange}
        />
      </aside>

      {/* Mobile Navbar */}
      <MobileNavbar onMenuClick={() => setShowMobileNav(true)} />

      {/* Mobile Sidebar Overlay */}
      <div
        className={`mobile-sidebar-overlay ${showMobileNav ? 'show' : ''}`}
        onClick={() => setShowMobileNav(false)}
      />

      {/* Mobile Sidebar */}
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
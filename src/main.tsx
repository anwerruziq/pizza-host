import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import Home from './app/page';
import AdminPage from './app/admin/page';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import 'boxicons/css/boxicons.min.css';
import './app/globals.css';

// ── Simple hash-based router ───────────────────────────────────────
type Route = 'home' | 'menu' | 'about' | 'offers' | 'contact' | 'admin';

interface RouterContextType {
  route: Route;
  navigate: (to: Route) => void;
}

export const RouterContext = createContext<RouterContextType>({
  route: 'home',
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

function getRouteFromHash(): Route {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const validRoutes: Route[] = ['home', 'menu', 'about', 'offers', 'contact', 'admin'];
  if (validRoutes.includes(hash as Route)) return hash as Route;
  if (window.location.pathname.startsWith('/admin')) return 'admin';
  return 'home';
}

function Root() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  useEffect(() => {
    const handleChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleChange);
    window.addEventListener('popstate', handleChange);
    return () => {
      window.removeEventListener('hashchange', handleChange);
      window.removeEventListener('popstate', handleChange);
    };
  }, []);

  const navigate = (to: Route) => {
    window.location.hash = to === 'home' ? '' : to;
    setRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (route) {
      case 'admin':
        return <AdminPage />;
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage />;
      case 'offers':
        return <OffersPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Home />;
    }
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      <AppProvider>
        {renderPage()}
      </AppProvider>
    </RouterContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

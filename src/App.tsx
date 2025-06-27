import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, HelpCircle, Menu, X, ArrowLeft, LogIn } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { EmergencyButton } from './components/EmergencyButton';
import { LoginModal } from './components/LoginModal';
import { UserAvatar } from './components/UserAvatar';
import { LoadingScreen } from './components/LoadingScreen';
import { ChatScreen } from './screens/ChatScreen';
import { EmergencyScreen } from './screens/EmergencyScreen';
import { PeerSupportScreen } from './screens/PeerSupportScreen';
import { ResourceScreen } from './screens/ResourceScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { MonitorScreen } from './screens/MonitorScreen';
import { MeetAgentsScreen } from './screens/MeetAgentsScreen';
import { FAQScreen } from './screens/FAQScreen';
import logoImage from './assets/logo.png';
import boltBadgeImage from './assets/black_circle_360x360.png';

function HeaderLinks() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: '/agents', label: 'Meet the Agents', icon: Bot },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center space-x-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative flex items-center space-x-2 min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="font-medium">{link.label}</span>
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeHeaderLink"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg sm:hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BackToChatButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInfoPage = location.pathname === '/agents' || location.pathname === '/faq';

  if (!isInfoPage) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => navigate('/')}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <ArrowLeft size={20} />
      <span>Back to Chat</span>
    </motion.button>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [showEmergency, setShowEmergency] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, login, loginWithGoogle, logout } = useApp();

  // Show loading screen while initializing
  if (state.isLoading) {
    return <LoadingScreen />;
  }

  const handleEmergencyClick = () => {
    setShowEmergency(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate('/');
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setShowLoginModal(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setShowLoginModal(false);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const renderScreen = () => {
    if (showEmergency) {
      return <EmergencyScreen />;
    }

    switch (activeTab) {
      case 'chat':
        return <ChatScreen />;
      case 'peers':
        return <PeerSupportScreen />;
      case 'resources':
        return <ResourceScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'monitor':
        return <MonitorScreen />;
      default:
        return <ChatScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-support">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm shadow-soft px-6 py-4 flex items-center justify-between sticky top-0 z-50"
      >
        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className="flex items-center group"
            onClick={() => setActiveTab('chat')}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center group-hover:opacity-90 transition-opacity"
            >
              <img 
                src={logoImage} 
                alt="BrainBloom Logo" 
                className="w-10 h-10 max-h-[40px] object-contain drop-shadow-sm align-middle mr-1"
                style={{ verticalAlign: 'middle' }}
              />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent align-middle" style={{lineHeight: '40px'}}>
                BrainBloom
              </h1>
            </motion.div>
          </Link>
          <BackToChatButton />
        </div>

        <div className="flex items-center space-x-4">
          <motion.a
            href="https://bolt.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={boltBadgeImage} 
              alt="Built with Bolt.new" 
              className="w-8 h-8 object-contain"
            />
          </motion.a>
          <HeaderLinks />
          
          <AnimatePresence mode="wait">
            {!showEmergency ? (
              <>
                {/* Login/User Avatar */}
                {state.isAuthenticated && state.user ? (
                  <motion.div
                    key="user-avatar"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <UserAvatar user={state.user} onLogout={handleLogout} />
                  </motion.div>
                ) : (
                  <motion.button
                    key="login-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setShowLoginModal(true)}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Login
                  </motion.button>
                )}

                <EmergencyButton onClick={handleEmergencyClick} />
              </>
            ) : (
              <motion.button
                key="back-button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => setShowEmergency(false)}
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden px-6 py-8">
        <Routes>
          <Route path="/agents" element={<MeetAgentsScreen />} />
          <Route path="/faq" element={<FAQScreen />} />
          <Route path="/" element={
            <AnimatePresence mode="wait">
              <motion.div
                key={showEmergency ? 'emergency' : activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Navigation */}
      <AnimatePresence>
        {!showEmergency && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="sticky bottom-0 z-50"
          >
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}

// Wrap App with Router and AppProvider
export default function AppWithProviders() {
  return (
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  );
}
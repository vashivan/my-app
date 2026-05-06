import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar__inner">
          <NavLink to="/" className="navbar__logo">
            Site name
          </NavLink>

          <nav className="navbar__desktop">
            <NavLink to="/">Page</NavLink>
            <NavLink to="/contact">Page</NavLink>
            <NavLink to="/">Page</NavLink>
            <button className="navbar__button">
              <NavLink to="/contact">
                Send form
              </NavLink>
            </button>
          </nav>

          <button className="navbar__burger" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <button className="mobileMenu__close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <nav className="mobileMenu__nav">
              <NavLink to="/" onClick={() => setOpen(false)}>Page</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)}>Page</NavLink>
              <NavLink to="/" onClick={() => setOpen(false)}>Page</NavLink>
            </nav>

            <NavLink
              to="/contact"
              className="mobileMenu__button"
              onClick={() => setOpen(false)}
            >
              Send form
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
};

export default Navbar;
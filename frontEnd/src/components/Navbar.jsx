import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import hamBurger from "../assets/menu.svg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [hamOpen, setHamOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/me');
        setIsLoggedIn(true);
        setRole(res.data.role);
      } catch {
        setIsLoggedIn(false);
        setRole('');
      }
    };

    const handleAuthChange = () => {
      fetchUser();
    };

    fetchUser();
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    }

    setIsLoggedIn(false);
    setRole('');
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <>

      <div className="navbar flex justify-around mt-3 items-center">
        <div className="hamBurger md:hidden cursor-pointer">
          <img src={hamBurger} alt="hamBurger" onClick={() => setHamOpen(true)} />
        </div>

<div className="logo">
          <h2 className="font-urdu font-bold text-yellow-500 text-2xl">
            سنابل سویٹس
          </h2>
        </div>
            <ul className="hidden md:flex gap-6 text-lg font-semibold">
            <li>
              <NavLink to="/" className={(e) => (e.isActive ? "text-yellow-500" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={(e) => (e.isActive ? "text-yellow-500" : "")}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={(e) => (e.isActive ? "text-yellow-500" : "")}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={(e) => (e.isActive ? "text-yellow-500" : "")}>
                Cart
              </NavLink>
            </li>
            {role === 'admin' && (
              <li>
                <NavLink to="/admin" className={(e) => (e.isActive ? "text-yellow-500" : "")}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        
  <div className="loginbtn">
          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="bg-yellow-600 px-3 py-1 rounded-lg font-bold hover:text-yellow-500 hover:bg-transparent hover:border cursor-pointer text-center"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-yellow-600 px-3 py-1 rounded-lg font-bold hover:text-yellow-500 hover:bg-transparent cursor-pointer text-center"
            >
              Logout
            </button>
          )}
        </div>
        
     </div>

      {hamOpen && (
        <div
          onClick={() => setHamOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[50%] bg-black/90 text-white z-50 transform ${
          hamOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 text-right">
          <button onClick={() => setHamOpen(false)} className="text-2xl">
            ✖
          </button>
        </div>

        <ul className="flex flex-col items-start gap-6 px-6 text-lg font-semibold">
          <li>
            <NavLink to="/" onClick={() => setHamOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={() => setHamOpen(false)}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setHamOpen(false)}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={() => setHamOpen(false)}>
              Cart
            </NavLink>
          </li>
          {role === 'admin' && (
            <li>
              <NavLink to="/admin" onClick={() => setHamOpen(false)}>
                Admin
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

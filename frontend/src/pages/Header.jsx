import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
    };
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          VIT Results
        </Link>
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/" style={navLinkStyles}>
              Search Result
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" style={navLinkStyles}>
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

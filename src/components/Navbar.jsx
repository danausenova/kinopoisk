import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MATRIARKHAT</div>
      <form className="search-form">
        <input type="text" placeholder="Поиск" className="search-input" />
        <button type="submit" className="search-button">
          Найти film
        </button>
      </form>
    </nav>
  );
};

export default Navbar;

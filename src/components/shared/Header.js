import React from "react";

const Header = ({ logoTitle, navbarItem }) => {
  return (
    
      <header className="app-header">
        <h1>{logoTitle}</h1>
        <nav>
          <ul>
            {navbarItem.map((item) => (
              <li>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    
  );
};

export default Header;

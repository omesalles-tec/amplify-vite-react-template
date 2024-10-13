//import "@aws-amplify/ui-react/styles.css";
import "../App.css";
import { useState } from "react";
import { signOut } from "aws-amplify/auth";
//import "@cloudscape-design/global-styles/index.css"; // Import Cloudscape global styles
import { Link, Outlet } from "react-router-dom";

const Layout = () => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
      { label: "Household", href: "/household" },
      { label: "Ingredients", href: "/ingredients" },
      { label: "Stock", href: "/stock" },
      { label: "Recipes", href: "/recipes" },
      { label: "Menus", href: "/menus" },
      { label: "Shopping List", href: "/shopping-list" },
      { label: "Supermarkets", href: "/supermarkets" },
      { label: "Discounts", href: "/discounts" },
    ];
  
    async function handleSignOut() {
        await signOut();
        // redirect to login page
      }

  return (
    <header>
      <nav className="nav">
        <div className="logo">
            <Link to="/">MyApp</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="burger-icon"></span>
          <span className="burger-icon"></span>
          <span className="burger-icon"></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </header>
  );
}

export default Layout;  

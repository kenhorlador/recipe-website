// Packages
import { Link } from 'react-router-dom'

// Styles
import './Navbar.style.css'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" 
          className="brand"
          children={<h1>Recipe App</h1>} 
        />
        <Link to="/create" children="Create Recipe" />
        {/* <NavLink to="/" children="Home"/>
        <NavLink to="/search" children="Search"/> */}
      </nav>
    </div>
  )
}

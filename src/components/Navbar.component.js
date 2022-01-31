// Packages
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// Styles
import './Navbar.style.css'

export default function Navbar() {

  const { color, changeColor } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav onClick={() => changeColor('pink')}>
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

import { useTheme } from "../hooks/useTheme";

// Styles
import './ThemeSelector.style.css'

const themeColors = ["#58249c", "#249c6b", "#b70233"]

const ThemeSelector = () => {
  const { changeColor } = useTheme()
  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map(color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color}}
          />
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector

// Styles
import './SearchBar.style.css'

export default function SearchBar({ searchChange }) {

  return (
    <div className='searchbar'>
      <input 
        id="search"
        type="search"
        placeholder='Search Recipe'
        onChange={searchChange}
      />

    </div>
  )
}

// Hooks
import { useFetch } from '../../hooks/useFetch'

// Components
import RecipeList from '../../components/RecipeList.component'

// Styles
import './Home.styles.css'

export default function Home() {
  const { data, error, isPending } = useFetch('http://localhost:3000/recipes')

  

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{ error }</p>}
      {data && <RecipeList data={ data } />}
    </div>
  )
}

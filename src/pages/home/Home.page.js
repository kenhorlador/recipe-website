// packages
import { useEffect, useState } from 'react'

// firebase
import { projectFirestore } from '../../firebase/config'

// Components
import RecipeList from '../../components/RecipeList.component'

// Styles
import './Home.styles.css'

export default function Home() {
  // states
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    // Start fetch of data
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot(snapShot => {
      if (snapShot.empty) {
        setError('No recipes to load')
        setIsPending(false)
      } else {
        let results = []
        snapShot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

      return () => unsub()
  },[])

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{ error }</p>}
      {data && <RecipeList data={ data } />}
    </div>
  )
}

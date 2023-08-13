import { useState } from 'react'
import styles from './App.module.css'
import { fetchSynonyms } from './api/fetchSynonyms'


type synonyms = {
  word: string
  score: number
}

function App() {

  const [word, setWord] = useState<string>("")
  const [synonyms, setSynonyms] = useState<synonyms[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = (word: string) => {
    setIsLoading(true)
    fetchSynonyms(word).then(res => res.json()).then(setSynonyms).then(() => setIsLoading(false))
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()   // stops from refereshing page
    fetchData(word)
  }

  return (
    <>
      <div className={styles.App}>
        <form onSubmit={submitHandler}>
          <label htmlFor='get-word'>Search Synonyms for a Word: </label>
          <input value={word} type="text" name="word" id="get-word" placeholder='word' onChange={(e) => setWord(e.target.value)} />
          <button type="submit">Get Synonyms</button>
        </form>

        { isLoading && <div>Loading...</div>}
        <ul>
          {
            synonyms.map(words => <li onClick={() => {
              setWord(words.word)
              fetchData(words.word)
            }} key={words.word}>{words.word}</li>)
          }
        </ul>
      </div>
    </>
  )
}

export default App

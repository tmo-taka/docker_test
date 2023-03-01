import { useState, useEffect } from 'react'
import { apiClient } from '@/common/axios';
import './App.css'
import {SearchResults, Item} from '@/types/Qiita'

function App() {
  const [searchWorld, setSearchWord] = useState<string>('')
  const [results, setResults] = useState<Item[]>([]);

  const changeWord = (event:React.ChangeEvent<HTMLInputElement>):void => {
    const newValue:string = event.target.value;
    setSearchWord(newValue);
  }

  const blurForm = () => {
    getAPi();
  }

  const getAPi = () => {
    apiClient.get(`/tags/${searchWorld}/items`)
    .then(res => {
      setResults(res.data);
    })
  }

  useEffect(() => {
    apiClient.get('/items')
      .then(res => {
        setResults(res.data);
      })
  },[])

  return (
    <div className="App">
      <h1>TECH BLOG</h1>
      <input
        type="text"
        value={searchWorld}
        onChange={changeWord}
        onBlur={blurForm}
      />
      <ul>
        {
          results.map((data:Item) => {
            return (
              <li key={data.title}>
                <a href={data.url} target="_blank">{data.title}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App

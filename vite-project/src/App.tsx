import { useState, useEffect } from 'react'
import { apiClient } from '@/common/axios';
import './App.css'
import {Item, Tag} from '@/types/Qiita'

function App() {
  const [searchWorld, setSearchWord] = useState<string>('')
  const [results, setResults] = useState<Item[]>([]);
  const [suggestion, setSuggestion] = useState<Tag[]>([]);

  const changeWord = async(event:React.ChangeEvent<HTMLInputElement>):void => {
    const newValue:string = event.target.value;
    await setSearchWord(newValue);
    await getTags();
  }

  const blurForm = () => {
    getTagItems();
  }

  const getTagItems = () => {
    apiClient.get(`/tags/${searchWorld}/items`)
    .then(res => {
      try {
        setResults(res.data);
      }catch(err) {
        console.log(err);
      }
    })
  }

  const getTags = () => {
    apiClient.get(`/tags/${searchWorld}`)
    .then(res => {
      res.data.length ? setSuggestion(res.data) : '';
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
          suggestion?.map((data:Tag) => {
            return (
              <li key={data.id}>{data.id}</li>
            )
          })
        }
      </ul>
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

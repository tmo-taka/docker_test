import { useState, useEffect } from 'react'
import { apiClient } from '@/common/axios';
import './App.css'
import {Item, Tag} from '@/types/Qiita'

function App() {
  const [searchWorld, setSearchWord] = useState<string>('')
  const [results, setResults] = useState<Item[]>([]);
  const [suggestion, setSuggestion] = useState<Tag[]>([]);

  const changeWord = (event:React.ChangeEvent<HTMLInputElement>):void => {
    const newValue:string = event.target.value;
    setSearchWord(newValue);
    // https://zenn.dev/syu/articles/3c4aa813b57b8c
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
    if(searchWorld) {
      apiClient.get(`/tags/${searchWorld}`)
      .then(res => {
        console.log(res.data);
        res.data.length ? setSuggestion(res.data) : '';
      })
    }
  }

  useEffect(() => {
    apiClient.get('/items')
      .then(res => {
        setResults(res.data);
      })
  },[])

  useEffect(() => {
    getTags();
  },[searchWorld])

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

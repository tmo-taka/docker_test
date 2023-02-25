import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import {SearchResults, Item} from '@/types/Qiita'

function App() {
  const [result, setResult] = useState<SearchResults>({
    items:[{} as Item],
    totalCount: 0,
    pageInfo: {
      endCursor: '',
      hasNextPage: false,
    }
  });

  useEffect(() => {
      axios.get('https://qiita.com/api/v2/items')
      .then(res => {
        console.log(res.data);
        setResult(res.data);
      })
  },[])

  return (
    <div className="App">
      <h1>TECH BLOG</h1>
      <div> {result.totalCount} </div>
    </div>
  )
}

export default App

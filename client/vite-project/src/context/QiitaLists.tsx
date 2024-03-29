import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { apiClient } from '@/common/axios';
import {DisplayLists} from '@/components/DisplayLists'
import {Item, Tag} from '@/types/Qiita'
import { authName } from '@/state/Auth';

export const QiitaLists = () => {
    const [searchWorld, setSearchWord] = useState<string>('')
    const [results, setResults] = useState<Item[]>([]);
    const [suggestion, setSuggestion] = useState<Tag[]>([]);
    const name = useRecoilValue(authName);

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
            <div>ようこそ!{name}さん</div>
            <h1>TECH BLOG(volumesの変更)</h1>
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
            <DisplayLists
                lists={results}
            />
        </div>
    )
}
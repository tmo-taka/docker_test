import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { apiClient } from '@/common/axios';
import { DisplayLists } from '@/components/DisplayLists'
import { Suggest } from '@/components/Suggest'
import { Item } from '@/types/Qiita'
import { authName } from '@/state/Auth';

export const QiitaLists = () => {
    const [searchWorld, setSearchWord] = useState<string>('')
    const [results, setResults] = useState<Item[]>([]);
    const name = useRecoilValue(authName);

    const changeWord = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const newValue:string = event.target.value;
        setSearchWord(newValue);
        // https://zenn.dev/syu/articles/3c4aa813b57b8c
    }

    const getQiitaArticles = () => {
        getTagItems();
    }

    const getTagItems = () => {
        if(searchWorld) {
            apiClient.get(`/tags/${searchWorld}/items`)
                .then(res => {
                    try {
                        setResults(res.data);
                    }catch(err) {
                        console.log(err);
                    }
                })
        }
    }

    useEffect(() => {
        apiClient.get('/items')
            .then(res => {
                setResults(res.data);
            })
    },[])

    return (
        <div className="App py-md">
            <div className='text-[2em] text-center'>ようこそ!{name}さん</div>
            <h1 className='text-[1.6em] text-center mb-lg font-bold'>TECH BLOG(volumesの変更)</h1>
            <div className="relative w-64 mb-24 mx-auto">
                <input
                    type="text"
                    value={searchWorld}
                    onChange={changeWord}
                    onBlur={getQiitaArticles}
                    className="textForm"
                />
                <Suggest
                    searchWorld={searchWorld}
                    handleClick={setSearchWord}
                    getItems={getTagItems}
                />
            </div>
            <DisplayLists
                lists={results}
            />
        </div>
    )
}
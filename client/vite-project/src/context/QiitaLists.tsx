import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { apiClient } from '@/common/axios';
import {DisplayLists} from '@/components/DisplayLists'
import {Item, Tag} from '@/types/Qiita'
import { TagParams } from '@/types/QiitaParams'
import { authName } from '@/state/Auth';

export const QiitaLists = () => {
    const [searchWorld, setSearchWord] = useState<string>('')
    const [results, setResults] = useState<Item[]>([]);
    const [allCandidates, setAllCandidates] = useState<string[]>([]);
    const [suggest, setSuggest] = useState<string[]>([]);
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

    const getTags = async(pageNumber :number):Promise<string[]> => {
        const params: {params?: TagParams} = {
            params: {
                page: pageNumber,
                sort: 'count',
                per_page: 100
            }
        }

        let responseData:string[] = [];

        await apiClient.get(`/tags`,params)
            .then(res => {
                responseData = res.data.map((obj:Tag) => obj.id);
            })

        return responseData;
    }

    const searchMatches = (searchTerm:string, candidates:string[]) => {
        const regex = new RegExp(searchTerm, 'i');
        return candidates.filter(candidate => regex.test(candidate));
    }

    const setSearchWordFromSuggest = (item:string) => {
        // NOTE: サジェストから検索ワードをセット
        setSearchWord(item);
    }

    useEffect(() => {
        apiClient.get('/items')
            .then(res => {
                setResults(res.data);
            })
    },[])

    useEffect(() => {
        (async() => {
            let tags:string[] = [];
            for(let i=1; i<=10; i++){
                const responseList = await getTags(i)
                tags = [...tags, ...responseList];
            }
            setAllCandidates(tags);
        })()
    },[])

    useEffect(() => {
        // NOTE :サジェストのセットをしている
        const suggest:string[] = searchMatches(searchWorld,allCandidates);
        if (suggest.length >0 && suggest.length < 1000) {
            // サジェストを最高10個にして　セットする
            const splitSuggest = suggest.slice(0,10);
            setSuggest(splitSuggest);
        }
        getTagItems();
    },[searchWorld])

    return (
        <div className="App">
            <div>ようこそ!{name}さん</div>
            <h1>TECH BLOG(volumesの変更)</h1>
            <input
                type="text"
                value={searchWorld}
                onChange={changeWord}
                onBlur={getQiitaArticles}
            />
            <ul>
                {
                    suggest?.map((item:string) => {
                        return (
                        <li key={item} onClick={() => setSearchWordFromSuggest(item)}>{item}</li>
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
import { FC, useState, useEffect } from 'react';
import { apiClient } from '@/common/axios';
import { Tag } from '@/types/Qiita'
import { TagParams } from '@/types/QiitaParams'

type propsType = {
    searchWorld: string,
    handleClick: (item:string) => void,
    getItems:() => void,
    children?: React.ReactNode
}

export const Suggest: FC<propsType> = (props) => {
    const {searchWorld} = props;
    const [suggest, setSuggest] = useState<string[]>([]);
    const [allCandidates, setAllCandidates] = useState<string[]>([]);

    const searchMatches = (searchTerm:string, candidates:string[]) => {
        const regex = new RegExp(searchTerm, 'i');
        return candidates.filter(candidate => regex.test(candidate));
    }

    const setSearchWordFromSuggest = (item:string) => {
        // NOTE: サジェストから検索ワードをセット
       props.handleClick(item);
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
        props.getItems();
    },[searchWorld])

    return (
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute bottom-100">
            {
                suggest?.map((item:string) => {
                    return (
                    <li key={item} onClick={() =>  setSearchWordFromSuggest(item)} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 hover:border-main hover:text-main hover:text-main hover:pl-6">
                        {item}
                    </li>
                    )
                })
            }
        </ul>
    )
}
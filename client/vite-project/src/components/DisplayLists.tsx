import { FC } from 'react';
import {Item} from '@/types/Qiita'

type propsType = {
    lists: Item[],
    children?: React.ReactNode
}

export const DisplayLists: FC<propsType> = (props) => {
    const {lists} = props
    return (
        <ul className="w-2/3 mx-auto my-0 border-solid border border-primary rounded">
            {
                lists.map((data:Item) => {
                    return (
                        <li key={data.title} className="mb-sm last:mb-0 border-primary border-b last:border-b-0">
                            <a href={data.url} target="_blank" className="p-4 block text-blue-500 hover:underline">{data.title}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}
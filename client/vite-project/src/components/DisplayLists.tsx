import { FC } from 'react';
import {Item} from '@/types/Qiita'

type propsType = {
    lists: Item[],
    children?: React.ReactNode
}

export const DisplayLists: FC<propsType> = (props) => {
    const {lists} = props
    return (
        <ul>
            {
                lists.map((data:Item) => {
                    return (
                        <li key={data.title}>
                        <a href={data.url} target="_blank">{data.title}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}
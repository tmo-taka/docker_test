import { useState } from "react"
import { useRecoilState } from 'recoil';
import { authAtom , AuthAtom } from '@/state/Auth'
import axios from "axios";

export const Login = () => {
    const [inputName, setInputName] = useState<string>('');
    const [auth, setAuth] = useRecoilState<AuthAtom>(authAtom);

    const inputForm = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const newValue:string = event.target.value;
        setInputName(newValue);
    }

    const submitData = async () => {
        try {
            const response = await axios.post('/auth-api/auth/',
                {
                    name: inputName,
                },
                {
                    headers: {
                        'content-type': 'application/json',
                    }
                },
            );
            if(response.data?.id){
                const newId = response.data?.id;
                setAuth({id: newId, name: 'テストユーザー'});
            };
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="flex space-x-2 items-end place-self-center">
            <div className="w-64">
                <div className="title text-lg">Name</div>
                <input type="text" value={inputName} onChange={inputForm} className="textForm"/>
            </div>
            <button onClick={submitData} className="w-32 block rounded-full bg-main text-white p-sm mb-sm">ログイン</button>
        </div>
    )
}
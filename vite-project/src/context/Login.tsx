import { useState } from "react"

export const Login = () => {
    const [inputName, setInputName] = useState<string>('');

    const inputForm = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const newValue:string = event.target.value;
        setInputName(newValue);
    }
    return(
        <form className="container">
            <div className="title">Name</div>
            <input type="text" value={inputName} onChange={inputForm}/>
            <input type="submit" value="ログイン" />
        </form>
    )
}
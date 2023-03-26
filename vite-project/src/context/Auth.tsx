import { RecoilRoot } from "recoil";
import App from '../App'

export const AuthContext = () => {
    return(
        <RecoilRoot>
            <App />
        </RecoilRoot>
    )
}
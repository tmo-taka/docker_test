import { atom, selector } from "recoil";

export type AuthAtom = {
    id: string,
    name: string
}

export const authAtom = atom<AuthAtom>({
    key: "Auth", // 任意のユニークな名前
    // 初期値
    default: {
        id: '',
        name: '',
    },
})

export const authSelector = selector(
    {
        key: 'authSelector',
        get: ({get}) => {
            const atom = get(authAtom);
            return atom.name;
        },
    }
)
import { atom, selector } from "recoil";

export const authAtom = atom({
    key: "Auth", // 任意のユニークな名前
    // 初期値
    default: {
        id: undefined,
        name: 'テスト',
    },
});

export const AuthSelector = selector({
    key: 'getName',
    get: ({get}) => {
        const atom = get(authAtom);
        return atom.name;
    }
})
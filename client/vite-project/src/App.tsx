import { useRecoilValue } from 'recoil';
import { QiitaLists } from '@/context/QiitaLists'
import { Login } from '@/context/Login'
import { authAtom } from '@/state/Auth'

const DisplayComponent = () => {
  const auth = useRecoilValue(authAtom);
  return auth.id ? <QiitaLists /> : <Login />
}

function App() {

  return (
    <div>
      <DisplayComponent />
    </div>
  )
}

export default App

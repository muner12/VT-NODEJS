import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import Socket from './components/Socket'
import { Button } from '@chakra-ui/react'
import { Route,Routes} from 'react-router-dom'
import Chat from './pages/Chat'
import './app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
     
      <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/chat" element={<Chat />}/>
      </Routes>
     
    

    </div>
  )
}

export default App

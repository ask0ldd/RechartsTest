import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'
import Greetings from './components/Greetings'
import AvgSessionChart from './components/AvgSessionChart'
import PolarChart from './components/PolarChart'
import ScoreChart from './components/ScoreChart'
import { useState, useEffect } from 'react'
import {User, keyData, UserInterface} from './models/user'


function App() {

  const userId : number = 12

  const baseUrl : string = "http://localhost:3000/user/"+userId // 12 or 18

  const [userDatas, setUserDatas] = useState<Array <UserInterface>>()

  useEffect(() => {
      const fetchData = async () =>  {
          try{
              const response = await fetch(baseUrl)
              const datas = await response.json()
              console.log(datas.data)
              setUserDatas(new User(datas.data))
          }
          catch(error){
              console.log(error)
          }
      }

      fetchData()

  }, [baseUrl])

  return (
    <div className="App">
      <main>
        <section>
          <div className='graphsSubSection'>
            <div className='textnGraphsContainer'>
              <Greetings firstname={userDatas.firstname}/>
              <GraphActivity userId={userId}/>
              <AvgSessionChart userId={userId}/>
              <PolarChart userId={userId}/>
              <ScoreChart score={[{score:0.12},{score:0.88}]}/> {/*datas todayscore key for 12 but score for 18*/}
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

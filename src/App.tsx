import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'
import Greetings from './components/Greetings'
import AvgSessionChart from './components/AvgSessionChart'
import PolarChart from './components/PolarChart'
import ScoreChart from './components/ScoreChart'
import { useState, useEffect } from 'react'
import {User, UserInterface} from './models/UserModel'


function App() {

  //const userId : number = 18 /* gerer invalid ID */

  const [userId, setUserId] : [number, any] = useState<number>(18)
  const [userDatas, setUserDatas] : [any, any] = useState<Array <UserInterface>>() /* find how to replace first any by class User */

  const baseUrl : string = "http://localhost:3000/user/"+userId // 12 or 18

  useEffect(() => {
      const fetchData = async () =>  {
          try{
              const response = await fetch(baseUrl)
              const datas = await response.json()
              setUserDatas(new User(datas.data)) // instantiate user model to format my datas the right way
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
              <Greetings firstname={userDatas?.firstname ? userDatas.firstname : 'N/A'}/>
              <GraphActivity userId={userId&&userId}/>
              <AvgSessionChart userId={userId&&userId}/>
              <PolarChart userId={userId&&userId}/>
              <ScoreChart score={userDatas?.score ? [{score:userDatas.score},{score:1-userDatas.score}] : [{score:0},{score:1}]}/> {/*datas todayscore key for 12 but score for 18*/}
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

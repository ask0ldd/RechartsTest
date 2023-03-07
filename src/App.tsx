import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'
import Greetings from './components/Greetings'
import AvgSession from './components/AvgSession'

function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <section>
          <ActivitiesMenu/>
          <div className='graphsSubSection'>
            <div className='textnGraphsContainer'>
              <Greetings/>
              <GraphActivity userId={12}/>
              <AvgSession userId={12}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'
import Greetings from './components/Greetings'
import AvgSessionChart from './components/AvgSessionChart'

function App() {

  return (
    <div className="App">
      <main>
        <section>
          <div className='graphsSubSection'>
            <div className='textnGraphsContainer'>
              <Greetings/>
              <GraphActivity userId={12}/>
              <AvgSessionChart userId={12}/>
              <AvgSessionChart userId={12}/>
              <AvgSessionChart userId={12}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

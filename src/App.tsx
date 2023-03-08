import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'
import Greetings from './components/Greetings'
import AvgSessionChart from './components/AvgSessionChart'
import PolarChart from './components/PolarChart'
import ScoreChart from './components/ScoreChart'

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
              <PolarChart userId={12}/>
              <ScoreChart score={[{score:0.12},{score:0.88}]}/> {/*datas todayscore key for 12 but score for 18*/}
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

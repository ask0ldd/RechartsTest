import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import GraphActivity from './components/GraphActivity'
import Header from './components/Header'

function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <section>
          <ActivitiesMenu/>
          <div className='graphSubSection'>
            <GraphActivity userId={12}/>
          </div>
        </section>
      </main>
    </div>
  )

}

export default App

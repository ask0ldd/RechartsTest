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
          <GraphActivity userId={12}/>

        </section>
      </main>
    </div>
  )

}

export default App

import './App.css'
import ActivitiesMenu from './components/ActivitiesMenu'
import Header from './components/Header'

function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <section>
          <ActivitiesMenu/>

        </section>
      </main>
    </div>
  )

}

export default App

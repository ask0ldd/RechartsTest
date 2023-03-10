import '../styles/Greetings.css'

interface props {
    firstname : string
}

const Greetings = ({firstname}:props) => {
    return(
        <div className="greetingsContainer">
            <p className='hello'>Bonjour {firstname}</p>
            <p className='congrats'>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    )
}

export default Greetings
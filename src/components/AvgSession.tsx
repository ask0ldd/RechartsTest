import { useEffect, useState } from "react"
import { LineChart,ResponsiveContainer } from "recharts"

interface props {
    userId : number
}

interface session {
    day:number
    SessionLength:number
}

const AvgSession = ({userId}:props) => {

    const baseUrl : string = "http://localhost:3000/user/"+userId+"/average-sessions" // 12 or 18

    const [sessionsDatas, setSessionsDatas] = useState<Array <session>>()

    useEffect(() => {
        const fetchData = async () =>  {
            try{
                const response = await fetch(baseUrl)
                const datas = await response.json()
                /*const sessions : Array <session> = datas.data.sessions
                const sDatas : string = JSON.stringify(sessions)*/
                console.log(JSON.stringify(datas.data.sessions))
                setSessionsDatas(datas.data.sessions)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
        <ResponsiveContainer width="33%" height={260}>
            <LineChart
            data={sessionsDatas}
            />
        </ResponsiveContainer>
    )
}

export default AvgSession
import { useEffect, useState } from "react"
import { LineChart, ResponsiveContainer, Line, XAxis } from "recharts"
import "../styles/AvgSession.css"

interface props {
    userId : number
}

const AvgSession = ({userId}:props) => {

    interface session {
        day:number
        SessionLength:number
    }

    const formatXTicks = (value : number) => {
        const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
        return week[value-1]
    }

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
            >
                <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" />
                <XAxis 
                dataKey="day"
                tickLine={false}
                axisLine={false}
                /*ticks={['L', 'M', 'M', 'J', 'V', 'S', 'D']}*/
                tickFormatter={formatXTicks}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default AvgSession
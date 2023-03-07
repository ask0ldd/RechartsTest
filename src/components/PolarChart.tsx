import { useState, useEffect } from "react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend} from "recharts"
import "../styles/PolarChart.css"

interface props {
    userId : number
}

const PolarChart = ({userId} : props) => {

    interface performance {
        value:number
        kind:number
    }

    const baseUrl : string = "http://localhost:3000/user/"+userId+"/performance" // 12 or 18

    const [performancesDatas, setPerformancesDatas] = useState<Array <performance>>()
    /*const [performancesAxisValues, setPerformancesAxisValues] = useState<Object>()*/

    useEffect(() => {
        const fetchData = async () =>  {
            try{
                const response = await fetch(baseUrl)
                const datas = await response.json()
                /*const sessions : Array <session> = datas.data.sessions
                const sDatas : string = JSON.stringify(sessions)*/
                console.log('perfs:',JSON.stringify(datas.data.data))
                /*console.log(JSON.stringify(Object.values(datas.data.kind)))*/
                setPerformancesDatas(datas.data.data)
                /*setPerformancesAxisValues(Object.values(datas.data.kind))*/
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
        <ResponsiveContainer width="30%" height={260} className="polarChartContainer">
            <RadarChart outerRadius="80%" data={performancesDatas}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="kind" axisLine={false} tickLine={false} allowDuplicatedCategory={false}/>
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default PolarChart
import { useState, useEffect } from "react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend} from "recharts"
import "../styles/PolarChart.css"

interface props {
    userId : number
}

const PolarChart = ({userId} : props) => {

    interface performance {
        value:number
        kind:any
    }

    const rotateArrayRight = (array : Array <performance>) : Array <performance> => {

        const lastItem : performance = array[array.length-1]
        array.pop()
        array.unshift(lastItem)
        return array
    }

    const baseUrl : string = "http://localhost:3000/user/"+userId+"/performance" // 12 or 18

    const [performancesDatas, setPerformancesDatas] = useState<Array <performance>>()
    /*const [performancesAxisValues, setPerformancesAxisValues] = useState<Object>()*/

    useEffect(() => {
        const fetchData = async () =>  {
            try{
                const response = await fetch(baseUrl)
                const datas = await response.json()
                console.log('perfs:',JSON.stringify(datas.data.data))
                const perfDataswTextualKinds : Array <performance> = datas.data.data.map((data: performance) : performance => { 
                    data.kind = datas.data.kind[data.kind]
                    return data
                }) /* remplace les ticks id par des ticks textuels 1 > cardio ; 2 > energy ; etc... */
                console.log('perfstext:', perfDataswTextualKinds)
                setPerformancesDatas(perfDataswTextualKinds.reverse()) /* ticks name needed to be reversed */
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
        <ResponsiveContainer width="30%" height={260} className="polarChartContainer">
            <RadarChart outerRadius="70%" data={performancesDatas}>
                <PolarGrid/>
                <PolarAngleAxis 
                dataKey="kind" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: '10px' }}
                allowDuplicatedCategory={false}/>
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default PolarChart
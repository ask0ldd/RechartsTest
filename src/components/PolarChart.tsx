import { useState, useEffect } from "react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip} from "recharts"
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

    /* pb avec height fixed */
    return(
        <ResponsiveContainer width="30%" height={260} className="polarChartContainer"> 
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performancesDatas}>
                <PolarGrid
                radialLines={false} // attribute d: Expected moveto path command ('M' or 'm'), "Z". SVG Attributes
                // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
                />
                <PolarRadiusAxis
                tickCount={6}
                tick={false}
                axisLine={false} 
                tickLine={false}
                />
                <PolarAngleAxis 
                dataKey="kind" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: '10px', fill:'#FFFFFF' }}
                allowDuplicatedCategory={false}/>
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                <Tooltip
                wrapperStyle={{outline:'none', border:'none'}}
                itemStyle={{color:'#000', fontSize:'10px'}}
                labelStyle={{color:'#000',display:'none'}}
                cursor={false}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default PolarChart

/*

        <ResponsiveContainer width="30%" height={260} className="polarChartContainer">
            <RadarChart outerRadius="80%" data={performancesDatas}>
                <PolarGrid
                innerRadius={0}
                outerRadius={300}
                />
                <PolarRadiusAxis
                tickCount={6}
                tick={false}
                axisLine={false} 
                tickLine={false}
                />
                <PolarAngleAxis 
                dataKey="kind" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: '10px', fill:'#FFFFFF' }}
                allowDuplicatedCategory={false}/>
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
            </RadarChart>
        </ResponsiveContainer>

*/
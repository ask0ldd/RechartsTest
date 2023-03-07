import { useEffect, useState } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/GraphActivity.css'

interface props {
    userId : number
}

interface session {
    day:Date
    kilogram:number
    calories:number
}

const resizedLegendValue = (value: string, entry: any) => {
    return <span style={{fontSize:"14px", color:"#74798C"}}>{value}</span>
}

const incNumber = () => {

    return <></>
}

const GraphActivity = ({userId}:props) => {

    /* url : http://localhost:3000/user/${userId}/activity */

    const baseUrl : string = "http://localhost:3000/user/"+userId+"/activity" // 12 or 18

    const [activitiesDatas, setActivitiesDatas] = useState<Array <session>>()

    useEffect(() => {
        const fetchData = async () =>  {
            try{
                const response = await fetch(baseUrl)
                const datas = await response.json()
                /*const sessions : Array <session> = datas.data.sessions
                const sDatas : string = JSON.stringify(sessions)*/
                console.log(JSON.stringify(datas.data.sessions))
                setActivitiesDatas(datas.data.sessions)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
        <article className="graphActivity-container">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={835}
            height={240}
            data={activitiesDatas}
            barCategoryGap={60}
            barGap={8}
            margin={{top: 48, bottom: 0, left:0, right:0}}
            >
                <CartesianGrid 
                strokeDasharray="3 3"
                vertical={false}
                />
                <XAxis 
                tickLine={false}
                color='#DEDEDE'
                width={1}
                domain={['dataMin', 'dataMax']}
                /*tickFormatter={incNumber}*/
                />
                <YAxis 
                dataKey="kilogram" 
                tickLine={false}
                axisLine={false}
                orientation="right"
                type="number"
                domain={['dataMin-1', 'dataMax+0']}
                yAxisId={0}
                allowDecimals={false}
                /*ticks={[69,70,71]}*/
                tickCount={3}
                />
                <YAxis 
                hide={false}
                dataKey="calories" 
                orientation="left"
                yAxisId={1}
                tickCount={3}
                type="number" 
                domain={[0, 600]}
                allowDecimals={false}
                />
                <Tooltip
                viewBox={{ x: 0, y: 0, width: 40, height: 65 }}
                itemStyle={{fontSize:7, color:"#fff"}}
                contentStyle={{backgroundColor:"#E60000", outline:"none", border:"none", display:"flex", flexDirection:"column"}}
                wrapperStyle={{outline:"none", border:"none"}}
                />
                <Legend 
                align="right"
                iconType="circle"
                iconSize={8}
                width={277}
                payload={[{ value: 'Poids (kg)', type: 'circle', id: 'ID01', color: '#282D30'}, { value: 'Calories brûlées (kCal)', type: 'circle', id: 'ID02', color: '#E60000' }]}
                formatter={resizedLegendValue}
                verticalAlign="top"
                wrapperStyle={{top:0}}
                />
                <Bar 
                dataKey="kilogram" 
                fill="#282D30"
                barSize={7}
                yAxisId={0}
                radius={[25, 25, 0, 0]}
                minPointSize={6}
                /*maxBarSize={91}*/
                />
                <Bar 
                dataKey="calories" 
                fill="#E60000" 
                barSize={7}
                yAxisId={1}
                radius={[25, 25, 0, 0]}
                /*maxBarSize={126}*/
                />
            </BarChart>
            </ResponsiveContainer>
        </article>
    )

}

export default GraphActivity
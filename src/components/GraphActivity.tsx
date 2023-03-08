import { useEffect, useState } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Text } from 'recharts';
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

const CustomYAxisTick = (value : number, index:number) : string => {
    return (value+1).toString()
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
                //console.log(JSON.stringify(datas.data.sessions))
                setActivitiesDatas(datas.data.sessions)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    const CustomTooltip = ({payload} : any) => {
        if(payload && payload.length){
            return(
                <div className="graphActivity-tooltip">
                    <p>{payload[0].value+'Kg'}</p>
                    <p>{payload[1].value+'KCal'}</p>
                </div>
            )
        }

    }

    return(
        <article className="graphActivity-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                /*width={835}
                height={240}*/
                data={activitiesDatas}
                barCategoryGap='10%'
                barGap={8}
                margin={{top: 48, bottom: 0, left:0, right:0}}
                >
                    <text x={12} y={14} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan x="62" dy="0" fontSize="14">Activité quotidienne</tspan>
                    </text>
                    <CartesianGrid 
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#DEDEDE"
                    />
                    <XAxis 
                    tickLine={false}
                    width={1}
                    domain={['dataMin', 'dataMax']}
                    tick={{ fill: '#9B9EAC' }}
                    stroke="#DEDEDE"
                    tickFormatter={CustomYAxisTick}
                    />
                    <YAxis /* 2 Y axis to scale both bars in a different way */
                    hide={false}
                    dataKey="kilogram" 
                    tickLine={false}
                    axisLine={false}
                    orientation="right"
                    type="number"
                    domain={['dataMin-1', 'dataMax']}
                    yAxisId={0}
                    allowDecimals={false}
                    /*ticks={[69,70,71]}*/
                    tickCount={3} /* 3 values on Y weight axis */
                    tick={{ fill: '#9B9EAC' }}
                    />   
                    <YAxis 
                    hide={true}
                    dataKey="calories" 
                    orientation="left"
                    yAxisId={1}
                    tickCount={3}
                    type="number" 
                    domain={['dataMin-100', 'dataMax']}
                    allowDecimals={false}
                    tick={{ fill: '#9B9EAC' }}
                    />
                    <Tooltip
                    viewBox={{ x: 0, y: 0, width: 40, height: 65 }}
                    /*itemStyle={{fontSize:10, color:"#fff"}}
                    contentStyle={{backgroundColor:"#E60000", outline:"none", border:"none", display:"flex", flexDirection:"column"}}
                    labelStyle={{color:'#000',display:'none'}}*/
                    wrapperStyle={{backgroundColor:"#E60000", outline:"none", border:"none"}}
                    content={CustomTooltip}
                    />
                    <Legend 
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    width={277}
                    payload={[{ value: 'Poids (kg)', type: 'circle', id: 'ID01', color: '#282D30'}, { value: 'Calories brûlées (kCal)', type: 'circle', id: 'ID02', color: '#E60000' }]}
                    formatter={resizedLegendValue}
                    verticalAlign="top"
                    wrapperStyle={{top:0, right:24}}
                    />                       
                    <Bar 
                    dataKey="kilogram" 
                    fill="#282D30"
                    barSize={7} /* width */
                    yAxisId={0} /* 2 Y axis to scale both bars in a different way */
                    radius={[25, 25, 0, 0]}
                    />
                    <Bar 
                    dataKey="calories" 
                    fill="#E60000" 
                    barSize={7}
                    yAxisId={1} /* 2 Y axis to scale both bars in a different way */
                    radius={[25, 25, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </article>
    )

}

export default GraphActivity

/*

<Label stroke="#DEDEDE" value="Pages of my website" offset={0} position="insideTopLeft" />

                    */
import { useEffect, useState } from "react"
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend } from "recharts"
import "../styles/AvgSessionChart.css"

interface props {
    userId : number
}

const AvgSessionChart = ({userId}:props) => {

    interface session {
        day:number
        SessionLength:number
    }

    const formatXTicks = (value : number) => {
        const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
        return week[value-1]
    }

    
    const CustomTooltip = ({payload} : any) => {
        if (payload && payload.length) {
            return (<div style={{backgroundColor:'#fff', color:'#000000', fontSize:'10px', padding:'4px 8px'}}>{payload[0].value} min</div>)
        }
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
                //console.log(JSON.stringify(datas.data.sessions))
                setSessionsDatas(datas.data.sessions)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    const TooltipPayload = [{ name: '05-01', value: 12, unit: 'kg' }]

    return(
        <ResponsiveContainer width="30%" height={260} className="sessionLineChartsContainer">
            <LineChart
            data={sessionsDatas}
            margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
            >
                <Line 
                type='natural' 
                dataKey="sessionLength" 
                stroke="#FF8484" /* linear */
                strokeWidth={2}
                dot={false}
                />
                <XAxis 
                dataKey="day"
                tickLine={false}
                axisLine={false}
                /*ticks={['L', 'M', 'M', 'J', 'V', 'S', 'D']}*/
                tickFormatter={formatXTicks}
                tick={{ fill: '#FF8484' }}
                />
                <YAxis
                hide={true}
                domain={['dataMin-30', 'dataMax+30']}
                />
                <Tooltip
                wrapperStyle={{outline:'none', border:'none'}}
                itemStyle={{color:'#000', fontSize:'10px'}}
                labelStyle={{color:'#000',display:'none'}}
                content={CustomTooltip}
                />
                <Legend
                verticalAlign="top"
                align="left"
                wrapperStyle={{top:20, left:18, color:"#FF8484"}}
                iconSize={0}
                payload={[{ value: 'Durée moyenne des sessions'}]}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default AvgSessionChart

/*

                <Line 
                type='natural' 
                dataKey="sessionLength" 
                stroke="#FF8484"
                strokeWidth={2}
                dot={false}
                />


                <defs>
                    <linearGradient
                        id="linear"
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="100"
                    >
                        <stop offset="0%" stopColor="#FFF" />
                        <stop offset="100%" stopColor="#000" />
                    </linearGradient>
                </defs>

                */
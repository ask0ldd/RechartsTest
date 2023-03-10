import { useEffect, useState } from "react"
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend } from "recharts"
import "../styles/AvgSessionChart.css"

interface props {
    userId : number | undefined
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

    //const TooltipPayload = [{ name: '05-01', value: 12, unit: 'kg' }]

    const onMouseMove = (hoveredData : any) => { // any > needs better typing
        if (hoveredData && hoveredData.activePayload && sessionsDatas && sessionsDatas?.length > 0) {
            const hoveredX = hoveredData.activePayload[0].payload.day
            const index = sessionsDatas?.findIndex(d => d.day === hoveredX)
            const postTooltipBG = document.querySelector('#postTooltipBG')
            postTooltipBG?.setAttribute("x", index*(100/7) + 9 + "%")
            postTooltipBG?.setAttribute("width", 100 - (index*(100/7) + 9) + "%") /* NEEDS TO BE RESPONSIVE */
        }
    }

    const onMouseOut = () => {
        const postTooltipBG = document.querySelector('#postTooltipBG')
        postTooltipBG?.setAttribute("width", "0%")
    }

    if(sessionsDatas && sessionsDatas?.length>0) return(
        <ResponsiveContainer width="30%" height={260} className="sessionLineChartsContainer">
            <LineChart
            data={sessionsDatas}
            margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseOut}
            >
                <rect id="postTooltipBG" x="9%" width="14%" height="100%" opacity="0.2" /* DARK BG AFTER TOOLTIP */
                />
                <Line 
                type='natural' 
                dataKey="sessionLength" 
                stroke="#FF8484" /* TODO LINEAR GRADIEN INSTEAD */
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
                payload={[{ value: 'Dur??e moyenne des sessions'}]}
                />
            </LineChart>
        </ResponsiveContainer>
    )

    return(<></>) // do some error div to replace the chart that can't be displayed
}

export default AvgSessionChart
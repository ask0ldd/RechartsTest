import { useEffect, useState } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface props {
    userId : number
}

interface session {
    day:Date
    kilogram:number
    calories:number
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
                setActivitiesDatas(datas.data.sessions)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
            <BarChart
            width={700}
            height={145}
            data={activitiesDatas}
            barCategoryGap="54"
            barGap="8"
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid 
                strokeDasharray="3 3"
                vertical={false}
                />
                <XAxis />
                <YAxis dataKey="kilogram" interval="preserveStartEnd"/>
                <Tooltip />
                <Legend 
                verticalAlign="top"
                height={14}
                />
                <Bar 
                dataKey="kilogram" 
                fill="#282D30"
                barSize={7}
                />
                <Bar 
                dataKey="calories" 
                fill="#E60000" 
                barSize={7}
                />
            </BarChart>
    )

}

export default GraphActivity
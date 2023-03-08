import { RadialBarChart, RadialBar, PieChart, ResponsiveContainer, Pie } from "recharts";
import '../styles/ScoreChart.css'

const ScoreChart = ({score} : any) => {

    /* if score exist only sinon error message */
    return(
        <ResponsiveContainer width="30%" height={260} className="ScoreChartContainer"> 
            <PieChart>
                <Pie data={score} dataKey="score" cx="50%" cy="50%" outerRadius={90} innerRadius={80} fill="#FF0000" />
                <text x={12} y={14} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan x="50%" y="42%" fontSize="26" fontWeight={600}>{score[0].score*100}%</tspan>
                        <tspan x="50%" dy="1.54rem" fontSize="16" fill="#74798C">de votre</tspan>
                        <tspan x="50%" dy="1.4rem" fontSize="16" fill="#74798C">objectif</tspan>
                </text>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default ScoreChart

/*

            <PieChart>
                <Pie data={score} dataKey="score" cx="50%" cy="50%" outerRadius={90} innerRadius={80} fill="#FF0000" />
                <text x={12} y={14} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan x="50%" y="42%" fontSize="26" fontWeight={600}>{score[0].score*100}%</tspan>
                        <tspan x="50%" dy="1.54rem" fontSize="16" fill="#74798C">de votre</tspan>
                        <tspan x="50%" dy="1.4rem" fontSize="16" fill="#74798C">objectif</tspan>
                </text>
            </PieChart>

*/

/*

            <RadialBarChart 
            width={730} 
            height={250} 
            innerRadius="80%" 
            outerRadius="90%" 
            data={score} 
            startAngle={0} 
            endAngle={360}
            >
            <RadialBar fill="#FF0000" background clockWise={true} dataKey='score' />
            </RadialBarChart>

*/
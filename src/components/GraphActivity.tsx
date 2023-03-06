import { useEffect, useState } from "react"

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

    const [activitiesDatas, setActivitiesDatas] = useState<string>()

    useEffect(() => {
        const fetchData = async () =>  {
            try{
                const response = await fetch(baseUrl)
                const datas = await response.json()
                const sessions : Array <session> = datas.data.sessions
                const sDatas : string = JSON.stringify(sessions)
                setActivitiesDatas(sDatas)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [baseUrl])

    return(
        <>
        {activitiesDatas&&activitiesDatas}
        </>
    )

}

export default GraphActivity
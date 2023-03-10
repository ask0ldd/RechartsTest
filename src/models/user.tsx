export interface keyData{
    calorieCount: number
    proteinCount: number
    carbohydrateCount: number
    lipidCount: number
}

interface userInfos{
    firstname : string
    lastname : string
    age : number
}

export interface UserInterface {
    id:number
    userInfos : userInfos
    keyData : keyData
    score? : number /* score / today score issue */
    todayScore? : number
}

export class User {
    #id : number
    #firstname : string
    #lastname : string
    #age : number
    #keyData : keyData
    #score : number

    constructor (userDatas : any){
        this.#id = userDatas?.id
        this.#firstname = userDatas?.userInfos?.firstname
        this.#lastname = userDatas?.userInfos?.lastname
        this.#age = userDatas?.userInfos?.age
        this.#keyData = userDatas?.keyData
        this.#score = userDatas?.score || userDatas?.todayScore /* score / today score issue */
    }

    get firstname(){
        return this.#firstname || 'Unknown User'
    }

    get score(){
        return this.#score || 'N/A'
    }

    get calories(){
        return this.#keyData?.calorieCount || 'N/A'
    }

    get proteins(){
        return this.#keyData?.proteinCount || 'N/A'
    }

    get carbohydrates(){
        return this.#keyData?.carbohydrateCount || 'N/A'
    }

    get lipids(){
        return this.#keyData?.lipidCount || 'N/A'
    }
}
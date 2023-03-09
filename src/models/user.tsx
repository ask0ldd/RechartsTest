interface keyData{
    calorieCount: number
    proteinCount: number
    carbohydrateCount: number
    lipidCount: number
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
        this.#score = userDatas?.score || userDatas?.todayScore
    }

    get firstname(){
        return this.#firstname || 'Unknown User'
    }
}


export enum LoanStatus {
    "pending",
    "active",
    "expired"
}
export interface IHTTPResponse {
    message: string
    data?: any
}

export interface ILoginReq {
    email: string
    password: string
}


export interface IUsers {
    id: number
    name: string
    email: string
    role: string
    password: string
}


export interface ILoans {
    id: string
    amount: string
    maturityDate: string
    status: string
    applicant:{
        name: string
        email: string
        telephone: string
        totalLoan: string
    }
    createdAt: string
}
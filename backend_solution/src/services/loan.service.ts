import { Injectable } from "@nestjs/common";
import loansData from "../data/loans.json"
import { ILoans } from "src/types";

@Injectable()
export class LoanService {
    private loans: ILoans[] = loansData
   
    getLoans(userRole: string, filter: {status: string}): {data?: ILoans[], error?: string}{
        let loans: ILoans[]
        let filteredLoans = this.loans

        if (filter.status){
            filteredLoans = this.loans.filter((loan) => loan.status.toLowerCase() == filter.status.toLowerCase())
        }

        if(userRole == "staff"){    
            loans = filteredLoans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                    totalLoan:"*****"
                }
            }))
        }else{
             loans = filteredLoans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                }
            }))
        }

        return {data:loans}
    }

    getUserLoans(userEmail: string, userRole: string):{data?: ILoans[], error?:string}{
        let loans: ILoans[];
        console.log(userEmail)
        let userLoans = this.loans.filter((loan) =>
            loan.applicant.email.toLowerCase() === userEmail.toLowerCase()
        )  

        if(userRole == "staff"){    
            loans = userLoans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                    totalLoan:"*****"
                }
            }))
        }else{
             loans = userLoans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                }
            }))
        }
        return {data: loans}
    }

    deleteLoan(loanId: string, userRole: string):{error?: string}{
        if(userRole != "superAdmin"){
            return {error:"you do not have permission to perform this action"}
        }
        const remainingLoans = this.loans.filter((loan) => loan.id != loanId)
        this.loans = remainingLoans
        return {}
    }

    getExpiredLoans():{data?: ILoans[], error?: string}{
       const currentDate = new Date()
       const expiredLoans = this.loans.filter((loan)=>{
            const loanExpiryDate = new Date(loan.maturityDate)
            return loanExpiryDate < currentDate
        })

        return {data: expiredLoans}
    }
}

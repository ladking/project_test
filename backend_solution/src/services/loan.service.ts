import { Injectable } from "@nestjs/common";
import loansData from "../data/loans.json"
import { ILoans } from "src/types";

@Injectable()
export class LoanService {
    private loans: ILoans[] = loansData
   
    sanitizeLoan(userRole: string, loans: ILoans[]):ILoans[]{
        let sanitizedLoans:ILoans[]
        if(userRole == "staff"){    
            sanitizedLoans = loans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                    totalLoan:"*****"
                }
            }))
        }else{
             sanitizedLoans = loans.map(({...data})=>({
                ...data,
                applicant:{
                    ...data.applicant,
                }
            }))
        }
        return sanitizedLoans
    }

    getLoans(userRole: string, filter: {status: string}): {data?: ILoans[], error?: string}{
        let filteredLoans = this.loans

        if (filter.status){
            filteredLoans = this.loans.filter((loan) => loan.status.toLowerCase() == filter.status.toLowerCase())
        }

        return {data:this.sanitizeLoan(userRole, filteredLoans)}
    }

    getUserLoans(userEmail: string, userRole: string):{data?: ILoans[], error?:string}{
        let userLoans = this.loans.filter((loan) =>
            loan.applicant.email.toLowerCase() === userEmail.toLowerCase()
        )  
        return {data: this.sanitizeLoan(userRole, userLoans)}
    }

    deleteLoan(loanId: string, userRole: string):{error?: string}{
        if(userRole != "superAdmin"){
            return {error:"you do not have permission to perform this action"}
        }
        const remainingLoans = this.loans.filter((loan) => loan.id != loanId)
        this.loans = remainingLoans
        return {}
    }

    getExpiredLoans(userRole: string):{data?: ILoans[], error?: string}{
        let loans:ILoans[]
        const currentDate = new Date()
       const expiredLoans = this.loans.filter((loan)=>{
            const loanExpiryDate = new Date(loan.maturityDate)
            return loanExpiryDate < currentDate
        })

        return {data: this.sanitizeLoan(userRole, expiredLoans)}
    }
}

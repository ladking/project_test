import { Controller, Get, Query, Param, Delete } from "@nestjs/common";
import { LoanService } from "src/services/loan.service";
import type { IHTTPResponse, LoanStatus } from "src/types";


@Controller("loans")
export class LoanController {
    constructor(private loanService: LoanService) {}

    @Get()
    getLoans(@Query("status") status: LoanStatus): IHTTPResponse{
        const {data, error} = this.loanService.getLoans("staff", {status: status.toString()})
        if(error){
            return {message:error}
        }
        return {message:"success", data: data}
    }

    @Get(":userEmail/get")
    getUserLoans(@Param("userEmail") userEmail: string):IHTTPResponse{
        if(!userEmail){
            return {message: "provide user email"}
        }

       const {data, error} = this.loanService.getUserLoans(userEmail, "staff")
       if(error){
        return {message:error}
       }
        return {message:"success", data:data}
    }

    @Get("/expired")
    getExpiredLoans():IHTTPResponse{
        const {data, error} = this.loanService.getLoans("staff", {status:"expired"})
        if(error){
            return {message:error}
        }
        return {data:data, message:"sucess"}
    }

    @Delete("loanId/delete")
    deleteLoan(@Param("loadId") loanId: string):IHTTPResponse{
        const {error} = this.loanService.deleteLoan(loanId, "staff")
        if(error){
            return {message:"error"}
        }
        return {message:"loan deleted"}
    }

    



}
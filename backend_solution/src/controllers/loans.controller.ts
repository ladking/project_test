import { Controller,Request, Get, Query, Param, Delete, UseGuards, InternalServerErrorException } from "@nestjs/common";
import { LoanService } from "src/services/loan.service";
import type { IHTTPResponse, LoanStatus } from "src/types";
import { AuthGuard } from "src/middlewares/auth.middleware";

@UseGuards(AuthGuard)
@Controller("loans")
export class LoanController {
    constructor(private loanService: LoanService) {}

    @Get()
    getLoans(@Request() req, @Query("status") status: LoanStatus): IHTTPResponse{
       let authClaims = req.user
       if(!authClaims){
            throw new InternalServerErrorException()
       }
        const {data, error} = this.loanService.getLoans(authClaims, {status: status?.toString()})
        if(error){
            return {message:error}
        }
        return {message:"success", data: data}
    }

    @Get(":userEmail/get")
    getUserLoans(@Request() req, @Param("userEmail") userEmail: string):IHTTPResponse{
        let authClaims = req.user
       if(!authClaims){
            throw new InternalServerErrorException()
       }
        if(!userEmail){
            return {message: "provide user email"}
        }

       const {data, error} = this.loanService.getUserLoans(userEmail, authClaims?.role)
       if(error){
        return {message:error}
       }
        return {message:"success", data:data}
    }

    @Get("/expired")
    getExpiredLoans(@Request() req,):IHTTPResponse{
        let authClaims = req.user
        if(!authClaims){
                throw new InternalServerErrorException()
        }
        const {data, error} = this.loanService.getExpiredLoans(authClaims?.role)
        if(error){
            return {message:error}
        }
        return {data:data, message:"sucess"}
    }

    @Delete(":loanId/delete")
    deleteLoan(@Request() req, @Param("loanId") loanId: string):IHTTPResponse{
         let authClaims = req.user
        if(!authClaims){
                throw new InternalServerErrorException()
        }
        const {error} = this.loanService.deleteLoan(loanId, authClaims?.role)
        if(error){
            return {message:"error"}
        }
        return {message:"loan deleted"}
    }

    



}
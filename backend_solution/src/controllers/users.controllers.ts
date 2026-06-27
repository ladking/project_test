import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "src/services/user.service";
import type { IHTTPResponse, ILoginReq } from "src/types";


@Controller("users")
export class UserController{
    constructor(private userService: UserService) {}
    
    @Post("login")
    login(@Body() reqBody: ILoginReq): IHTTPResponse {
        if(!reqBody || !reqBody.email || !reqBody.password){
            return {message:"invalid login credentails"}
        }

        const {token, error} = this.userService.authenticateUser(reqBody.email, reqBody.password)
        if(error){
            return {message: error}
        }

        return {message:"success",  data: {
            token
        }}
    }

    @Post("logout")
    logout(): IHTTPResponse {
        return {message:"logout success"}
    }

}

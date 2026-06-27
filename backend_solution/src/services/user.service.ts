import { Injectable } from '@nestjs/common';
import usersData from "../data/staffs.json"
import type { IUsers } from 'src/types';

import { generateJWT } from 'src/utils/utils';


@Injectable()
export class UserService {
    private readonly users: IUsers[] = usersData


    authenticateUser(email: string, password: string): {token?: string , error?: string | null}{
       const userExist = this.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)
        if(!userExist){
                return {error: "invalid login credentials"}
        }

        let authClaims = {
                role: userExist.role,
                id: userExist.id
        }

        const {token, error} = generateJWT(authClaims, process.env.JWT_SECRET ?? '', '24h')
        if(error){
            return {error: "something went wrong"}
        }
        
       return {token, error: null}
    }
}
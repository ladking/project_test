import { Injectable, InternalServerErrorException } from '@nestjs/common';
import usersData from "../data/staffs.json"
import type { IUsers } from 'src/types';
import { ConfigService } from '@nestjs/config';
import { generateJWT } from 'src/utils/utils';


@Injectable()
export class UserService {
    constructor(private configService: ConfigService) {}

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

        const secretKey = this.configService.get<string>('JWT_SECRET');
        if(!secretKey){
            throw new InternalServerErrorException();
        }
        const {token, error} = generateJWT(authClaims, secretKey, '24h')
        if(error){
            throw new InternalServerErrorException();
        }
        
       return {token, error: null}
    }
}
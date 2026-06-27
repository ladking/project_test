import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { validateJWT } from 'src/utils/utils';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthGuard implements CanActivate {
  private readonly secretKey: string
    constructor(private configService: ConfigService) {
      this.secretKey = this.configService.get<string>("JWT_SECRET") ?? ''
    }
    canActivate(context: ExecutionContext):  boolean{
    const request = context.switchToHttp().getRequest();

    const authToken = this.getTokenFromHeader(request)
    if(!authToken){
        throw new UnauthorizedException();
    }

    const {payload, error} = validateJWT(authToken, this.secretKey)
    if(error){
        throw new UnauthorizedException();
    }

    request['user'] = payload;
    return true
  }


  getTokenFromHeader(request:Request): string | undefined {
    const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
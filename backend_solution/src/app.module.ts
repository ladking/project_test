import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';
import { LoanService } from './services/loan.service';
import { LoanController } from './controllers/loans.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [
     UserController,
     LoanController
  ],
  providers: [
    UserService,
    LoanService
  ],
})
export class AppModule {}

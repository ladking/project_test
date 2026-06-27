import { Module } from '@nestjs/common';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';
import { LoanService } from './services/loan.service';
import { LoanController } from './controllers/loans.controller';

@Module({
  imports: [],
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

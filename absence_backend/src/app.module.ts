import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { AbsentModule } from './absent/absent.module';

@Module({
    imports: [AuthModule, AdminModule, EmployeeModule, AbsentModule],
  })

export class AppModule {}
  
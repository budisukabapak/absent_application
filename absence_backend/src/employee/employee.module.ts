import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/secrets';
import { JwtModule } from '@nestjs/jwt';
import { Employee } from './entities/employe.entity';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password, 
      database: config.db.database,
      entities: [Employee],
      autoLoadEntities: config.env === 'development',
      synchronize: config.env === 'development',
    }),
    TypeOrmModule.forFeature([Employee]),
    EmployeeModule,
    JwtModule.register({
      global: true,
      secret: config.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}

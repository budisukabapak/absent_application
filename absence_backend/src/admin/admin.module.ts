import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/secrets';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password, 
      database: config.db.database,
      entities: [Admin],
      autoLoadEntities: config.env === 'development',
      synchronize: config.env === 'development',
    }),
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global: true,
      secret: config.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}

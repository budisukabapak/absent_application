import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/secrets';
import { Admin } from './entities/auth.entity';
import { AdminModule } from 'src/admin/admin.module';

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
    AdminModule,
    JwtModule.register({
      global: true,
      secret: config.secret,
      signOptions: { expiresIn: '2d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}

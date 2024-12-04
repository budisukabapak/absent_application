import { Module } from '@nestjs/common';
import { AbsentService } from './absent.service';
import { AbsentController } from './absent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/secrets';
import { Absent } from './entities/absent.entity';
import { JwtModule } from '@nestjs/jwt';
import { AbsentRepository } from './absent.repository';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password, 
      database: config.db.database,
      entities: [Absent],
      autoLoadEntities: config.env === 'development',
      synchronize: config.env === 'development',
    }),
    TypeOrmModule.forFeature([Absent]),
    JwtModule.register({
      global: true,
      secret: config.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AbsentController],
  providers: [AbsentService, AbsentRepository],
})
export class AbsentModule {}

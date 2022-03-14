import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ContractsModule } from './contracts/contracts.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SessionsModule } from './sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customer.entity';
import { Session } from './sessions/session.entity';
import { Contract } from './contracts/contract.entity';
import { Invoice } from './invoices/invoice.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm/driver/types/DatabaseType';
import { APP_PIPE } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    CustomersModule,
    ContractsModule,
    InvoicesModule,
    SessionsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: (config: ConfigService) => {
        return {
          type: config.get<DatabaseType>('DB_TYPE'),
          database: config.get<string>('DB_NAME'),
          synchronize: config.get<boolean>('DB_SYNC'),
          entities: [Customer, Session, Contract, Invoice, User],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['secret'] })).forRoutes('*');
  }
}

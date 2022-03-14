import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersSrv: UsersService) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const users = await this.usersSrv.findAll(email);

    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    createUserDto.password = `${salt}.${hash.toString('hex')}`;

    return await this.usersSrv.create(createUserDto);
  }

  async signIn(signInUserDto: Partial<CreateUserDto>) {
    const { email, password } = signInUserDto;
    const [user] = await this.usersSrv.findAll(email);

    if (!user) {
      throw new NotFoundException('bad credentials');
    }

    const [salt, storedHash] = user.password.split('.');
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
    const hash = hashBuffer.toString('hex');

    if (storedHash !== hash) {
      throw new NotFoundException('bad credentials');
    }

    return user;
  }
}

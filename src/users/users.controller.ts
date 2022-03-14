import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersSrv: UsersService,
    private readonly authSrv: AuthService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authSrv.signUp(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(
    @Body() signInUserDto: Partial<CreateUserDto>,
    @Session() session: any,
  ) {
    const user = await this.authSrv.signIn(signInUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('current')
  async currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.usersSrv.findAll(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersSrv.findOne(+id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersSrv.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersSrv.remove(+id);
  }
}

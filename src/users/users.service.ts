import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const { email, password, lastname, firstname } = createUserDto;
    const user = this.repo.create({ email, password, lastname, firstname });

    return this.repo.save(user);
  }

  findAll(email: string): Promise<User[]> {
    return this.repo.find({ email });
  }

  findOne(id: number): Promise<User> {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}

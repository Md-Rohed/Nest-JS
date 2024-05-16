import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@company.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Software Engineer',
    },
    {
      id: 3,
      name: 'Sarah Lee',
      email: 'sarah.lee@company.com',
      role: 'Marketing Specialist',
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Graphic Designer',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINNER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }

    return this.users;
  }

  fineOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }

      return user;
    });

    return this.fineOne(id);
  }

  delete(id: number) {
    const removedUser = this.fineOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

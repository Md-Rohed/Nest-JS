import { Injectable } from '@nestjs/common';

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

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  fineOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINNER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINNER' | 'ADMIN';
    },
  ) {
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

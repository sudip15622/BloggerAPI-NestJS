
import { Injectable } from '@nestjs/common';
import { UserInterface } from 'interfaces/interfaces';


@Injectable()
export class UsersService {
  private readonly users: UserInterface[] = [
    {
      id: "1",
      username: 'john',
      password: 'changeme',
    },
    {
      id: "2",
      username: 'maria',
      password: 'guess',
    },
  ];

  async findUser(username: string): Promise<UserInterface | undefined> {
    return this.users.find(user => user.username === username);
  }
}

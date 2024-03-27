import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from '../schema/user.schema';

@Injectable()
export class UsersCommandReopository {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  public async createUser(user: User): Promise<User> {
    const newUser = await new this.userModel(user);
    return await newUser.save();
  }

  async deleteUser(usertId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(usertId).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Student #${usertId} not found`);
    }
    return deletedUser;
  }
}

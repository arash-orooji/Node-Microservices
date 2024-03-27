import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from '../schema/user.schema';
@Injectable()
export class UsersQueryReopository {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

 
  async getUser(userId: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(`https://reqres.in/api/users?id=${userId}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async getUserAvatar(userId: string): Promise<User> {
    const existingStudent = await this.userModel.findById(userId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingStudent;
  }
 
}

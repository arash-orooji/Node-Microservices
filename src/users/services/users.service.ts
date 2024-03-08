import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/interface/user.interface';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  public async createUser(createUsertDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUsertDto);
    return newUser.save();
  }

  async getUser(userId: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(`https://reqres.in/api/users?id=${userId}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async getUserAvatar(userId: string): Promise<IUser> {
    const existingStudent = await this.userModel.findById(userId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingStudent;
  }

  async deleteUser(usertId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(usertId).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Student #${usertId} not found`);
    }
    return deletedUser;
  }
}

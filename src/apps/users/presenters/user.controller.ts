import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { UserService } from '../application/user.service';
import { GetUserDto } from './dto/get-user.dto';
import { GetSingleUserQurey } from '../application/queries/get-single-user/get-single-user.query';
import { DeleteUserCommand } from '../application/commands/delete-user/delete-user.command';
import { GetAvatarUserQurey } from '../application/queries/get-avatar/get-avatar.query';

@Controller()
export class UserController {
    constructor(private readonly usersService:UserService) {
    }
    @Post('api/users')
    async createUser(    
        @Res() response,
        @Body() body: CreateUserDto) {
            var createdUser = 
                await this.usersService.create(new CreateUserCommand(body.firstName,body.lastName,body.gender,body.avatar));
            return response.status(HttpStatus.CREATED).json({
                message: 'user has been created successfully',
                createdUser,
            });
    }
    @Get('api/user/:userId')
    async getUser(@Res() response, @Param('userId') userId: string) {
            var user = 
                await this.usersService.getSingleUser(new GetSingleUserQurey(userId));
            return response.status(HttpStatus.FOUND).json({
                message: 'user has been created successfully',
                user,
            });
    }

    @Delete('api/user/:id/avatar')
    async deleteUser(@Res() response, @Param('id') userId: string) {
      try {
        const deletedStudent = await this.usersService.DeleteUser(new DeleteUserCommand(userId));
        return response.status(HttpStatus.ACCEPTED).json({
                message: 'User deleted successfully',
                deletedStudent,
              });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
  }
  @Get('api/user/:id/avatar')
  async getAvatar(@Res() response, @Param('id') userId: string) {
    try {
      const deletedStudent = await this.usersService.getavatarUser(new GetAvatarUserQurey(userId));
      return response.status(HttpStatus.ACCEPTED).json({
              message: 'user has been created successfully',
              deletedStudent,
            });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
}
}

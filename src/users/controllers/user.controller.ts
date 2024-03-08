import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { RabbitMQClient } from '../../rabbit-mq/rabbit-mq.client';
import { Express } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RabbitMQPublisher } from '../../rabbit-mq/rabbit-mq.publisher';
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rabbitMQClient: RabbitMQClient,
    private readonly rabbitMQPublisher: RabbitMQPublisher
  ) {}
  @Post('api/users')
  @UseInterceptors(FileInterceptor('file'))
  async createStudent(
    @Res() response,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createUserDto.avatar = file.buffer;
      let newUser = await this.usersService.createUser(createUserDto);
      var result =`{"firstName": "${newUser.firstName}","lastName": "${newUser.lastName}","gender": "${newUser.gender}",}`
      // Send event after save user in database
      this.rabbitMQClient.sendMessage('rpc_queue', result);
      // Publish event after send in queue in pubsub_exchange exchange
      this.rabbitMQPublisher.publishMessage('pubsub_exchange', 'pubsub_key', result);

      return response.status(HttpStatus.CREATED).json({
        message: 'user has been created successfully',
        result,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: user not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get('api/user/:id')
  async getUser(@Res() response, @Param('id') studentId: string) {
    var data = await this.usersService.getUser(studentId);
    var result = data.data;
    return response.status(HttpStatus.FOUND).json({
      message: 'Get User successfully',
      result,
    });
  }
  @Get('api/user/:id/avatar')
  async getUserAvatar(@Res() response, @Param('id') userId: string) {
    try {
      const existingStudent = await this.usersService.getUserAvatar(userId);
      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.end(existingStudent.avatar);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('api/user/:id/avatar')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedStudent = await this.usersService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}

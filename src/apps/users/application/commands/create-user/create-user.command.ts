export class CreateUserCommand {
    constructor(
        public firstName: string,
        public lastName: string,
        public gender: string,
        public avatar: string
    ){}
  }
  
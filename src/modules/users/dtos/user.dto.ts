import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { plainToClass } from 'class-transformer';
import { Exclude, Expose } from 'class-transformer';

export class UserOutgoingDto extends PickType(User, ['username'] as const){
    static buildDto(user: User): UserOutgoingDto{
        return plainToClass(UserOutgoingDto, user, { excludeExtraneousValues: true });
    }
}

export class UserIngoingDto extends PickType(User, ['username', 'password'] as const){
   
}

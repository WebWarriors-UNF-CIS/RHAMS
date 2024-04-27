import { Entity, Fields, BackendMethod } from 'remult';
import * as bcrypt from 'bcryptjs';

@Entity('user', {allowApiCrud: true,})
export class User {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

    @Fields.string()
    email = ''

    @Fields.string()
    password = ''

    @Fields.string()
    passwordHash!: string;

    @BackendMethod({ allowed: true })
    async verifyPassword(password: string) 
    {return await bcrypt.compare(password, this.passwordHash);}
}
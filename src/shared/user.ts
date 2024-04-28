import { Entity, Fields, BackendMethod } from 'remult';
import * as bcrypt from 'bcryptjs';

export enum UserRole 
{
    ADMIN = 'admin',
    GUEST = 'guest'
}

@Entity('user', { allowApiCrud: true })
export class User 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()                       // A unique identifier for the User entity
    id = ''
    @Fields.createdAt()                  // The date and time this User entity was created
    createdAt = new Date()
    @Fields.string({ allowNull: true })  // The ID of the user who last updated this User entity
    createdBy!: string;
    @Fields.updatedAt()                  // The date and time this User entity was last updated
    updatedAt = new Date()
    @Fields.string()                     // The ID of the user who last updated this User entity
    updatedBy!: string;
  //\\//\\//\\|//\\//\\//\\

    @Fields.enum(() => UserRole)
    role!: UserRole;

    @Fields.string()
    email = ''

    @Fields.string()
    password = ''

    @Fields.string()
    passwordHash!: string;

    @BackendMethod({ allowed: true })
    async verifyPassword(password: string) 
    {return await bcrypt.compare(password, this.passwordHash)}

    @BackendMethod({ allowed: UserRole.ADMIN })
    async setPassword(password: string) 
    {this.passwordHash = await bcrypt.hash(password, 10);}
}
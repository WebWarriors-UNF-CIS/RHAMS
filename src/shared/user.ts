import { Entity, Fields, Relations } from 'remult'

@Entity('user', {
  allowApiCrud: true,
})
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
}
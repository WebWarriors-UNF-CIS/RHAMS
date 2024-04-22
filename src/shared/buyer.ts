import { Entity, Fields, Relations } from 'remult'

@Entity('buyer', {
  allowApiCrud: true,
})
export class Buyer {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

  
}
import { Entity, Fields, Relations } from 'remult'

@Entity('media', {
  allowApiCrud: true,
})
export class Media {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

  
}
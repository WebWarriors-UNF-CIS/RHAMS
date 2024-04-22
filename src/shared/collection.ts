import { Entity, Fields, Relations } from 'remult'

@Entity('collection', {
  allowApiCrud: true,
})
export class Collection {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

  
}
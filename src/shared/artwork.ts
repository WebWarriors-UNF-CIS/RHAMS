import { Entity, Fields } from 'remult'

@Entity('artwork', {
  allowApiCrud: true,
})
export class Artwork {
    @Fields.integer()
    id = ''
    @Fields.createdAt()
    createdAt = new Date()
    @Fields.updatedAt()
    updatedAt = new Date()
  
}
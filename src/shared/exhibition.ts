import { Entity, Fields } from 'remult'

@Entity('exhibition', {
  allowApiCrud: true,
})
export class Exhibition {
    @Fields.cuid()
    id = ''
    @Fields.createdAt()
    createdAt = new Date()
    @Fields.updatedAt()
    updatedAt = new Date()
  
}
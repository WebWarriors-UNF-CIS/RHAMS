import { Entity, Fields, Relations } from 'remult'

@Entity('edition', {
  allowApiCrud: true,
})
export class Edition {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()
}
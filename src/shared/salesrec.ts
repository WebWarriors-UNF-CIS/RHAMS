import { Entity, Fields, Relations } from 'remult'

@Entity('salesrec', {
  allowApiCrud: true,
})
export class SalesRec {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

  
}
import { Entity, Fields } from 'remult'

@Entity('salesrec', {
  allowApiCrud: true,
})
export class SalesRec {
    @Fields.cuid()
    id = ''
  
}
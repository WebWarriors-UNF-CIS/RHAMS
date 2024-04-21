import { Entity, Fields } from 'remult'

@Entity('collection', {
  allowApiCrud: true,
})
export class Collection {
    @Fields.cuid()
    id = ''
  
}
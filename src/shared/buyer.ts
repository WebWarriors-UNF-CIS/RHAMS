import { Entity, Fields } from 'remult'

@Entity('buyer', {
  allowApiCrud: true,
})
export class Buyer {
    @Fields.cuid()
    id = ''
  
}
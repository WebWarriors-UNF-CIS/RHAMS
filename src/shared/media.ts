import { Entity, Fields } from 'remult'

@Entity('media', {
  allowApiCrud: true,
})
export class Media {
    @Fields.cuid()
    id = ''
  
}
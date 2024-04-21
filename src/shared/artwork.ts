import { Entity, Fields } from 'remult'

@Entity('artwork', {
  allowApiCrud: true,
})
export class Artwork {
    @Fields.cuid()
    id = ''
  
}
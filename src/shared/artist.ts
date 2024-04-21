import { Entity, Fields } from 'remult'

@Entity('artist', {
  allowApiCrud: true,
})
export class Artist {
    @Fields.cuid()
    id = ''
  
}
import { Entity, Fields } from 'remult'

@Entity('exhibition', {
  allowApiCrud: true,
})
export class Exhibition {
    @Fields.cuid()
    id = ''
  
}
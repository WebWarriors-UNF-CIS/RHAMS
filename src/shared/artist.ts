import { Entity, Fields, Relations } from 'remult'

@Entity('artist', {
  allowApiCrud: true,
})
export class Artist {
    @Fields.cuid()                            // A unique identifier for the artist
    id = '';

    @Fields.createdAt()                       // The date and time this artist entity was created
    createdAt = new Date()

    @Fields.updatedAt()                       // The date and time this artist entity was last updated
    updatedAt = new Date()

}
import { Entity, Fields, Relations } from 'remult'

@Entity('artwork', {
  allowApiCrud: true,
})
export class Artwork {
    @Fields.integer()
    catalogId = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()
  
    //@Relations - > Artist

    @Fields.string()
    title = ''

    //@Relations/Valuelist - > Mediums**?? **ask about this

    //@Fields.json() - > Measurements

    @Fields.dateOnly()
    releaseDate = new Date()

    //@Relations - > Collections

    //@Fields.string()/.json()/Valuelist? - > Location (i.e Museum, Gallery, Living Room, Piano Room, etc) 
    //   or 
    //@Relations - > Location (i.e. New York, Paris, etc) **ask about this

    //@Relations - > Exhibitions

    @Fields.string({ allowNull: true })
    notes = ''

    @Fields.boolean()
    inPortfolioBook = false

    @Fields.string()
    thumbnail = ''

    //@Relations - > Editions
}
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

    @Fields.string()                          // The last name of the artist
    lastName = '';

    @Fields.string()                          // The first name of the artist
    firstName = '';

    @Fields.dateOnly({ allowNull: true })     // The birth date of the artist
    birthDate?: Date;

    @Fields.dateOnly({ allowNull: true })     // The death date of the artist
    deathDate?: Date;

    @Fields.string({ allowNull: true })       // The birth location of the artist
    birthLocation?: string;

    @Fields.string({ allowNull: true })       // The death location of the artist
    deathLocation?: string;

    //@Fields.image()?? - > Thumbnail         // Image of the artist

    //@Relations - > Exhibitions              // Exhibitions the artist has participated in/or featured in
}
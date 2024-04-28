import { Entity, Fields, Relations, remult } from 'remult';
import { Artwork } from './artwork';
import { Exhibition } from './exhibition';
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('artist', { allowApiCrud: true })
export class Artist 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()          // A unique identifier for the Artist entity
    id = ''
    @Fields.createdAt()     // The date and time this Artist entity was created
    createdAt = new Date()
    @Fields.updatedAt()     // The date and time this Artist entity was last updated
    updatedAt = new Date()
  //\\//\\//\\|//\\//\\//\\

    @Fields.string()
    lastName = '';

    @Fields.string()
    firstName = '';

    @Fields.dateOnly({ allowNull: true })
    birthDate?: Date;

    @Fields.dateOnly({ allowNull: true })
    deathDate?: Date;

    @Fields.json({ allowNull: true })
    birthLocation?: any[] = [];

    @Fields.json({ allowNull: true })
    deathLocation?: any[] = [];

    @Fields.string()
    thumbnail = '';

    @Fields.string({ allowNull: true })
    bio = '';

    @Fields.string({ allowNull: true })
    notes = '';

    @Relations.toMany(() => Artwork)
    artworks?: Artwork[];

    @Relations.toMany(() => Exhibition)
    exhibitions?: Exhibition[]; 

    async setBirthLocation(locationsKey: string) 
    {this.birthLocation = await fetchValueListByCategory("Location", remult)}

    async setDeathLocation(locationsKey: string) 
    {this.deathLocation = await fetchValueListByCategory("Location", remult)}
}

// Artist Entity Description:
  // Used to track information about artists stored in the database
  // 
  // The entity should be able to track the following information:
  // 
  // 1. The artist's name (last, first)
  // 2. The artist's birth date
  // 3. The artist's death date (if applicable)
  // 4. The artist's birth location stored as a value list entity
  // 5. The artist's death location stored as a value list entity (if applicable)
  // 6. The artist's thumbnail image (if applicable, placeholder image if not)
  // 7. A brief biography of the artist
  // 8. Optional notes
  // 9. Artworks created by the artist
  // 10. Exhibitions the artist has participated in/or featured in
  //
  // Constraints:
  // The artist entity should be able to track multiple artworks and exhibitions using a one-to-many relationship.
  // The artist entity should be able to track multiple birth and death locations using the value list entity as an intermediary.
  // The artist entity should be able to access information stored in the artwork and exhibition entities.
import { Entity, Fields, Relations, remult } from 'remult'
import { xAr } from './inter/xar'
import { Artwork } from './artwork'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('exhibition', { allowApiCrud: true })
export class Exhibition 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.string()        // A unique identifier for the Exhibition entity (Ex001, Ex002, etc.)
    id!: string;
    @Fields.createdAt()     // The date and time this Exhibition entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Exhibition entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

  @Fields.string()
  title!: string;

  @Fields.json()
  venueNames: any [] = [];

  @Fields.json()
  venueLocation: any [] = [];

  @Fields.dateOnly()
  loadInDate?: Date;

  @Fields.dateOnly()
  startDate!: Date;

  @Fields.dateOnly()
  endDate!: Date;

  @Relations.toMany(() => xAr, 'exhibitions')
  artists!: xAr[];

  @Relations.toMany(() => Artwork)
  artworks?: Artwork[];

  @Fields.string({ allowNull: true })
  notes?: string;

  async setVenueLocation(locationsKey: string) 
  {this.venueLocation = await fetchValueListByCategory("Location", remult)}

  async setVenues(venuesKey: string) 
  {this.venueNames = await fetchValueListByCategory("Venue", remult)}
}

  // Exhibition Entity Description:
  // Used to track the exhibitions of artwork, including the title, venue, dates, artists, and artworks featured.
  //
  // The entity should be able to track the following information:
  //
  // 1. Title of the exhibition (i.e. 'Reuben Hale: A Retrospective')
  // 2. Venue Name (from ValueList entity, i.e. 'Gallery Name', 'Museum Name', etc.)
  // 3. Location of venue (from ValueList entity, i.e. 'City, State if in the US, or Country/some combination of the three')
  // 4. Load in date of the exhibition (date only)
  // 5. Start date of the exhibition (date only)
  // 6. Closing date of the exhibition (date only)
  // 7. Artists featured in the exhibition (from Artist entity)
  // 8. Artworks featured in the exhibition (from Artwork entity)
  // 9. Optional notes
  //
  // Constraints:
  // The exhibition entity should be able to track multiple artists and artworks using a many-to-many relationship.
  // The exhibition entity should be able to access information stored in the artist and artwork entities.
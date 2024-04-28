import { Entity, Fields, Relations, remult } from 'remult'
import { Artist } from './artist'
import { Edition } from './edition'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('artwork', { allowApiCrud: true })
export class Artwork 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.integer()       // A unique identifier for the Artwork entity
    catalogId = ''
    @Fields.createdAt()     // The date and time this Artwork entity was created 
    createdAt = new Date()
    @Fields.updatedAt()     // The date and time this Artwork entity was last updated
    updatedAt = new Date()
  //\\//\\//\\|//\\//\\//\\
  
    @Fields.string()
    title = '';

    @Relations.toOne(() => Artist)
    artist?: Artist;

    @Fields.dateOnly()
    releaseDate = new Date();

    @Fields.string()
    thumbnail = '';

    @Fields.string()
    description = '';

    @Fields.json()
    types: any[] = [];

    @Fields.json()
    mediums: any[] = [];

    @Fields.json()
    measurements: { height?: number; width?: number; depth?: number } = {};

    @Fields.string({ allowNull: true })
    notes = '';

    @Fields.boolean()
    inPortfolioBook = false;

    @Relations.toMany(() => Edition)
    editions?: Edition[];

    async setMedium(mediumKey: string) 
    {this.mediums = await fetchValueListByCategory("Medium", remult);}

    async setType(typeKey: string) 
    {this.types = await fetchValueListByCategory("Type", remult);}
}

// Artwork Entity Description:
  // Used to track information about individual pieces of artwork.
  // 
  // The entity should be able to track the following information:
  //
  // 1. Title of the artwork
  // 2. Artist who created the artwork (from Artist entity)
  // 3. Date the artwork was created (year only)
  // 4. Image of the artwork (thumbnail, placeholder if not available)
  // 5. Description of the artwork (optional)
  // 6. Type of the artwork (i.e. painting, sculpture, drawing, etc) (from ValueList entity)
  // 7. Medium of the artwork (i.e. oil on canvas, acrylic on paper, etc) (from ValueList entity)
  // 8. Measurements of the artwork (height, width, depth) (optional, dependent on medium and type)
  // 9. Optional notes (optional)
  // 10. Is the artwork in the portfolio book? (boolean)
  // 11. Editions of the artwork (from Edition entity)
  // 12. Collections and Exhibitions the artwork is featured in (compiled from data stored in Edition entities)
  //
  // Constraints:
  // When an artwork is created, it should be linked to the Artist entity that created it, and a batch of Edition entities should be created for the artwork.
  // The artwork entity should be able to track multiple editions using a one-to-many relationship.
  // The artwork entity should be able to access information stored in the artist and edition entities.
  // The artwork entity should be able to track the type, medium, and measurements of the artwork using the value list entity as an intermediary.

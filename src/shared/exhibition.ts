import { Entity, Fields, Relations, remult } from 'remult'
import { Artwork } from './artwork'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('exhibition', { allowApiCrud: true })
export class Exhibition 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.string()        
    id!: string;
    @Fields.createdAt()     // The date and time this Exhibition entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Exhibition entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

  @Fields.number()
  exID!: number;
  
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

  //@Relations.toMany
  //featuredArtists!: Artist[];

  //@Relations.toMany
  //featuredArtworks?: Artwork[];

  @Fields.string({ allowNull: true })
  notes?: string;

  async setVenueLocation(locationsKey: string) 
  {this.venueLocation = await fetchValueListByCategory("Location", remult)}

  async setVenues(venuesKey: string) 
  {this.venueNames = await fetchValueListByCategory("Venue", remult)}
}
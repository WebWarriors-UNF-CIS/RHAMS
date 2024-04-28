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
    catalogID!: number;
    @Fields.createdAt()     // The date and time this Artwork entity was created 
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Artwork entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\
  
    @Fields.string()
    title!: string;

    @Relations.toOne(() => Artist)
    artist!: Artist;

    @Fields.dateOnly()
    releaseDate?: Date;

    @Fields.string()
    thumbnail?: string;

    @Fields.string()
    description?: string;

    @Fields.json()
    types: any[] = [];

    @Fields.json()
    mediums: any[] = [];

    @Fields.json()
    measurements: { height?: number; width?: number; depth?: number } = {};

    @Fields.string()
    notes?: string;

    @Fields.boolean()
    inPortfolioBook!: boolean;

    @Relations.toMany(() => Edition, 
    {
      field: "ID",
      defaultIncluded: true
    })
    editions?: Edition[];

    //@Relations.toMany
    //featuredIn?: Exhibition[];

    async setMedium(mediumKey: string) 
    {this.mediums = await fetchValueListByCategory("Medium", remult);}

    async setType(typeKey: string) 
    {this.types = await fetchValueListByCategory("Type", remult);}
}
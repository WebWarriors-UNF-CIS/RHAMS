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
    @Fields.cuid()
    ID!: number;
    @Fields.createdAt()
    createdAt!: Date;
    @Fields.updatedAt()
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.number()
    catalogNumber!: number;
    
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

    @Fields.number()
    numEditions!: number;

    @Fields.string()
    notes?: string;

    @Fields.boolean()
    inPortfolioBook!: boolean;

    //@Relations.toMany(() => Edition, 
    //editions?: Edition[];

    //@Relations.toMany
    //featuredIn?: Exhibition[];

    /*/ Function to call and create editions based on local variable numEditions \*\
    async createEditions(numEditions: number) 
    {
        for (let i = 0; i < numEditions; i++) 
        {
            let edition = new Edition()
            edition.save();
        }
    }
    /*/
    async setMedium(mediumKey: string) 
    {this.mediums = await fetchValueListByCategory("Medium", remult);}

    async setType(typeKey: string) 
    {this.types = await fetchValueListByCategory("Type", remult);}
}
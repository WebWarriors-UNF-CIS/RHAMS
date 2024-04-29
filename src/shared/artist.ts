import { Entity, Fields, Relations, remult } from 'remult';
import { Artwork } from './artwork';
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('artist', { allowApiCrud: true })
export class Artist 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid() 
    id!: string;
    @Fields.createdAt()
    createdAt!: Date;
    @Fields.updatedAt()
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.string()
    lastName!: string;

    @Fields.string()
    firstName!: string;

    @Fields.dateOnly()
    birthDate?: Date;

    @Fields.dateOnly()
    deathDate?: Date;

    @Fields.json()
    birthLocation?: any[] = [];

    @Fields.json()
    deathLocation?: any[] = [];

    @Fields.string()
    website?: string;

    @Fields.string()
    thumbnail?: string;

    @Fields.string()
    bio?: string

    @Fields.string()
    notes?: string

    //@Relations.toMany
    //artworks?: Artwork[];

    //@Relations.toMany
    //featuredIn?: Exhibition[];

    async setBirthLocation(locationsKey: string) 
    {this.birthLocation = await fetchValueListByCategory("Location", remult)}

    async setDeathLocation(locationsKey: string) 
    {this.deathLocation = await fetchValueListByCategory("Location", remult)}
}
import { Entity, Fields, Relations, remult } from 'remult'
import { Collection } from './collection'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('buyer', { allowApiCrud: true })
export class Buyer 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()          // A unique identifier for the Buyer entity
    ID!: number;
    @Fields.createdAt()     // The date and time this Buyer entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Buyer entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.string()
    lastName!: string;

    @Fields.string()
    firstName!: string;

    @Fields.json()
    location?: any[] = [];

    @Fields.json()
    contactInfo: { address?: string; phone?: string; email?: string } = {};

    @Fields.string()
    notes?: string;

    //@Relations.toMany
    //collections?: Collection[];

    //@Relations.toMany
    //purchases?: SalesRecord[];

    async setBuyerLocation(locationsKey: string) 
    {this.location = await fetchValueListByCategory("Location", remult)}
}
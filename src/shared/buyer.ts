import { Entity, Fields, Relations, remult } from 'remult'
import { Collection } from './collection'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('buyer', { allowApiCrud: true })
export class Buyer 
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
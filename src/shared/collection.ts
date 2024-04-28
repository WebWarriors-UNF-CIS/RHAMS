import { Entity, Fields, Relations, remult } from 'remult'
import { Buyer } from './buyer'
import { fetchValueListByCategory } from '../utils/valueListDriver'

export enum AcquisitionMethod
{
    Purchase = 'Purchase',
    Gift = 'Gift',
    Inheritance = 'Inheritance',
    Trade = 'Trade',
    Other = 'Other'
}

@Entity('collection', { allowApiCrud: true })
export class Collection 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()          // A unique identifier for the Collection entity
    ID!: number;
    @Fields.createdAt()     // The date and time this Collection entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Collection entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.string()
    name!: string;

    @Relations.toOne(() => Buyer)
    owner?: Buyer;

    @Fields.enum(() => AcquisitionMethod)
    acquisitionMethod!: AcquisitionMethod;

    @Fields.json()
    location?: any [] = [];

    @Fields.dateOnly()
    acquisitionDate!: Date;

    @Fields.string({ allowNull: true })
    notes?: string;

    //@Relations.toMany
    //editions?: Edition[];

    async setCollectionLocation(locationsKey: string) 
    {this.location = await fetchValueListByCategory("Location", remult)}
}
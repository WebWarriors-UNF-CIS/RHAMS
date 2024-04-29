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
    @Fields.cuid()
    id!: string;
    @Fields.createdAt()
    createdAt!: Date;
    @Fields.updatedAt()
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
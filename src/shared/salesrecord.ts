import { Entity, Fields, Relations, remult } from 'remult'
import { Edition } from './edition'
import { Buyer } from './buyer'
import { Collection } from './collection'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('salesrecord', { allowApiCrud: true })
export class SalesRecord 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.number()        // Maybe use an invoice number instead of a cuid?
    invoiceNumber!: number;
    @Fields.createdAt()     // The date and time this SalesRecord entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this SalesRecord entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Relations.toOne(() => Edition)
    edition!: Edition;

    @Relations.toOne(() => Buyer)
    buyer!: Buyer;

    @Relations.toOne(() => Collection)
    collection!: Collection;

    @Fields.json()
    foundry: any [] = [];

    @Fields.number()
    priceFromFoundary!: number;

    @Fields.number()
    priceToBuyer!: number;

    @Fields.dateOnly()
    saleDate!: Date;

    @Fields.string()
    notes?: string;

    async setFoundry(foundryKey: string)
    {this.foundry = await fetchValueListByCategory("Foundry", remult);}
}
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
    @Fields.cuid()          // Maybe use an invoice number instead of a cuid?
    invoiceNum = ''
    @Fields.createdAt()     // The date and time this SalesRecord entity was created
    createdAt = new Date()
    @Fields.updatedAt()     // The date and time this SalesRecord entity was last updated
    updatedAt = new Date()
  //\\//\\//\\|//\\//\\//\\

    @Relations.toOne(() => Edition)
    edition?: Edition;

    @Relations.toOne(() => Buyer)
    buyer?: Buyer;

    @Relations.toOne(() => Collection)
    collection?: Collection;

    @Fields.json()
    foundry: any [] = [];

    @Fields.number()
    priceFromFoundary = 0;

    @Fields.number()
    priceToBuyer = 0;

    @Fields.dateOnly()
    saleDate = new Date();

    @Fields.string()
    notes = '';

    async setFoundry(foundryKey: string)
    {this.foundry = await fetchValueListByCategory("Foundry", remult);}
}

// Sales Record Entity Description: 
// Used to track the sale of editions, including the buyer, price, date, and any notes
// This entity should be able to pull all relevant information from the Edition, Buyer, and Collection entities as it will be used to update the Edition entity with the most recent sale information
// The entity should be able to track the following information:  
//
// 1. Edition (Edition) -> The edition that was sold
// 2. Buyer (Buyer) -> The buyer and new owner of the edition
// 3. Collection (Collection) -> The collection the edition was sold from
// 4. Foundry (ValueList) -> The foundry that produced the edition (Name, Location, Contact Info)
// 5. Price from Foundary (number) -> The price the foundry charged for the edition
// 6. Price to Buyer (number) -> The price the buyer paid for the edition
// 7. Sale Date (Date) -> The date the edition was sold
// 8. Notes (string) -> Any notes about the sale
//
// Constraints:
// The sales record entity should be able to access information stored in the edition, buyer, and collection entities
// The sales record entity should be able to update the edition entity with the most recent sale information
// The sales record entity should be able to track the edition, buyer, and collection of the sale
import { Entity, Field, Fields, Relations, remult } from 'remult';
import { Artwork } from './artwork';
import { Buyer } from './buyer';
import { Collection } from './collection';
import { Exhibition } from './exhibition';
import { SalesRecord } from './salesrecord';
import { fetchValueListByCategory } from '../utils/valueListDriver'

/*/ Make Compound ID \*\
@Entity('edition',        // Replace current @Entity decorator with this one
{ 
  allowApiCrud: true, 
  id:
  {
    caption: 'Edition ID',
  }
})
\*/

@Entity('edition', { allowApiCrud: true })
export class Edition 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\  
    @Fields.string()        // Compound ID, Artwork catalog number and the Edition number represented as a letter (i.e. '001-AA, 001-AB, etc.')        
    ID!: string;                          
    @Fields.createdAt()     // The date and time this Edition entity was created
    createdAt!: Date;
    @Fields.updatedAt()     // The date and time this Edition entity was last updated
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Relations.toOne(() => Artwork)
    parentArtwork?: Artwork;

    @Fields.string()
    editionNumber!: string;

    @Fields.json()
    foundry?: any [] = [];

    @Fields.dateOnly()
    creationDate?: Date;

    @Relations.toOne(() => Buyer)
    currentOwner?: Buyer;

    //@Relations.toMany
    //previousOwners?: Buyer[];

    @Fields.json()
    currentLocation?: any [] = [];

    @Relations.toOne(() => Collection)
    currentCollection?: Collection;

    //@Relations.toMany
    //previousCollections?: Collection[];

    @Fields.boolean()
    inExhibition!: boolean;

    @Relations.toOne(() => Exhibition)
    currentExhibition?: Exhibition;

    //@Relations.toMany
    //previousExhibitions?: Exhibition[];

    @Fields.boolean()
    forSale!: boolean;

    @Relations.toMany(() => SalesRecord, 
    {
      field: "invoiceNumber",
      defaultIncluded: true
    })
    salesHistory?: SalesRecord[];

    get lastSaleDate(): Date | undefined 
    {
      if (!this.salesHistory || this.salesHistory.length === 0) 
        {return undefined;}
      return this.salesHistory
          .map(record => record.saleDate)
          .sort((a, b) => b.getTime() - a.getTime())[0];
    }

    generateCompoundID(catalogId: string, editionLetter: string) 
    {this.ID = `${catalogId}-${editionLetter}`}

    async setFoundry(foundryKey: string)
    {this.foundry = await fetchValueListByCategory("Foundry", remult);}

    async setCurrentLocation(locationsKey: string) 
    {this.currentLocation = await fetchValueListByCategory("Location", remult)}
}
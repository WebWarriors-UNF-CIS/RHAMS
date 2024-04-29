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
    @Fields.cuid()              
    id!: string;                         
    @Fields.createdAt()
    createdAt!: Date;
    @Fields.updatedAt()
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.string()
    edID!: string;          // Compound ID, Artwork catalog number and the Edition number represented as a letter (i.e. '001-AA, 001-AB, etc.')
    
    @Fields.string()
    editionLetter!: string; // The letter representing the Edition number (i.e. 'AA', 'AB', etc.)

    @Fields.number()
    totalEditions!: number;

    @Relations.toOne(() => Artwork)
    parentArtwork?: Artwork;

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

    //@Relations.toMany
    //salesHistory?: SalesRecord[];

    /*/
    get lastSaleDate(): Date | undefined 
    {
      if (!this.salesHistory || this.salesHistory.length === 0) 
        {return undefined;}
      return this.salesHistory
          .map(record => record.saleDate)
          .sort((a, b) => b.getTime() - a.getTime())[0];
    }
    /*/
    
    generateCompoundID(catalogId: string, editionLetter: string) 
    {this.edID = `${catalogId}-${editionLetter}`}

    async setFoundry(foundryKey: string)
    {this.foundry = await fetchValueListByCategory("Foundry", remult);}

    async setCurrentLocation(locationsKey: string) 
    {this.currentLocation = await fetchValueListByCategory("Location", remult)}
}
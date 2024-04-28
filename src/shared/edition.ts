import { Entity, Field, Fields, Relations, remult } from 'remult';
import { Artwork } from './artwork';
import { Buyer } from './buyer';
import { Collection } from './collection';
import { Exhibition } from './exhibition';
import { EdB } from './inter/edb';
import { EdC } from './inter/edc';
import { EdX } from './inter/edx';
import { SalesRecord } from './salesrecord';
import { fetchValueListByCategory } from '../utils/valueListDriver'


@Entity('edition', { allowApiCrud: true })
export class Edition 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\  
    @Fields.string()        // Compound ID, Artwork catalog number and the Edition number represented as a letter (i.e. '001-AA, 001-AB, etc.')        
    id!: string;                          
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

    @Relations.toMany(() => EdB, 'editions')
    previousOwners?: EdB[];

    @Fields.json()
    currentLocation?: any [] = [];

    @Relations.toOne(() => Collection)
    currentCollection?: Collection;

    @Relations.toMany(() => EdC, 'editions')
    previousCollections?: EdC[];

    @Fields.boolean()
    inExhibition!: boolean;

    @Relations.toOne(() => Exhibition)
    currentExhibition?: Exhibition;

    @Relations.toMany(() => EdX, 'editions')
    previousExhibitions?: EdX[];

    @Fields.boolean()
    forSale!: boolean;

    @Relations.toMany(() => SalesRecord, 'edition')
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
    {this.id = `${catalogId}-${editionLetter}`}

    async setFoundry(foundryKey: string)
    {this.foundry = await fetchValueListByCategory("Foundry", remult);}

    async setCurrentLocation(locationsKey: string) 
    {this.currentLocation = await fetchValueListByCategory("Location", remult)}
}

  // Edition Entity Description:
  // Used to track the details of editions, which is a lot of information, but it should all be null by default
  // 
  // The entity should be able to track the following information:
  // 
  // 1. Artwork (Artwork) -> Id of the artwork this edition is based on (should be shared between editions of the same batch)
  // 2. Artist (Artist) -> The artist who created the artwork this edition is based on (should be shared between editions of the same batch)
  // 3. Edition Number (string) -> The number of the edition (i.e. 1 of 10, 2 of 8, etc.)
  // 4. Foundry (ValueList) -> The foundry that produced the edition (Name, Location, Contact Info)
  // 5. Date of Creation (Date) -> The date the edition was created (Year only)
  // 6. Current Owner (Buyer) -> The current owner of the edition (should be the most recent buyer found in SalesRecord[], or default value (artwork of reuban hale, inc.) if no sales have been made yet)
  // 7. Previous Owners (Buyer[]) -> A list of all previous owners of the edition (should reference all previous buyers found in SalesRecord[])
  // 8. Current Location (string) -> The current location of the edition, referenced from collections**
  // 9. Current Collection (Collection) -> The current collection the edition is in (should be the most recent collection found in SalesRecord[] or default value (artwork of reuban hale, inc.) if no sales have been made yet)
  // 10. Previous Collections (Collection[]) -> A list of all previous collections the edition has been in (should reference all previous collections found in SalesRecord[])
  // 11. In an Exhibition? then: Current Exhibition (Exhibition) -> Is the edition currently in an exhibition? (if the boolean is true, this should reference the most recent exhibition found in Exhibition[])
  // 12. Exhibitions (Exhibition[]) -> A list of all exhibitions this edition has been featured in
  // 13. For Sale? then: Date of Last Sale (Date) -> Is the edition currently for sale? (This should check if the current date is within the exhibition dates)
  // 14. Sales History (SalesRecord[]) -> A list of all sales records for this edition
  //
  // Constraints:
  // Edition entities will be created in batches when a new artwork is created, and default values will be assigned to Owner and Current Collection as determinded by the Buyer and Collection datatables.
  // After that, every edition entity will be initialized with null values for every other field except the id, createdAt, updatedAt, edition number, and artwork id fields.
  // These edition entities will be updated with the relevant information as sales are made and the edition is moved to different collections and exhibitions.
  // The edition entity should be able to track multiple previous owners, collections, and exhibitions using a one-to-many relationship.
  // The edition entity should be able to access information stored in the artwork, artist, collection, sales record, and exhibition entities.
  // The edition entity should be able to track the current owner, location, and collection of the edition.
import { Entity, Fields, Relations, remult } from 'remult'
import { Buyer } from './buyer'
import { EdC } from './inter/edc'
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
    id!: number;
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

    @Relations.toMany(() => EdC, 'collections')
    editions?: EdC[];

    async setCollectionLocation(locationsKey: string) 
    {this.location = await fetchValueListByCategory("Location", remult)}
}

  // Collection Entity Description:
  // Used to track the personal collections of artwork editions, their owners, and acquisition information.
  //
  // The entity should be able to track the following information:
  //
  // 1. Collection Name (i.e. 'The Robert W. Hill Collection')
  // 2. Owner of the collection (i.e. Buyer)
  // 3. Acquisition Method (i.e. Purchase, Gift, Inheritance, etc.)
  // 4. Location of the collection (i.e. City, State if in the US, or Country/some combination of the three)
  // 5. Acquisition Date (i.e. the date the edition was acquired) - Should inherit from SalesRecord entity, but can be manually set if no sales record exists
  // 6. Notes (optional)
  // 7. Featured Artist (from Edition entity) 
  // 8. Featured Artworks (from Edition entity)
  // 9. Editions in the collection
  //
  // Constraints:
  // Collections will always be named after the owner (i.e. 'The Robert W. Hill Collection' for a buyer named Robert W. Hill), the only exception is the "Artwork of Reuban Hale Collection", which serves as the default collection for all editions without sales records.
  // Collections are not always the result of a purchase, they can be gifts, inheritances, etc. The acquisition method should be tracked using an enum.
  // The collection entity should be able to track multiple editions using a one-to-many relationship.
  // Collections should only have one artist, buyer, and location.
  // A buyer can have multiple collections, and an artist can be featured in multiple collections.
  // Collections should be able to track the acquisition dates of the editions in the collection.
  // Although an artwork can be featured in multiple collections, the edition should only be in one collection.
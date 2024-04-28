import { Entity, Fields, Relations, remult } from 'remult'
import { Collection } from './collection'
import { sBu } from './inter/sbu'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('buyer', { allowApiCrud: true })
export class Buyer 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()          // A unique identifier for the Buyer entity
    id!: number;
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

    @Relations.toMany(() => Collection, 'owner')
    collections?: Collection[];

    @Relations.toMany(() => sBu, 'buyers')
    salesRecords?: sBu[];

    async setBuyerLocation(locationsKey: string) 
    {this.location = await fetchValueListByCategory("Location", remult)}
}

  // Buyer Entity Description:
  // Used to track the buyers of editions, their collections, and contact information.
  //
  // The entity should be able to track the following information:
  // 
  // 1. Buyer Name (Last, First)
  // 2. Location of buyer (i.e. City, State, Country)
  // 3. Contact Information (i.e. Address, Phone, Email)
  // 4. Optional notes
  // 5. Collections owned by the buyer (i.e. Collection)
  // 6. Editions purchased by the buyer (i.e. Sales Records)
  //
  // Constraints:
  // The first 'buyer' entity should be referenced as 'Artwork of Reuban Hale' and should be the default buyer for all editions without sales records. 
  // The buyer entity should be able to track multiple collections and editions using a many-to-many relationship.
  // The buyer entity should be able to track multiple locations using the value list entity as an intermediary.

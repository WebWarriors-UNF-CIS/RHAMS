import { Entity, Fields, Relations } from 'remult';
import { Artist } from '../artist';
import { Buyer } from '../buyer';
import { Collection } from '../collection';
import { Edition } from '../edition';
import { Exhibition } from '../exhibition';
import { SalesRecord } from '../salesrecord';


@Entity<xAr>('xar', 
{ id: {artistID: true, exhibitionID: true }, allowApiCrud: true })
export class xAr
{
    @Fields.string()
    artistID!: string

    @Fields.string()
    exhibitionID!: string

    @Relations.toOne<xAr, Exhibition>(() => Exhibition, 'exhibitionID')
    exhibitions!: Exhibition;   
}
//TODO: add more entities here\\
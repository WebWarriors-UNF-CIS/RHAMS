import { Entity, Fields, Relations } from 'remult';
import { Buyer } from '../buyer';
import { SalesRecord } from '../salesrecord';

@Entity('sbu', { allowApiCrud: true })
export class sBu
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Buyer)
    buyers!: Buyer;

    @Relations.toOne(() => SalesRecord)
    salesRecords!: SalesRecord;
}
import { Entity, Fields, Relations } from 'remult';
import { Buyer } from '../buyer';
import { Edition } from '../edition';

@Entity('edb', { allowApiCrud: true })
export class EdB
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Edition)
    editions!: Edition;

    @Relations.toOne(() => Buyer)
    buyers!: Buyer;
}
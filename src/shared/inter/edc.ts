import { Entity, Fields, Relations } from 'remult';
import { Collection } from '../collection';
import { Edition } from '../edition';

@Entity('edc', { allowApiCrud: true })
export class EdC
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Edition)
    editions!: Edition;

    @Relations.toOne(() => Collection)
    collections!: Collection;
}
import { Entity, Fields, Relations } from 'remult';
import { Collection } from '../collection';
import { Media } from '../media';

@Entity('mco', { allowApiCrud: true })
export class mCo
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Collection)
    collections!: Collection;

    @Relations.toOne(() => Media)
    media!: Media;
}
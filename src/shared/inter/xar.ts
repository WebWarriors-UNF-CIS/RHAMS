import { Entity, Fields, Relations } from 'remult';
import { Artist } from '../artist';
import { Exhibition } from '../exhibition';

@Entity('xar', { allowApiCrud: true })
export class xAr
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Exhibition)
    exhibitions!: Exhibition;

    @Relations.toOne(() => Artist)
    artists!: Artist;
}
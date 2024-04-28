import { Entity, Fields, Relations } from 'remult';
import { Artist } from '../artist';
import { Media } from '../media';

@Entity('mar', { allowApiCrud: true })
export class mAr
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Artist)
    artists!: Artist;

    @Relations.toOne(() => Media)
    media!: Media;
}
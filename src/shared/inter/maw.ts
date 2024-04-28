import { Entity, Fields, Relations } from 'remult';
import { Artwork } from '../artwork';
import { Media } from '../media';

@Entity('maw', { allowApiCrud: true })
export class mAw
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Artwork)
    artworks!: Artwork;

    @Relations.toOne(() => Media)
    media!: Media;
}
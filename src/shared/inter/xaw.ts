import { Entity, Fields, Relations } from 'remult';
import { Artwork } from '../artwork';
import { Exhibition } from '../exhibition';

@Entity('xaw', { allowApiCrud: true })
export class xAw
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Exhibition)
    exhibitions!: Exhibition;

    @Relations.toOne(() => Artwork)
    artworks!: Artwork;
}
import { Entity, Fields, Relations } from 'remult';
import { Exhibition } from '../exhibition';
import { Media } from '../media';

@Entity('mex', { allowApiCrud: true })
export class mEx
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Exhibition)
    exhibitions!: Exhibition;

    @Relations.toOne(() => Media)
    media!: Media;
}
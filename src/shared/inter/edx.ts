import { Entity, Fields, Relations } from 'remult';
import { Exhibition } from '../exhibition';
import { Edition } from '../edition';

@Entity('edx', { allowApiCrud: true })
export class EdX
{
    @Fields.cuid()
    id!: number

    @Relations.toOne(() => Edition)
    editions!: Edition;

    @Relations.toOne(() => Exhibition)
    exhibitions!: Exhibition;
}
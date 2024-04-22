import { Entity, Fields, Relations } from 'remult'

@Entity('edition', {
  allowApiCrud: true,
})
export class Edition {
    @Fields.cuid()
    id = ''

    @Fields.createdAt()
    createdAt = new Date()

    @Fields.updatedAt()
    updatedAt = new Date()

    //@Relations.belongsTo() -> Parent Artwork record

    //@Fields.valuelist() -> Edition # (i.e. 1/10, 2/10, etc.)

    //@Fields.valuellist() -> Foundry

    //@Realtions.hasMany() -> Collections

    //@Realtions.hasMany() -> Sales Records
}
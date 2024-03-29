import { Entity, Fields, Filter, Relations, SqlDatabase } from "remult"
import { Artist, Type } from "./artist"
import { Sale } from "./sale"
import { Exhibit } from "./exhibit"

@Entity("artworks", {
  allowApiCrud: true
})
export class ArtPiece {
  @Fields.autoIncrement()
  id = 0

  @Fields.integer()
  catalogNum?: number

  @Fields.string()
  title: string = ""

  @Fields.string()
  artist_name?: string =""
  @Relations.toOne(() => Artist, { defaultIncluded: true})
  artist?: Artist

  @Fields.string()
  aquired?: string

  // will only be a year
  @Fields.string()
  created?: string
  
  @Fields.string()
  description: string = ""

  // Do they want multiple Images?
  // HEY add another table... ArtImages... with ArtId, ImageUrl, and maybe a caption
  @Fields.string()
  imageUrl? = ""

  @Relations.toMany(() => Sale, {
    field: "id",
    defaultIncluded: true
  })
  sales?: Sale[]

  @Relations.toMany(() => Exhibit, {
    field: "id",
    defaultIncluded: true
  })
  exhibits?: Exhibit[]

  @Fields.object()
  type = Type.Other

  @Fields.string()
  medium: string = ""

  // What about weight?
  @Fields.string()
  height: string = ""

  @Fields.string()
  width: string = ""

  @Fields.string()
  depth?: string

  // How detailed do they want or need this to be?
  @Fields.string()
  location: string = ""

  static getArtbyArtist = Filter.createCustom<ArtPiece, { name: string}>(
    async (name) => {
      const sql = SqlDatabase.getDb();
      const r = await sql.execute(
        `SELECT artworks.*
        FROM artworks
        JOIN artists ON artworks.artist_id = artists.id
        WHERE artists.name = 'Artist Name';`
      )
      return SqlDatabase.rawFilter((whereFragment) => {
        whereFragment.sql = `artist.name = ${name}`
      })
    }
  )
}
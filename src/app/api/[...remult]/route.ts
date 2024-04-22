import { remultNextApp } from 'remult/remult-next'
import { Artist } from "../../../shared/artist"
import { Artwork } from "../../../shared/artwork"
import { Buyer } from "../../../shared/buyer"
import { Collection } from "../../../shared/collection"
import { Exhibition } from "../../../shared/exhibition"
import { Location } from "../../../shared/location"
import { Media } from "../../../shared/media"
import { SalesRec } from "../../../shared/salesrec"
import { User } from "../../../shared/user"
import { createPostgresDataProvider } from "remult/postgres"

const DATABASE_URL = process.env["POSTGRES_URL"]

const api = remultNextApp({
    entities: [Artist, Artwork, Buyer, Collection, 
               Exhibition, Location, Media, SalesRec, User],
    dataProvider: DATABASE_URL
    ? createPostgresDataProvider({ connectionString: DATABASE_URL })
    : undefined,
})

export const { POST, PUT, DELETE, GET } = api
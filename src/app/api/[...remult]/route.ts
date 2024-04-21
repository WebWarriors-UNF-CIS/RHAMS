import { remultNextApp } from 'remult/remult-next'
import { Artist } from "../../../shared/artist"
import { Artwork } from "../../../shared/artwork"
import { Buyer } from "../../../shared/buyer"
import { Collection } from "../../../shared/collection"
import { Exhibition } from "../../../shared/exhibition"
import { Media } from "../../../shared/media"
import { SalesRec } from "../../../shared/salesrec"
import { User } from "../../../shared/user"

const api = remultNextApp({
    entities: [Artist, Artwork, Buyer, Collection, 
               Exhibition, Media, SalesRec, User],
})

export const { POST, PUT, DELETE, GET } = api
import { Entity, Fields, Relations, remult } from 'remult'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('media', { allowApiCrud: true })
export class Media 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()
    id!: string;
    @Fields.createdAt()
    createdAt!: Date;
    @Fields.updatedAt()
    updatedAt!: Date;
  //\\//\\//\\|//\\//\\//\\

    @Fields.dateOnly()
    publicationDate?: Date;

    @Fields.string()
    thumbnail?: string;

    @Fields.string()
    location?: string;

    @Fields.string()
    title!: string;

    @Fields.string()
    description?: string;

    @Fields.json()
    authors: any [] = [];

    @Fields.json()
    mediaSources: any [] = [];

    @Fields.json()
    mediaTypes: any [] = [];

    @Fields.string()
    url?: string;

    @Fields.string({ allowNull: true })
    notes?: string;

    //@Relations.toMany
    //featuredArtists: Artist[];

    //@Relations.toMany
    //featuredArtworks: Artwork[];

    //@Relations.toMany
    //featuredCollections: Collection[];

    //@Relations.toMany
    //featuredExhibitions: Exhibition[];

    async setAuthors(authorsKey: string)
    {this.authors = await fetchValueListByCategory("Author", remult)}

    async setMediaSources(mediaSourcesKey: string)
    {this.mediaSources = await fetchValueListByCategory("Media Source", remult)}

    async setMediaTypes(mediaTypesKey: string)
    {this.mediaTypes = await fetchValueListByCategory("Media Type", remult)}
}
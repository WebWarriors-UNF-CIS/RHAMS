import { Entity, Fields, Relations, remult } from 'remult'
import { fetchValueListByCategory } from '../utils/valueListDriver'

export enum MediaTypes {
    ARTICLE = 'Article',
    AUDIO = 'Audio',
    BOOK = 'Book',
    FILM = 'Film',
    IMAGE = 'Image',
    INTERVIEW = 'Interview',
    PODCAST = 'Podcast',
    VIDEO = 'Video',
    WEBSITE = 'Website',
}

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

    @Fields.string()
    author?: string

    @Fields.string()
    source?: string

    @Fields.enum(() => MediaTypes)
    type!: MediaTypes;

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

    /*
    async setAuthors(authorsKey: string)
    {this.authors = await fetchValueListByCategory("Author", remult)}

    async setMediaSources(mediaSourcesKey: string)
    {this.mediaSources = await fetchValueListByCategory("Media Source", remult)}

    async setMediaType(typeKey: string) {
      const validTypes = await fetchValueListByCategory("Media Type", remult);
      if (validTypes.includes(typeKey)) {
          this.type = typeKey as MediaTypes;
      } else {
          throw new Error("Invalid type specified.");
      }
  }
  */
}
import { Entity, Fields, Relations, remult } from 'remult'
import { Artist } from './artist'
import { Artwork } from './artwork'
import { Collection } from './collection'
import { Exhibition } from './exhibition'
import { fetchValueListByCategory } from '../utils/valueListDriver'

@Entity('media', { allowApiCrud: true })
export class Media 
{
  //\\//\\//\\|//\\//\\//\\
  //|| Database Fields ||\\
  //\\//\\//\\|//\\//\\//\\
    @Fields.cuid()          // A unique identifier for the Media entity
    id = ''
    @Fields.createdAt()     // The date and time this Media entity was created
    createdAt = new Date()
    @Fields.updatedAt()     // The date and time this Media entity was last updated
    updatedAt = new Date()
  //\\//\\//\\|//\\//\\//\\

    @Fields.dateOnly()
    publicationDate = new Date();

    @Fields.string()
    thumbnail = '';

    @Fields.string()
    location = '';

    @Fields.string()
    title = '';

    @Fields.string()
    description = '';

    @Fields.json()
    authors: any [] = [];

    @Fields.json()
    mediaSources: any [] = [];

    @Fields.json()
    mediaTypes: any [] = [];

    @Fields.string()
    url = '';

    @Fields.string({ allowNull: true })
    notes = '';

    @Relations.toMany(() => Artist)
    artists?: Artist[];

    @Relations.toMany(() => Artwork)
    artworks?: Artwork[];

    @Relations.toMany(() => Collection)
    collections?: Collection[];

    @Relations.toMany(() => Exhibition)
    exhibitions?: Exhibition[];

    async setAuthors(authorsKey: string)
    {this.authors = await fetchValueListByCategory("Author", remult)}

    async setMediaSources(mediaSourcesKey: string)
    {this.mediaSources = await fetchValueListByCategory("Media Source", remult)}

    async setMediaTypes(mediaTypesKey: string)
    {this.mediaTypes = await fetchValueListByCategory("Media Type", remult)}
}

// Media Entity Description: 
// Used to track media coverage of the artist, artwork, collection, or exhibition.
// 
// The entity should be able to track the following information:  
//                              
// 1. Date of publication                                                                             
// 2. Title of the media                                                                              
// 3. Description of the media                                                                      
// 4. Author of the media                                                                             
// 5. Media Source (i.e. news article, video, etc.)                                                
// 6. Media Type (i.e. news article, video, etc.)                                          
// 7. URL of the media                                                                      
// 8. Image associated with the media                                                        
// 9. Optional notes                                                                          
// 10. Location of the media                                                                
// 11. Artist(s) featured in the media                                                       
// 12. Artwork(s) featured in the media                                                   
// 13. Collection(s) featured in the media                                                    
// 14. Exhibition(s) featured in the media
//                                                     
// Constraints:                                                                               
// The media entity should be able to track multiple artists, artworks, collections, and exhibitions using a many-to-many relationship. 
// The media entity should be able to track multiple authors, media sources, and media types using the value list entity as an intermediary.         

import { Entity, Fields, Relations, remult } from 'remult'
import { Artist } from './artist'
import { Edition } from './edition'
import { fetchValueListByCategory } from '../utils/valueListDriver'

export enum Types {
  PAINTING = 'painting',
  SCULPTURE = 'sculpture',
  PHOTOGRAPHY = 'photography',
  DRAWING = 'drawing',
  PRINT = 'print',
  MIXEDMEDIA = 'mixed media',
  CERAMICS = 'ceramics',
  GLASS = 'glass',
  TEXTILES = 'textiles',
  FURNITURE = 'furniture',
}

export enum Mediums {
  OIL = 'oil',
  ACRYLIC = 'acrylic',
  WATERCOLOR = 'watercolor',
  PASTEL = 'pastel',
  CHARCOAL = 'charcoal',
  GRAPHITE = 'graphite',
  INK = 'ink',
  PENCIL = 'pencil',
  MIXEDMEDIA = 'mixed media',
  BRONZE = 'bronze',
  CLAY = 'clay',
  GLASS = 'glass',
  FABRIC = 'fabric',
  WOOD = 'wood',
  METAL = 'metal',
  PLASTER = 'plaster',
  FIBERGLASS = 'fiberglass',
  PLASTIC = 'plastic',
  CONCRETE = 'concrete',
  PAPER = 'paper',
  CANVAS = 'canvas',
  STONE = 'stone',
  TEXTILE = 'textile',
  CERAMIC = 'ceramic',
  PORCELAIN = 'porcelain',
  EARTHENWARE = 'earthenware',
  STONEWARE = 'stoneware',
  TERRACOTTA = 'terracotta',
}

@Entity('artwork', { allowApiCrud: true })
export class Artwork 
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

    @Fields.number()
    catalogNumber!: number;
    
    @Fields.string()
    title!: string;

    @Relations.toOne(() => Artist)
    artist!: Artist;

    @Fields.dateOnly()
    releaseDate?: Date;

    @Fields.string()
    thumbnail?: string;

    @Fields.string()
    description?: string;

    @Fields.enum(() => Types)
    type!: Types;

    @Fields.enum(() => Mediums)
    medium!: Mediums;

    @Fields.json()
    measurements: { height?: number; width?: number; depth?: number } = {};

    @Fields.number()
    numEditions!: number;

    @Fields.string()
    notes?: string;

    @Fields.boolean()
    inPortfolioBook!: boolean;

    //@Relations.toMany(() => Edition, 
    //editions?: Edition[];

    //@Relations.toMany
    //featuredIn?: Exhibition[];

    /*/ Function to call and create editions based on local variable numEditions \*\
    async createEditions(numEditions: number) 
    {
        for (let i = 0; i < numEditions; i++) 
        {
            let edition = new Edition()
            edition.save();
        }
    }
    /*/
    async setMedium(mediumKey: string) {
      const validMediums = await fetchValueListByCategory("Medium", remult);
      if (validMediums.includes(mediumKey)) {
          this.medium = mediumKey as Mediums;
      } else {
          throw new Error("Invalid medium specified.");
      }
  }

    async setType(typeKey: string) {
      const validTypes = await fetchValueListByCategory("Type", remult);
      if (validTypes.includes(typeKey)) {
          this.type = typeKey as Types;
      } else {
          throw new Error("Invalid type specified.");
      }
  }
}
import { Entity, Fields } from 'remult'

@Entity('valueLists', { allowApiCrud: true })
export class ValueList 
{
  @Fields.autoIncrement()
  id: number = 0

  @Fields.string({ caption: "Category" })   // e.g., 'medium', 'material', 'location', etc.
  category: string = ''

  @Fields.string({ caption: "Value" })      // The actual value like 'Oil on Canvas', 'Bronze', 'New York', etc.
  value: string = ''                 
}

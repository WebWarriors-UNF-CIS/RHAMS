import { Entity, Fields } from 'remult'

@Entity('valueLists', { allowApiCrud: true })
export class ValueList 
{
  @Fields.cuid()                            // A unique identifier for the list entity, could be combine with category to make it easy to find the list
  id = ''

  @Fields.string({ caption: "Category" })   // e.g., 'medium', 'material', 'location', 'foundary', etc.
  category: string = ''

  @Fields.json({ caption: "Value" })        // The actual value like 'medium:Oil on Canvas', 'material:Bronze', 'location(city:New York, state:NY)', 'foundary(foundaryname:Fine Arts Foundary, city:Fort Pierce, state:FL, contactinfo:...)' etc.               
  value: any = {}
}

// ValueList Entity Description:
  // Used to track various lists of values that can be used to populate dropdowns, creatables, or other selection fields
  // This entity should be able to track the category and value of the list, so that it can be easily referenced by other entities for field validation
  // The entity should be able to track the following information:
  // 1. A unique identifier for the list entity
  // 2. The category in which the value belongs
  // 3. The actual value being assigned to that category
  // Constraints:
  // The list entity should be able to track multiple values for a single category
  // The list entity should be able to track multiple categories with multiple values using a many-to-many relationship with the category and value entities
  // The list entity should be able to track the value of the list entity as a JSON object so that it retains its structure when referenced by other entities
  //
  // Example 1:
  //
  // Category: 'medium'
  // Value: 'Oil on Canvas'
  // Category: 'medium'
  // Value: 'Acrylic on Paper'
  // Category: 'medium'
  // Value: 'Watercolor on Board'
  // 
  // The above example shows how the list entity can be used to track multiple values for a single category. This can be used to populate a dropdown list in the UI for selecting the medium of an artwork,
  // but can also be used to validate the input of the medium field in the artwork entity to ensure that only valid values are entered. So if a user tries to enter 'Oil on Paper' as the medium of an artwork, 
  // the system can check the list entity to see if that value is a valid medium and if it is not found, it can add it to the list entity as a new value for the 'medium' category.
  //
  // Example 2:
  // 
  // Category: 'location'
  // Value: { city: 'New York', state: 'NY', country: 'USA' }
  // Category: 'location'
  // Value: { city: 'Los Angeles', state: 'CA', country: '' }
  // Category: 'location'
  // Value: { city: 'Paris', state: '', country: 'France'}
  // Category: 'location'
  // Value: { city: '', state: 'CA', country: 'USA'}
  // Category: 'location'
  // Value: { city: '', state: '', country: 'UK'}
  //
  // In this example, the list entity is used to track the location of various entities like artworks, artists, collections, etc. The value of the location is stored as a JSON object so that it retains its structure.
  // This can be used to populate a dropdown list in the UI for selecting the location of an entity, but can also be used to validate the input of the location field in the entity to ensure that locations are not duplicated.
  // So if a user tries to enter 'New York, NY', and 'New York, USA' as the location of an entity, they should be interpreted as the same entity.
          

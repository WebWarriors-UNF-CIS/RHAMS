import { Remult } from 'remult';
import { Artist } from '../../../../shared/artist'; // import the Artist entity
import { Location } from '../../../../shared/valuelist'; // import the Location entity

// Define a type for the input data
interface InputArtist {
    firstName: string;
    lastName: string;
    birthDate?: Date;
    deathDate?: Date;
    birthLocation?: string;
    deathLocation?: string;
  }
  
  async function addArtist(input: InputArtist) 
  {
    const remult = new Remult();
  
    const parseLocation = (locationDescription: string | undefined) => 
        {
            if (!locationDescription) 
            {
                return { 
                    city: undefined, 
                    state: undefined, 
                    country: undefined 
                };
                }

            const parts = locationDescription.split(',').map(part => part.trim());

            if (parts.length === 1) 
            {
                // If there is no comma, it's assumed to be a country only.
                return { 
                    city: undefined, 
                    state: undefined, 
                    country: parts[0] 
                };
            } 
            else 
            {
                const endPart = parts[1];

                // Check if the second part is a state (assuming 2 letters are state abbreviations)
                if (endPart.length === 2) 
                {
                    return { 
                        city: parts[0], 
                        state: endPart, 
                        country: 'United States' 
                    };
                } 
                else 
                {
                    return { 
                        city: parts[0], 
                        state: undefined, 
                        country: endPart 
                    };
                }
            }
        };
  
    let birthLocation, deathLocation;
  
    // Handle birth location
    if (input.birthLocation) 
    {
      const { city, state, country } = parseLocation(input.birthLocation);  
      birthLocation = 
      await remult.repo(Location).findFirst ({city, state, country}) 
        || 
      await remult.repo(Location).insert    ({city, state, country});
    }
  
    // Handle death location
    if (input.deathLocation)
    {
      const { city, state, country } = parseLocation(input.deathLocation);
      deathLocation = 
      await remult.repo(Location).findFirst ({city, state, country}) 
        || 
      await remult.repo(Location).insert    ({city, state, country});
    }
  
    // Create a new instance of the Artist entity
    const artist = remult.repo(Artist).create({
      firstName: input.firstName,
      lastName: input.lastName,
      birthDate: input.birthDate,
      deathDate: input.deathDate,
      birthLocation: birthLocation ? `${birthLocation.city || ''}, ${birthLocation.state || ''}, ${birthLocation.country || ''}`.trim() : undefined,
      deathLocation: deathLocation ? `${deathLocation.city || ''}, ${deathLocation.state || ''}, ${deathLocation.country || ''}`.trim() : undefined
    });
  
    // Save the artist
    await remult.repo(Artist).save(artist);
  }
  
  // Example usage
  addArtist({
    firstName: 'Claude',
    lastName: 'Monet',
    birthLocation: 'Paris, France',
    deathLocation: 'Giverny, France'
  });

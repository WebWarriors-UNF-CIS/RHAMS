import { Entity, Fields } from 'remult';

@Entity('location', { allowApiCrud: true })
export class Location {
@Fields.cuid()
id = '';

@Fields.string({ allowNull: true })
city?: string;

@Fields.string({ allowNull: true })
state?: string;

@Fields.string({ allowNull: true })
country?: string;
  
  get formattedLocation() {
    if (this.state) 
    {
        return `${this.city}, ${this.state}`;
    } 
    else if (this.city) 
    {
      return `${this.city}, ${this.country}`;
    } 
    else 
    {
      return this.country;
    }
  }
}

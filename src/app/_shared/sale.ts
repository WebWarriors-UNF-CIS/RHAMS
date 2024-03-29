import { Entity, Fields, Relations } from "remult";
import { ArtPiece } from "./art";

@Entity("sales", {
  allowApiCrud: true
})
export class Sale {
    @Fields.autoIncrement()
    id = 0;

    @Relations.toOne(() => ArtPiece)
    artPiece?: ArtPiece;
    // will there be multiple art pieces in a sale?

    @Fields.string()
    price: string = "";

    @Fields.string()
    date: string = "";

    @Fields.string()
    foundry: string = ""; // what is this? does she want to store more information about the foundry?

    @Fields.string()
    buyer: string = ""; // does she want to store more information about the buyer? or just the name?

    @Fields.string()
    location: string = "";

    // rights given to the buyer
    @Fields.string()
    rights?: string = "";

    @Fields.string()
    notes: string = "";

    /* may be nice to have a relation

    */
}
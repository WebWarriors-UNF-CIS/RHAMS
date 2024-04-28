import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ArtistData = {
  id: string
  lastName: string
  firstName: string
}
 
export const columns: ColumnDef<ArtistData>[] = [
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

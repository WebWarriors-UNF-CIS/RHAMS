import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExhibitDetailData = {
  artworkTitle: string
  location: string
  acquired: DateConstructor
  medium: string
}
 
export const columns: ColumnDef<ExhibitDetailData>[] = [
  {
    accessorKey: "artworkTitle",
    header: "Artwork Title",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "acquired",
    header: "Acquired",
  },
  {
    accessorKey: "medium",
    header: "Medium",
  }
]

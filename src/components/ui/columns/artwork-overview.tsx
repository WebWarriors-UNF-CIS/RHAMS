import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ArtworkData = {
  artworkTitle: string
  artistName: string
  location: string
  acquired: DateConstructor
  medium: string
}
 
export const columns: ColumnDef<ArtworkData>[] = [
  {
    accessorKey: "artworkTitle",
    header: "Artwork Title",
  },
  {
    accessorKey: "artistName",
    header: "Artist Name",
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

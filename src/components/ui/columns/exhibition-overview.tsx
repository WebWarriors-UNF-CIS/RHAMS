import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExhibitionData = {
    exhibitionId: string
    artworkTitle: string
    exhibitionTitle: string
    museum: string
    opening: DateConstructor
    closing: DateConstructor
}
 
export const columns: ColumnDef<ExhibitionData>[] = [
  {
    accessorKey: "artworkTitle",
    header: "Artwork Title",
  },
  {
    accessorKey: "exhibitionTitle",
    header: "Exhibition Title",
  },
  {
    accessorKey: "museum",
    header: "Museum",
  },
  {
    accessorKey: "opening",
    header: "Opening",
  },
  {
    accessorKey: "closing",
    header: "Closing",
  }
]

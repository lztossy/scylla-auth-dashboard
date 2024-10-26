import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/tabel"

const dummyData = [
  { user: "John Branton", scyllaId: "a3b4c5d", product: "Fortnite", expiry: "10/23/2024" },
  { user: "Joe Biden", scyllaId: "e6f7g8h", product: "Valorant", expiry: "10/23/2024" },
  { user: "Hillary Clinton", scyllaId: "i9j0k1l", product: "Fortnite", expiry: "10/23/2024" },
  { user: "Donald Trump", scyllaId: "m2n3o4p", product: "Valorant", expiry: "10/23/2024" },
]

export function TrackerDashboard() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Scylla ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Expiry</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow key={row.scyllaId}>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.scyllaId}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.expiry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function GuestTableSkeleton() {
  return (
    <div className="lg:block overscroll-x-scroll overflow-hidden my-6">
      <div className="flex items-center justify-center my-6">
        <Button disabled>
          <Skeleton className="w-20 h-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {["Navn", "Medgjester", "Allergier", "Vegetar", "Forrett", "Middag", "Dessert"].map((title, i) => (
              <TableHead key={i}>
                <Skeleton className="w-24 h-4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="sticky left-0 bg-white max-w-[150px]">
                <Skeleton className="w-28 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4 bg-red-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-10 h-4" />
              </TableCell>
              {[...Array(3)].map((_, colIndex) => (
                <TableCell key={colIndex} className="space-y-2">
                  <Skeleton className="w-[150px] h-4" />
                  <Skeleton className="w-[180px] h-10 rounded-md" />
                  <Skeleton className="w-[120px] h-3" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

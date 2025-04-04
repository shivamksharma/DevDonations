'use client';

import { DateRange } from 'react-day-picker';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  Row,
  HeaderGroup,
  Cell,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Donation {
  id: string;
  donor: string;
  amount: number;
  category: string;
  status: string;
  date: string;
}

interface DonationsTableProps {
  dateRange: DateRange | undefined;
}

export default function DonationsTable({
  dateRange,
}: DonationsTableProps) {
  // Mock data - replace with actual data fetching
  const data: Donation[] = [
    {
      id: '1',
      donor: 'John Doe',
      amount: 100,
      category: 'Education',
      status: 'Completed',
      date: '2024-01-01',
    },
    {
      id: '2',
      donor: 'Jane Smith',
      amount: 200,
      category: 'Healthcare',
      status: 'Pending',
      date: '2024-01-02',
    },
    {
      id: '3',
      donor: 'Bob Johnson',
      amount: 150,
      category: 'Environment',
      status: 'Completed',
      date: '2024-01-03',
    },
    {
      id: '4',
      donor: 'Alice Brown',
      amount: 300,
      category: 'Animal Welfare',
      status: 'Failed',
      date: '2024-01-04',
    },
    {
      id: '5',
      donor: 'Charlie Wilson',
      amount: 250,
      category: 'Human Rights',
      status: 'Completed',
      date: '2024-01-05',
    },
  ];

  const columns: ColumnDef<Donation>[] = [
    {
      accessorKey: 'donor',
      header: 'Donor',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: { row: Row<Donation> }) => {
        const amount = row.getValue('amount') as number;
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: { row: Row<Donation> }) => {
        const date = row.getValue('date') as string;
        return new Date(date).toLocaleDateString();
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Donation>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Donation>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell: Cell<Donation, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 
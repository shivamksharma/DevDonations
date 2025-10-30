'use client';

import { useState, useEffect } from 'react';
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
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { getDonations } from '@/services/firebase/donations';

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
  const [data, setData] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const donations = await getDonations();
        // Transform Firebase donations to table format
        const tableData: Donation[] = donations.slice(0, 20).map((donation: any) => ({
          id: donation.id || '',
          donor: donation.donorName || 'Anonymous',
          amount: donation.totalItems || 0,
          category: donation.items?.[0]?.category || 'General',
          status: donation.status || 'pending',
          date: donation.createdAt instanceof Date 
            ? donation.createdAt.toISOString() 
            : donation.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }));
        setData(tableData);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [dateRange]);

  const columns: ColumnDef<Donation>[] = [
    {
      accessorKey: 'donor',
      header: 'Donor',
    },
    {
      accessorKey: 'amount',
      header: 'Items',
      cell: ({ row }: { row: Row<Donation> }) => {
        const amount = row.getValue('amount') as number;
        return `${amount} item${amount !== 1 ? 's' : ''}`;
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
      {loading ? (
        <div className="rounded-md border p-8">
          <div className="text-center text-muted-foreground">
            Loading donations...
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
} 
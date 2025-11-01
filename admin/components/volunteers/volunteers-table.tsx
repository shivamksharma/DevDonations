'use client';

import { useState } from 'react';
import { 
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Search, Star, Mail, Phone } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Volunteer, VolunteerStatus } from '@/shared/utils/types/admin';
import { format } from 'date-fns';

interface VolunteersTableProps {
  data: Volunteer[];
  onStatusUpdate: (id: string, status: VolunteerStatus) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<VolunteerStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function VolunteersTable({ data, onStatusUpdate, onDelete }: VolunteersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Volunteer>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Volunteer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={row.getValue('name')} />
            <AvatarFallback>
              {(row.getValue('name') as string).split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.getValue('name')}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue('phone')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as VolunteerStatus;
        return (
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'experienceLevel',
      header: 'Experience',
      cell: ({ row }) => {
        const level = row.getValue('experienceLevel') as string;
        return (
          <Badge variant="outline">
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'completedTasks',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tasks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue('completedTasks')}</div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => {
        const rating = row.getValue('rating') as number;
        return (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating || 'N/A'}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'joinedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Joined
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue('joinedAt')), 'MMM dd, yyyy')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const volunteer = row.original;

        return (
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                <div className="flex flex-col">
                  {/* Header Section */}
                  <div className="flex items-center gap-6 p-8 pb-6 border-b border-border/50">
                    <Avatar className="h-20 w-20 ring-2 ring-border/20">
                      <AvatarImage src="" alt={volunteer.name} />
                      <AvatarFallback className="text-xl font-semibold bg-muted">
                        {volunteer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl font-bold tracking-tight">{volunteer.name}</h1>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4" />
                          {volunteer.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          {volunteer.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Joined {format(new Date(volunteer.joinedAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="p-8 space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">{volunteer.completedTasks}</div>
                        <div className="text-sm text-muted-foreground mt-1">Tasks Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground flex items-center justify-center gap-1">
                          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                          {volunteer.rating || '—'}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">{volunteer.location || '—'}</div>
                        <div className="text-sm text-muted-foreground mt-1">Location</div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-8">
                      {/* Skills */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.skills.length > 0 ? (
                            volunteer.skills.map(skill => (
                              <Badge key={skill} variant="outline" className="text-xs px-3 py-1 border-border/50">
                                {skill}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No skills specified</span>
                          )}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Availability</h3>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.availability.length > 0 ? (
                            volunteer.availability.map(time => (
                              <Badge key={time} variant="outline" className="text-xs px-3 py-1 border-border/50">
                                {time}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No availability specified</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Experience Level</h3>
                      <Badge variant="secondary" className="text-sm px-4 py-2 w-fit">
                        {volunteer.experienceLevel.charAt(0).toUpperCase() + volunteer.experienceLevel.slice(1)}
                      </Badge>
                    </div>

                    {/* Bio */}
                    {volunteer.bio && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">About</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-none">
                          {volunteer.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(volunteer.email)}
                >
                  Copy email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onStatusUpdate(volunteer.id, 'approved')}>
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusUpdate(volunteer.id, 'active')}>
                  Activate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusUpdate(volunteer.id, 'inactive')}>
                  Deactivate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(volunteer.id)}
                  className="text-red-600"
                >
                  Remove volunteer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Filter volunteers..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
}
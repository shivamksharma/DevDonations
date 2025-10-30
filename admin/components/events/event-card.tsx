'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Progress } from '@/shared/components/ui/progress';
import { 
  Calendar, 
  MapPin, 
  Users, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Copy
} from 'lucide-react';
import { Event, EventStatus } from '@/shared/utils/types/admin';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onStatusUpdate: (id: string, status: EventStatus) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<EventStatus, string> = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  published: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  ongoing: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  completed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const typeColors: Record<string, string> = {
  collection: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  distribution: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  awareness: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  fundraising: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export function EventCard({ event, onStatusUpdate, onDelete }: EventCardProps) {
  const participationPercentage = event.maxParticipants 
    ? (event.registeredParticipants / event.maxParticipants) * 100 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[event.status]}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge variant="outline" className={typeColors[event.type]}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(event.id)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusUpdate(event.id, 'published')}>
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(event.id, 'ongoing')}>
                Mark as Ongoing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(event.id, 'completed')}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(event.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(event.startDate), 'MMM dd, yyyy')}
              {event.startDate !== event.endDate && 
                ` - ${format(new Date(event.endDate), 'MMM dd, yyyy')}`
              }
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {event.registeredParticipants}
              {event.maxParticipants && ` / ${event.maxParticipants}`} participants
            </span>
          </div>
        </div>

        {event.maxParticipants && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Registration Progress</span>
              <span>{Math.round(participationPercentage)}%</span>
            </div>
            <Progress value={participationPercentage} className="h-2" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="" alt={event.organizer} />
            <AvatarFallback className="text-xs">
              {event.organizer.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Organized by {event.organizer}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <div className="flex flex-wrap gap-1">
          {event.requirements.slice(0, 3).map((requirement, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {requirement}
            </Badge>
          ))}
          {event.requirements.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{event.requirements.length - 3} more
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
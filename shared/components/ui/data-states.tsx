import { AlertCircle, FileX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 text-muted-foreground">
        {icon || <FileX className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  retry?: () => void;
  icon?: React.ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading the data. Please try again.",
  retry,
  icon
}: ErrorStateProps) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto">
      <div className="flex items-start gap-3">
        {icon || <AlertCircle className="h-4 w-4" />}
        <div className="flex-1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="mt-1">
            {description}
          </AlertDescription>
          {retry && (
            <Button
              variant="outline"
              size="sm"
              onClick={retry}
              className="mt-3"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}
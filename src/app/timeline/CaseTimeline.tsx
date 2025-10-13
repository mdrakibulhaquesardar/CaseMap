import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CaseTimelineStep } from '@/types';
import { CheckCircle2, Clock, Hourglass, Calendar, FileText } from 'lucide-react';

interface CaseTimelineProps {
  timeline: CaseTimelineStep[];
}

const statusConfig = {
  Completed: {
    icon: CheckCircle2,
    color: 'bg-green-500 text-green-50',
    badgeClass: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700',
  },
  Upcoming: {
    icon: Clock,
    color: 'bg-blue-500 text-blue-50',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700',
  },
  Pending: {
    icon: Hourglass,
    color: 'bg-yellow-500 text-yellow-50',
    badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-700',
  },
};

export default function CaseTimelineDisplay({ timeline }: CaseTimelineProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[35px] top-0 h-full w-0.5 -translate-x-1/2 transform bg-border" />
      
      <div className="space-y-10">
        {timeline.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-0 top-0 flex -translate-x-1/2 transform items-center justify-center">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', config.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 pl-12 pt-2">
                 <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <Badge variant="outline" className={cn('text-xs', config.badgeClass)}>{item.status}</Badge>
                 </div>
                 <div className="mt-1">
                    <h4 className="font-semibold text-foreground text-lg">{item.step}</h4>
                    {item.details && <p className="text-muted-foreground text-sm mt-1">{item.details}</p>}
                 </div>
                 {item.documentLink && (
                    <a href={item.documentLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                        <FileText className="h-4 w-4" />
                        View Document
                    </a>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
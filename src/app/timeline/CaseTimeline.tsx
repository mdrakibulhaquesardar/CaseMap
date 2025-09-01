import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CaseTimelineStep } from '@/types';
import { CheckCircle2, Clock, Hourglass } from 'lucide-react';

interface CaseTimelineProps {
  timeline: CaseTimelineStep[];
}

const statusConfig = {
  Completed: {
    icon: CheckCircle2,
    color: 'bg-green-500',
    text: 'text-green-700',
    badge: 'default',
  },
  Upcoming: {
    icon: Clock,
    color: 'bg-blue-500',
    text: 'text-blue-700',
    badge: 'secondary',
  },
  Pending: {
    icon: Hourglass,
    color: 'bg-yellow-500',
    text: 'text-yellow-700',
    badge: 'outline',
  },
};

export default function CaseTimelineDisplay({ timeline }: CaseTimelineProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
      
      <div className="space-y-10">
        {timeline.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div key={index} className="relative flex items-start gap-6">
              <div className="absolute left-12 top-1.5 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 bg-background">
                <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-white', config.color)}>
                  <Icon className="w-3 h-3" />
                </div>
              </div>
              <div className="pt-0.5 text-right w-20 shrink-0">
                <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.step}</h4>
                <Badge variant={config.badge as any} className={cn("mt-1", config.text)}>{item.status}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

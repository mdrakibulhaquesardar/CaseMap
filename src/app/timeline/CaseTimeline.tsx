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
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8">
        {timeline.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div key={index} className="relative flex items-start pl-12">
              <div className="absolute left-0 top-0 flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background">
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-white', config.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="flex-1 ml-4">
                 <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
                 <div className="flex items-center gap-4 mt-1">
                    <h4 className="font-semibold text-foreground">{item.step}</h4>
                    <Badge variant={config.badge as any} className={cn(config.text)}>{item.status}</Badge>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CaseTimelineStep } from '@/types';
import { CheckCircle2, Clock, Hourglass } from 'lucide-react';

interface CaseTimelineProps {
  timeline: CaseTimelineStep[];
}

const statusConfig = {
  সম্পন্ন: {
    icon: CheckCircle2,
    color: 'bg-green-500',
    badgeClass: 'bg-green-500/10 text-green-700 border-green-500/20',
  },
  আসন্ন: {
    icon: Clock,
    color: 'bg-blue-500',
    badgeClass: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  },
  বিচারাধীন: {
    icon: Hourglass,
    color: 'bg-yellow-500',
    badgeClass: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  },
};

const translatedStatus = (status: 'Completed' | 'Upcoming' | 'Pending'): keyof typeof statusConfig => {
    switch (status) {
        case 'Completed': return 'সম্পন্ন';
        case 'Upcoming': return 'আসন্ন';
        case 'Pending': return 'বিচারাধীন';
    }
}


export default function CaseTimelineDisplay({ timeline }: CaseTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8">
        {timeline.map((item, index) => {
          const statusKey = translatedStatus(item.status);
          const config = statusConfig[statusKey];
          const Icon = config.icon;
          return (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background">
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-white', config.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="flex-1 ml-12">
                 <p className="text-sm font-medium text-muted-foreground">{new Date(item.date).toLocaleDateString('bn-BD')}</p>
                 <div className="flex items-center gap-4 mt-1">
                    <h4 className="font-semibold text-foreground">{item.step}</h4>
                    <Badge variant="outline" className={cn(config.badgeClass)}>{statusKey}</Badge>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import { useEffect, useRef, useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays, addDays, subDays, startOfDay, isBefore, isAfter, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

interface ProjectTimelineViewProps {
  projects: any[];
  onViewProjectDetails: (project: any) => void;
}

export function ProjectTimelineView({ projects, onViewProjectDetails }: ProjectTimelineViewProps) {
  const [visibleRange, setVisibleRange] = useState({
    start: new Date(),
    end: addDays(new Date(), 14),
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to today
    if (timelineRef.current) {
      const todayElement = timelineRef.current.querySelector('[data-today="true"]');
      if (todayElement) {
        todayElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  const days = Array.from(
    { length: differenceInDays(visibleRange.end, visibleRange.start) + 1 },
    (_, i) => addDays(startOfDay(visibleRange.start), i)
  );

  const handleNext = () => {
    setVisibleRange({
      start: addDays(visibleRange.start, 7),
      end: addDays(visibleRange.end, 7),
    });
  };

  const handlePrevious = () => {
    setVisibleRange({
      start: subDays(visibleRange.start, 7),
      end: subDays(visibleRange.end, 7),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
      case "Planifié":
        return "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "Terminé":
        return "bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "En pause":
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Chronologie des projets</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext}>
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-flex min-w-full" ref={timelineRef}>
          {days.map(day => (
            <div 
              key={day.toISOString()} 
              className="min-w-[200px]"
              data-today={isToday(day) ? "true" : "false"}
            >
              <div className={`text-center p-2 sticky top-0 ${
                isToday(day) ? 'bg-primary/10 font-bold' : 'bg-background'
              }`}>
                <div className="font-medium">{format(day, 'EEEE', { locale: fr })}</div>
                <div className={`text-sm ${isToday(day) ? 'text-primary' : 'text-muted-foreground'}`}>
                  {format(day, 'dd MMMM', { locale: fr })}
                </div>
              </div>
              <div className="space-y-2 p-2">
                {sortedProjects
                  .filter(project => {
                    const deadlineDate = new Date(project.deadline);
                    const startDate = new Date(project.startDate);
                    
                    // Afficher le projet le jour de sa date de début et de sa deadline
                    if (isSameDay(deadlineDate, day) || isSameDay(startDate, day)) {
                      return true;
                    }
                    
                    // Afficher le projet s'il est en cours ce jour-là
                    return (
                      (isBefore(startDate, day) || isSameDay(startDate, day)) && 
                      (isAfter(deadlineDate, day) || isSameDay(deadlineDate, day))
                    );
                  })
                  .map(project => {
                    const deadlineDate = new Date(project.deadline);
                    const startDate = new Date(project.startDate);
                    const isDeadline = isSameDay(deadlineDate, day);
                    const isStart = isSameDay(startDate, day);
                    
                    return (
                      <Card 
                        key={`${project.id}-${day.toISOString()}`}
                        className={`hover:shadow-md transition-shadow cursor-pointer ${
                          isDeadline ? 'border-red-500 dark:border-red-400' : 
                          isStart ? 'border-green-500 dark:border-green-400' : ''
                        }`}
                        onClick={() => onViewProjectDetails(project)}
                      >
                        <CardContent className="p-3">
                          <div className="font-medium text-sm truncate">{project.name}</div>
                          <div className="flex justify-between items-center mt-2">
                            <Badge 
                              variant="outline"
                              className={getStatusColor(project.status)}
                            >
                              {project.status}
                            </Badge>
                            {isDeadline && (
                              <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400">
                                Deadline
                              </Badge>
                            )}
                            {isStart && (
                              <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                                Début
                              </Badge>
                            )}
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

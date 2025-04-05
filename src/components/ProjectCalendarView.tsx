
import { useState } from "react";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";

interface ProjectCalendarViewProps {
  projects: any[];
  onViewProjectDetails: (project: any) => void;
}

export function ProjectCalendarView({ projects, onViewProjectDetails }: ProjectCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysWithProjects = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  }).map(day => {
    const projectsOnDay = projects.filter(project => {
      const deadline = new Date(project.deadline);
      return isSameDay(deadline, day);
    });
    
    return {
      date: day,
      projects: projectsOnDay,
    };
  });

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

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy', { locale: fr })}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysWithProjects.map(({ date, projects }) => (
          <Card key={date.toISOString()} className={`p-2 ${
            projects.length > 0 ? 'border-primary/50' : ''
          }`}>
            <div className="text-center mb-1">
              <div className="font-medium">{format(date, 'dd')}</div>
              <div className="text-xs text-muted-foreground">
                {format(date, 'EEEE', { locale: fr })}
              </div>
            </div>
            <CardContent className="p-0 space-y-1 max-h-40 overflow-y-auto">
              {projects.map(project => (
                <div 
                  key={project.id}
                  className="text-xs p-1 rounded bg-accent hover:bg-accent/80 cursor-pointer"
                  onClick={() => onViewProjectDetails(project)}
                >
                  <div className="font-medium truncate">{project.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <Badge 
                      variant="outline"
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

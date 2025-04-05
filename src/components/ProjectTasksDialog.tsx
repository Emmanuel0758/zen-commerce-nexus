
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Check,
  ChevronDown,
  Flag,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ProjectTasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    name: string;
  };
}

// Sample tasks data
const initialTasks = [
  {
    id: "T-001",
    title: "Analyse des besoins",
    description: "Collecte et analyse des besoins utilisateurs",
    status: "Terminé",
    priority: "Élevée",
    assignee: {
      name: "Sophie Martin",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    dueDate: "2025-04-15",
    completed: true,
    estimatedHours: 16,
    loggedHours: 18,
  },
  {
    id: "T-002",
    title: "Conception de l'architecture",
    description: "Définir l'architecture technique du projet",
    status: "En cours",
    priority: "Critique",
    assignee: {
      name: "Antoine Girard",
      avatar: "https://i.pravatar.cc/150?img=67",
    },
    dueDate: "2025-04-22",
    completed: false,
    estimatedHours: 24,
    loggedHours: 10,
  },
  {
    id: "T-003",
    title: "Développement des API",
    description: "Créer les endpoints API nécessaires",
    status: "En cours",
    priority: "Moyenne",
    assignee: {
      name: "Julie Leroy",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
    dueDate: "2025-05-05",
    completed: false,
    estimatedHours: 40,
    loggedHours: 15,
  },
  {
    id: "T-004",
    title: "Conception de l'interface utilisateur",
    description: "Design des maquettes d'interface",
    status: "En cours",
    priority: "Élevée",
    assignee: {
      name: "Emilie Petit",
      avatar: "https://i.pravatar.cc/150?img=49",
    },
    dueDate: "2025-04-28",
    completed: false,
    estimatedHours: 32,
    loggedHours: 22,
  },
  {
    id: "T-005",
    title: "Tests d'acceptation",
    description: "Vérifier que le produit répond aux besoins clients",
    status: "À faire",
    priority: "Normale",
    assignee: {
      name: "Marc Bernard",
      avatar: "https://i.pravatar.cc/150?img=65",
    },
    dueDate: "2025-05-15",
    completed: false,
    estimatedHours: 24,
    loggedHours: 0,
  },
];

export function ProjectTasksDialog({
  open,
  onOpenChange,
  project,
}: ProjectTasksDialogProps) {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "À faire",
    priority: "Normale",
    assignee: "",
    dueDate: "",
    estimatedHours: "",
  });

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || task.status === statusFilter)
  );

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast({
        title: "Erreur",
        description: "Le titre de la tâche est requis",
        variant: "destructive",
      });
      return;
    }

    const task = {
      id: `T-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignee: {
        name: "Non assigné",
        avatar: "",
      },
      dueDate: newTask.dueDate || "Non défini",
      completed: false,
      estimatedHours: parseInt(newTask.estimatedHours) || 0,
      loggedHours: 0,
    };

    setTasks([...tasks, task]);
    setShowNewTaskForm(false);
    setNewTask({
      title: "",
      description: "",
      status: "À faire",
      priority: "Normale",
      assignee: "",
      dueDate: "",
      estimatedHours: "",
    });

    toast({
      title: "Tâche créée",
      description: `La tâche "${task.title}" a été créée avec succès`,
    });
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "Terminé" : "En cours",
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Tâche supprimée",
      description: "La tâche a été supprimée avec succès",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critique":
        return "bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400";
      case "Élevée":
        return "bg-orange-500/20 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
      case "Moyenne":
        return "bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
      case "Normale":
        return "bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "En cours":
        return "bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
      case "À faire":
        return "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "Terminé":
        return "bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "En pause":
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Tâches du projet: {project.name}</DialogTitle>
          <DialogDescription>
            Gérez les tâches associées à ce projet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une tâche..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="À faire">À faire</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En pause">En pause</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowNewTaskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle tâche
            </Button>
          </div>

          {showNewTaskForm && (
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="text-lg font-medium">Créer une nouvelle tâche</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    placeholder="Titre de la tâche"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description détaillée de la tâche"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="À faire">À faire</SelectItem>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Terminé">Terminé</SelectItem>
                        <SelectItem value="En pause">En pause</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, priority: value })
                      }
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critique">Critique</SelectItem>
                        <SelectItem value="Élevée">Élevée</SelectItem>
                        <SelectItem value="Moyenne">Moyenne</SelectItem>
                        <SelectItem value="Normale">Normale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Date d'échéance</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="estimatedHours">Heures estimées</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      placeholder="Estimation en heures"
                      value={newTask.estimatedHours}
                      onChange={(e) =>
                        setNewTask({ ...newTask, estimatedHours: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleCreateTask}>Créer la tâche</Button>
                </div>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="w-[250px]">Tâche</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead className="text-right">Progression</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-muted-foreground">
                      Aucune tâche trouvée
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowNewTaskForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une tâche
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className={task.completed ? "opacity-70" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTaskCompletion(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={task.completed ? "line-through" : ""}>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback>
                            {task.assignee.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {task.dueDate !== "Non défini" 
                        ? new Date(task.dueDate).toLocaleDateString() 
                        : "Non défini"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        {task.loggedHours}/{task.estimatedHours}h (
                        {task.estimatedHours > 0
                          ? Math.round((task.loggedHours / task.estimatedHours) * 100)
                          : 0}
                        %)
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => {
                              toast({
                                title: "Modification de tâche",
                                description: "Fonctionnalité en développement",
                              });
                            }}
                          >
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              toast({
                                title: "Assignation de tâche",
                                description: "Fonctionnalité en développement",
                              });
                            }}
                          >
                            Assigner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => {
                              handleToggleTaskCompletion(task.id);
                            }}
                          >
                            {task.completed ? "Marquer comme non terminée" : "Marquer comme terminée"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

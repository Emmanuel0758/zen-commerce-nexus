
import { useState } from "react";
import { 
  Plus, Filter, Calendar, KanbanSquare, ClipboardList, Clock, Users,
  ChevronDown, Search, Download, FileText, ArrowUpDown, MoreHorizontal,
  Trash, Pencil, Check, Filter, Eye, Share
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ProjectDetailsSheet } from "@/components/ProjectDetailsSheet";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProjectsPage() {
  const { toast } = useToast();
  const [view, setView] = useState("kanban");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [projects, setProjects] = useState([
    {
      id: "PRJ-001",
      name: "Refonte du site web d'e-commerce",
      description: "Moderniser la plateforme e-commerce pour améliorer l'expérience utilisateur et augmenter les conversions.",
      type: "Agile",
      status: "En cours",
      progress: 65,
      priority: "Élevée",
      deadline: "2025-05-15",
      assignedTo: "Équipe de développement web",
      tasks: { total: 28, completed: 18 },
      teamSize: 5,
      startDate: "2025-03-01",
      budget: "75,000 €",
      client: "Fashion Store"
    },
    {
      id: "PRJ-002",
      name: "Implémentation CRM",
      description: "Mise en place d'un système CRM pour améliorer la gestion de la relation client et optimiser les processus de vente.",
      type: "Cycle en V",
      status: "Planifié",
      progress: 25,
      priority: "Moyenne",
      deadline: "2025-06-30",
      assignedTo: "Équipe d'intégration",
      tasks: { total: 42, completed: 10 },
      teamSize: 3,
      startDate: "2025-04-15",
      budget: "50,000 €",
      client: "ABC Distribution"
    },
    {
      id: "PRJ-003",
      name: "Application mobile de livraison",
      description: "Développement d'une application mobile pour la gestion des livraisons en temps réel avec suivi GPS.",
      type: "Agile",
      status: "En cours",
      progress: 48,
      priority: "Élevée",
      deadline: "2025-06-10",
      assignedTo: "Équipe mobile",
      tasks: { total: 36, completed: 17 },
      teamSize: 4,
      startDate: "2025-03-15",
      budget: "65,000 €",
      client: "Express Delivery"
    },
    {
      id: "PRJ-004",
      name: "Migration des systèmes d'inventaire",
      description: "Migration des anciens systèmes d'inventaire vers une nouvelle plateforme cloud avec synchronisation en temps réel.",
      type: "Cycle en V",
      status: "En cours",
      progress: 82,
      priority: "Critique",
      deadline: "2025-04-22",
      assignedTo: "Équipe d'infrastructure",
      tasks: { total: 23, completed: 19 },
      teamSize: 6,
      startDate: "2025-02-10",
      budget: "90,000 €",
      client: "LogiStock"
    },
    {
      id: "PRJ-005",
      name: "Intégration API de paiement",
      description: "Intégration de nouvelles méthodes de paiement et mise à jour du système de traitement des transactions.",
      type: "Agile",
      status: "Terminé",
      progress: 100,
      priority: "Élevée",
      deadline: "2025-03-28",
      assignedTo: "Équipe de développement backend",
      tasks: { total: 17, completed: 17 },
      teamSize: 2,
      startDate: "2025-02-15",
      budget: "30,000 €",
      client: "E-Pay Solutions"
    },
    {
      id: "PRJ-006",
      name: "Formation équipe logistique",
      description: "Programme de formation pour l'équipe logistique sur les nouveaux outils et processus de gestion des stocks.",
      type: "Cycle en V",
      status: "Planifié",
      progress: 0,
      priority: "Normale",
      deadline: "2025-07-15",
      assignedTo: "Ressources humaines",
      tasks: { total: 8, completed: 0 },
      teamSize: 1,
      startDate: "2025-06-01",
      budget: "15,000 €",
      client: "Interne"
    },
  ]);
  
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    type: "Agile",
    status: "Planifié",
    priority: "Normale",
    deadline: "",
    assignedTo: "Non assigné",
    teamSize: 0,
    budget: "",
    client: "",
    tasks: { total: 0, completed: 0 },
    progress: 0
  });

  // Fonction pour filtrer les projets
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || project.status === statusFilter;
    const matchesType = typeFilter === "" || project.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusColor = (status) => {
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

  // Fonction pour obtenir la couleur du badge de priorité
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

  // Fonction pour créer un nouveau projet
  const handleCreateProject = () => {
    if (!newProject.name || !newProject.deadline) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const projectId = `PRJ-${String(projects.length + 1).padStart(3, "0")}`;
    const createdProject = {
      ...newProject,
      id: projectId,
      startDate: new Date().toISOString().split("T")[0],
    };

    setProjects([...projects, createdProject]);
    setNewProjectDialogOpen(false);
    setNewProject({
      name: "",
      description: "",
      type: "Agile",
      status: "Planifié",
      priority: "Normale",
      deadline: "",
      assignedTo: "Non assigné",
      teamSize: 0,
      budget: "",
      client: "",
      tasks: { total: 0, completed: 0 },
      progress: 0
    });

    toast({
      title: "Projet créé",
      description: `Le projet "${createdProject.name}" a été créé avec succès.`,
    });
  };

  // Fonction pour ouvrir les détails d'un projet
  const handleViewProjectDetails = (project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  // Fonction pour mettre à jour un projet
  const handleUpdateProject = (updatedProject) => {
    setProjects(
      projects.map((proj) => 
        proj.id === updatedProject.id ? updatedProject : proj
      )
    );
    setSelectedProject(updatedProject);
  };

  // Fonction pour supprimer un projet
  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    
    setProjects(projects.filter((proj) => proj.id !== projectToDelete.id));
    setDeleteAlertOpen(false);
    setProjectToDelete(null);
    
    toast({
      title: "Projet supprimé",
      description: `Le projet "${projectToDelete.name}" a été supprimé avec succès.`,
    });
  };

  // Fonction pour confirmer la suppression d'un projet
  const confirmDeleteProject = (project) => {
    setProjectToDelete(project);
    setDeleteAlertOpen(true);
  };

  // Fonction pour marquer un projet comme terminé
  const markProjectAsCompleted = (projectId) => {
    setProjects(
      projects.map((proj) => 
        proj.id === projectId 
          ? { ...proj, status: "Terminé", progress: 100 } 
          : proj
      )
    );
    
    toast({
      title: "Projet terminé",
      description: "Le projet a été marqué comme terminé avec succès.",
    });
  };

  return (
    <Layout title="Projets">
      <div className="p-6 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Projets</h1>
            <p className="text-muted-foreground mt-1">
              Gérez et suivez vos projets en méthodologie Agile ou cycle en V
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => setNewProjectDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Projet
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => {
                    toast({
                      title: "Export en PDF",
                      description: "L'export en PDF a démarré, veuillez patienter...",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter en PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      title: "Export en CSV",
                      description: "L'export en CSV a démarré, veuillez patienter...",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter en CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {projects.filter(p => p.status === "En cours").length} projets en cours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Projets par méthodologie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{projects.filter(p => p.type === "Agile").length}</div>
                  <p className="text-xs text-muted-foreground">Agile</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{projects.filter(p => p.type === "Cycle en V").length}</div>
                  <p className="text-xs text-muted-foreground">Cycle en V</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Projets par statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">En cours</span>
                  <span className="text-xs font-medium">{projects.filter(p => p.status === "En cours").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Planifiés</span>
                  <span className="text-xs font-medium">{projects.filter(p => p.status === "Planifié").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Terminés</span>
                  <span className="text-xs font-medium">{projects.filter(p => p.status === "Terminé").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Échéances à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => new Date(p.deadline) > new Date() && p.status !== "Terminé").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Projets avec des échéances dans les 30 prochains jours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="list">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Liste
                  </TabsTrigger>
                  <TabsTrigger value="kanban">
                    <KanbanSquare className="h-4 w-4 mr-2" />
                    Kanban
                  </TabsTrigger>
                  <TabsTrigger value="calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendrier
                  </TabsTrigger>
                  <TabsTrigger value="timeline">
                    <Clock className="h-4 w-4 mr-2" />
                    Chronologie
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un projet..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En pause">En pause</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="Agile">Agile</SelectItem>
                  <SelectItem value="Cycle en V">Cycle en V</SelectItem>
                  <SelectItem value="Kanban">Kanban</SelectItem>
                  <SelectItem value="Scrum">Scrum</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setTypeFilter("");
              }}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs value={view} onValueChange={setView}>
            <TabsContent value="list" className="m-0">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Projet</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="hidden md:table-cell">Priorité</TableHead>
                        <TableHead className="hidden lg:table-cell">Progression</TableHead>
                        <TableHead className="hidden lg:table-cell">Échéance</TableHead>
                        <TableHead className="hidden xl:table-cell">Assigné à</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <div className="text-muted-foreground">
                              Aucun projet trouvé
                            </div>
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={() => setNewProjectDialogOpen(true)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Créer un projet
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.id}</TableCell>
                            <TableCell>
                              <div 
                                className="font-medium cursor-pointer hover:text-primary transition-colors"
                                onClick={() => handleViewProjectDetails(project)}
                              >
                                {project.name}
                              </div>
                              <div className="hidden md:block text-sm text-muted-foreground">
                                {project.tasks.completed}/{project.tasks.total} tâches
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{project.type}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="outline" className={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div 
                                  className="bg-primary h-2.5 rounded-full" 
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-right mt-1">{project.progress}%</div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {new Date(project.deadline).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">{project.assignedTo}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewProjectDetails(project)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir les détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      handleViewProjectDetails(project);
                                      setEditMode(true);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedProject(project);
                                      setTasksDialogOpen(true);
                                    }}
                                  >
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Voir les tâches
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title: "Fonctionnalité en développement",
                                        description: "La création de tâches sera bientôt disponible",
                                      });
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Ajouter une tâche
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title: "Fonctionnalité en développement",
                                        description: "Le partage de projet sera bientôt disponible",
                                      });
                                    }}
                                  >
                                    <Share className="h-4 w-4 mr-2" />
                                    Partager
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {project.status !== "Terminé" && (
                                    <DropdownMenuItem onClick={() => markProjectAsCompleted(project.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      Marquer comme terminé
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={() => confirmDeleteProject(project)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kanban" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2 bg-yellow-100/30 dark:bg-yellow-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>Planifié</span>
                      <Badge variant="outline">{filteredProjects.filter(p => p.status === "Planifié").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {filteredProjects.filter(p => p.status === "Planifié").length === 0 ? (
                      <div className="text-center p-6 text-muted-foreground">
                        <p className="text-sm">Aucun projet planifié</p>
                      </div>
                    ) : (
                      filteredProjects.filter(p => p.status === "Planifié").map((project) => (
                        <Card 
                          key={project.id} 
                          className="p-3 hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleViewProjectDetails(project)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm">{project.name}</h3>
                            <Badge variant="outline" className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <ClipboardList className="h-3 w-3 mr-1" />
                            <span>{project.tasks.completed}/{project.tasks.total}</span>
                            <Separator orientation="vertical" className="h-3 mx-2" />
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2">{project.progress}%</span>
                          </div>
                        </Card>
                      ))
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setNewProject({...newProject, status: "Planifié"});
                        setNewProjectDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 bg-blue-100/30 dark:bg-blue-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>En cours</span>
                      <Badge variant="outline">{filteredProjects.filter(p => p.status === "En cours").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {filteredProjects.filter(p => p.status === "En cours").length === 0 ? (
                      <div className="text-center p-6 text-muted-foreground">
                        <p className="text-sm">Aucun projet en cours</p>
                      </div>
                    ) : (
                      filteredProjects.filter(p => p.status === "En cours").map((project) => (
                        <Card 
                          key={project.id} 
                          className="p-3 hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleViewProjectDetails(project)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm">{project.name}</h3>
                            <Badge variant="outline" className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <ClipboardList className="h-3 w-3 mr-1" />
                            <span>{project.tasks.completed}/{project.tasks.total}</span>
                            <Separator orientation="vertical" className="h-3 mx-2" />
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2">{project.progress}%</span>
                          </div>
                        </Card>
                      ))
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setNewProject({...newProject, status: "En cours"});
                        setNewProjectDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 bg-green-100/30 dark:bg-green-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>Terminé</span>
                      <Badge variant="outline">{filteredProjects.filter(p => p.status === "Terminé").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {filteredProjects.filter(p => p.status === "Terminé").length === 0 ? (
                      <div className="text-center p-6 text-muted-foreground">
                        <p className="text-sm">Aucun projet terminé</p>
                      </div>
                    ) : (
                      filteredProjects.filter(p => p.status === "Terminé").map((project) => (
                        <Card 
                          key={project.id} 
                          className="p-3 hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleViewProjectDetails(project)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm">{project.name}</h3>
                            <Badge variant="outline" className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <ClipboardList className="h-3 w-3 mr-1" />
                            <span>{project.tasks.completed}/{project.tasks.total}</span>
                            <Separator orientation="vertical" className="h-3 mx-2" />
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2">{project.progress}%</span>
                          </div>
                        </Card>
                      ))
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setNewProject({...newProject, status: "Terminé", progress: 100});
                        setNewProjectDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="m-0">
              <Card className="border-none">
                <CardContent className="p-6">
                  <div className="text-center py-10">
                    <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Vue calendrier</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      La vue calendrier sera bientôt disponible
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="m-0">
              <Card className="border-none">
                <CardContent className="p-6">
                  <div className="text-center py-10">
                    <Clock className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Vue chronologique</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      La vue chronologique sera bientôt disponible
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogue de création de projet */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau projet</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer un nouveau projet.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Nom du projet *</Label>
              <Input
                id="project-name"
                placeholder="Nom du projet"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Description du projet"
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project-type">Type de projet</Label>
                <Select
                  value={newProject.type}
                  onValueChange={(value) => setNewProject({ ...newProject, type: value })}
                >
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agile">Agile</SelectItem>
                    <SelectItem value="Cycle en V">Cycle en V</SelectItem>
                    <SelectItem value="Kanban">Kanban</SelectItem>
                    <SelectItem value="Scrum">Scrum</SelectItem>
                    <SelectItem value="Waterfall">Waterfall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-status">Statut</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) => setNewProject({ ...newProject, status: value })}
                >
                  <SelectTrigger id="project-status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planifié">Planifié</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="En pause">En pause</SelectItem>
                    <SelectItem value="Terminé">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project-priority">Priorité</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                >
                  <SelectTrigger id="project-priority">
                    <SelectValue placeholder="Sélectionner une priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critique">Critique</SelectItem>
                    <SelectItem value="Élevée">Élevée</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Normale">Normale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-deadline">Date d'échéance *</Label>
                <Input
                  id="project-deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project-client">Client</Label>
                <Input
                  id="project-client"
                  placeholder="Nom du client"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-budget">Budget</Label>
                <Input
                  id="project-budget"
                  placeholder="Ex: 50,000 €"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateProject}>Créer le projet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feuillet de détails du projet */}
      {selectedProject && (
        <ProjectDetailsSheet
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          project={selectedProject}
          onUpdate={handleUpdateProject}
        />
      )}

      {/* Alerte de confirmation de suppression */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement le projet
              {projectToDelete && ` "${projectToDelete.name}"`} et toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash className="h-4 w-4 mr-2" />
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}

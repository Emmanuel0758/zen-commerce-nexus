
import { useState } from "react";
import { 
  Plus, Filter, Calendar, KanbanSquare, ClipboardList, Clock, Users,
  ChevronDown, Search, Download, FileText, ArrowUpDown, MoreHorizontal
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

export default function ProjectsPage() {
  const { toast } = useToast();
  const [view, setView] = useState("kanban");
  
  // Données de démonstration pour les projets
  const projects = [
    {
      id: "PRJ-001",
      name: "Refonte du site web d'e-commerce",
      type: "Agile",
      status: "En cours",
      progress: 65,
      priority: "Élevée",
      deadline: "2025-05-15",
      assignedTo: "Équipe de développement web",
      tasks: { total: 28, completed: 18 },
    },
    {
      id: "PRJ-002",
      name: "Implémentation CRM",
      type: "Cycle en V",
      status: "Planifié",
      progress: 25,
      priority: "Moyenne",
      deadline: "2025-06-30",
      assignedTo: "Équipe d'intégration",
      tasks: { total: 42, completed: 10 },
    },
    {
      id: "PRJ-003",
      name: "Application mobile de livraison",
      type: "Agile",
      status: "En cours",
      progress: 48,
      priority: "Élevée",
      deadline: "2025-06-10",
      assignedTo: "Équipe mobile",
      tasks: { total: 36, completed: 17 },
    },
    {
      id: "PRJ-004",
      name: "Migration des systèmes d'inventaire",
      type: "Cycle en V",
      status: "En cours",
      progress: 82,
      priority: "Critique",
      deadline: "2025-04-22",
      assignedTo: "Équipe d'infrastructure",
      tasks: { total: 23, completed: 19 },
    },
    {
      id: "PRJ-005",
      name: "Intégration API de paiement",
      type: "Agile",
      status: "Terminé",
      progress: 100,
      priority: "Élevée",
      deadline: "2025-03-28",
      assignedTo: "Équipe de développement backend",
      tasks: { total: 17, completed: 17 },
    },
    {
      id: "PRJ-006",
      name: "Formation équipe logistique",
      type: "Cycle en V",
      status: "Planifié",
      progress: 0,
      priority: "Normale",
      deadline: "2025-07-15",
      assignedTo: "Ressources humaines",
      tasks: { total: 8, completed: 0 },
    },
  ];

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
    toast({
      title: "Fonctionnalité en développement",
      description: "La création de projet sera bientôt disponible.",
    });
  };

  // Fonction pour exporter les projets
  const handleExportProjects = () => {
    toast({
      title: "Export des projets",
      description: "Exportation des projets en cours...",
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
            <Button onClick={handleCreateProject}>
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
                <DropdownMenuItem onClick={handleExportProjects}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter en PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportProjects}>
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
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="planned">Planifié</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Wrapping all TabsContent components within a Tabs component */}
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
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{project.name}</div>
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
                                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Voir les tâches</DropdownMenuItem>
                                <DropdownMenuItem>Ajouter une tâche</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Archiver</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kanban" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2 bg-blue-100/30 dark:bg-blue-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>Planifié</span>
                      <Badge variant="outline">{projects.filter(p => p.status === "Planifié").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {projects.filter(p => p.status === "Planifié").map((project) => (
                      <Card key={project.id} className="p-3 hover:bg-accent cursor-pointer transition-colors">
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
                    ))}
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 bg-yellow-100/30 dark:bg-yellow-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>En cours</span>
                      <Badge variant="outline">{projects.filter(p => p.status === "En cours").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {projects.filter(p => p.status === "En cours").map((project) => (
                      <Card key={project.id} className="p-3 hover:bg-accent cursor-pointer transition-colors">
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
                    ))}
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 bg-green-100/30 dark:bg-green-900/30">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span>Terminé</span>
                      <Badge variant="outline">{projects.filter(p => p.status === "Terminé").length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    {projects.filter(p => p.status === "Terminé").map((project) => (
                      <Card key={project.id} className="p-3 hover:bg-accent cursor-pointer transition-colors">
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
                    ))}
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
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
    </Layout>
  );
}

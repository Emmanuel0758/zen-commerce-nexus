
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Check,
  ClipboardList,
  Clock,
  Download,
  FileText,
  LucideIcon,
  MoreHorizontal,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectTeamDialog } from "./ProjectTeamDialog";
import { ProjectTasksDialog } from "./ProjectTasksDialog";
import { useToast } from "@/hooks/use-toast";

interface ProjectDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
  onUpdate: (project: any) => void;
}

export function ProjectDetailsSheet({
  open,
  onOpenChange,
  project,
  onUpdate,
}: ProjectDetailsSheetProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [tasksDialogOpen, setTasksDialogOpen] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sophie Martin",
      role: "Chef de projet",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      role: "Développeur Frontend",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      name: "Julie Leroy",
      role: "Développeur Backend",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
  ]);
  
  // Add state for documents
  const [documents, setDocuments] = useState([
    // Initial empty state, will be populated by user uploads
  ]);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("document");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    // Validate inputs
    if (!editedProject.name) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est requis",
        variant: "destructive",
      });
      return;
    }

    onUpdate(editedProject);
    setEditMode(false);
    toast({
      title: "Projet mis à jour",
      description: "Les modifications ont été enregistrées avec succès",
    });
  };

  const handleAddTeamMembers = (members) => {
    const newMembers = members.filter(
      (member) => !teamMembers.some((m) => m.id === member.id)
    );
    setTeamMembers([...teamMembers, ...newMembers]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Auto-populate document name with filename if not set
      if (!documentName) {
        setDocumentName(e.target.files[0].name.split('.')[0]);
      }
    }
  };

  const handleDocumentUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive",
      });
      return;
    }

    if (!documentName) {
      toast({
        title: "Erreur",
        description: "Le nom du document est requis",
        variant: "destructive",
      });
      return;
    }

    // Create new document object
    const newDocument = {
      id: Math.random().toString(36).substring(2, 11),
      name: documentName,
      type: documentType,
      filename: selectedFile.name,
      size: selectedFile.size,
      uploadDate: new Date(),
      file: selectedFile, // In a real app, this would be uploaded to a storage service
      uploadedBy: "Sophie Martin" // In a real app, this would be the current user
    };

    // Add document to the list
    setDocuments([...documents, newDocument]);

    // Reset form
    setDocumentName("");
    setDocumentType("document");
    setSelectedFile(null);

    // Show success toast
    toast({
      title: "Document ajouté",
      description: "Le document a été ajouté avec succès",
    });
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    toast({
      title: "Document supprimé",
      description: "Le document a été supprimé avec succès",
    });
  };

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "image":
        return "📷";
      case "pdf":
        return "📄";
      case "spreadsheet":
        return "📊";
      case "presentation":
        return "📑";
      default:
        return "📝";
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <div className="flex justify-between items-start">
              <div>
                <SheetTitle>{editMode ? "Modifier le projet" : project.name}</SheetTitle>
                <SheetDescription>
                  {editMode
                    ? "Modifiez les détails du projet"
                    : `Projet ${project.id} • ${project.type}`}
                </SheetDescription>
              </div>
              {!editMode ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedProject({ ...project });
                      setEditMode(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              )}
            </div>
          </SheetHeader>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="tasks">Tâches</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="files">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="py-4 space-y-6">
              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Nom du projet</Label>
                    <Input
                      id="project-name"
                      value={editedProject.name}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={editedProject.description || ""}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-type">Type</Label>
                      <Select
                        value={editedProject.type}
                        onValueChange={(value) =>
                          setEditedProject({
                            ...editedProject,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger id="project-type">
                          <SelectValue placeholder="Type de projet" />
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

                    <div className="space-y-2">
                      <Label htmlFor="project-status">Statut</Label>
                      <Select
                        value={editedProject.status}
                        onValueChange={(value) =>
                          setEditedProject({
                            ...editedProject,
                            status: value,
                          })
                        }
                      >
                        <SelectTrigger id="project-status">
                          <SelectValue placeholder="Statut du projet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planifié">Planifié</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="En pause">En pause</SelectItem>
                          <SelectItem value="Terminé">Terminé</SelectItem>
                          <SelectItem value="Annulé">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-priority">Priorité</Label>
                      <Select
                        value={editedProject.priority}
                        onValueChange={(value) =>
                          setEditedProject({
                            ...editedProject,
                            priority: value,
                          })
                        }
                      >
                        <SelectTrigger id="project-priority">
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

                    <div className="space-y-2">
                      <Label htmlFor="project-deadline">Date d'échéance</Label>
                      <Input
                        id="project-deadline"
                        type="date"
                        value={editedProject.deadline}
                        onChange={(e) =>
                          setEditedProject({
                            ...editedProject,
                            deadline: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(project.status)}
                        >
                          {project.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(project.priority)}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {project.id}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">
                        Description
                      </div>
                      <p className="text-sm">
                        {project.description ||
                          "Ce projet ne possède pas encore de description."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem
                        icon={ClipboardList}
                        label="Type"
                        value={project.type}
                      />
                      <InfoItem
                        icon={Calendar}
                        label="Échéance"
                        value={new Date(project.deadline).toLocaleDateString()}
                      />
                      <InfoItem
                        icon={Clock}
                        label="Progression"
                        value={`${project.progress}%`}
                      />
                      <InfoItem
                        icon={Users}
                        label="Équipe"
                        value={project.assignedTo}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        Progression
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Tâches: {project.tasks.completed}/{project.tasks.total}</span>
                        <span>{project.progress}% complété</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Tâches récentes</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTasksDialogOpen(true)}
                      >
                        Voir toutes
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 border rounded-md flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Analyse des besoins</div>
                          <div className="text-xs text-muted-foreground">
                            Terminé le 15 avril 2025
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border rounded-md flex items-start gap-3">
                        <div className="h-5 w-5 border rounded-full border-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Conception de l'architecture
                          </div>
                          <div className="text-xs text-muted-foreground">
                            En cours - Échéance: 22 avril 2025
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border rounded-md flex items-start gap-3">
                        <div className="h-5 w-5 border rounded-full border-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Développement des API
                          </div>
                          <div className="text-xs text-muted-foreground">
                            En cours - Échéance: 5 mai 2025
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="tasks" className="py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Tâches du projet</h3>
                  <Button onClick={() => setTasksDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Gérer les tâches
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium">Avancement des tâches</div>
                      <div className="text-xs text-muted-foreground">
                        {project.tasks.completed} sur {project.tasks.total} tâches complétées
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {Math.round((project.tasks.completed / project.tasks.total) * 100)}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(project.tasks.completed / project.tasks.total) * 100}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-blue-500/10 rounded-md">
                      <div className="text-blue-600 text-2xl font-bold">
                        {project.tasks.total - project.tasks.completed}
                      </div>
                      <div className="text-xs">Tâches restantes</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green-500/10 rounded-md">
                      <div className="text-green-600 text-2xl font-bold">
                        {project.tasks.completed}
                      </div>
                      <div className="text-xs">Tâches terminées</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-center text-muted-foreground pt-4">
                  Cliquez sur "Gérer les tâches" pour voir toutes les tâches et en ajouter de nouvelles.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Équipe du projet</h3>
                  <Button onClick={() => setTeamDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter des membres
                  </Button>
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-3 border rounded-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {teamMembers.length === 0 && (
                    <div className="text-center p-6 text-muted-foreground">
                      <Users className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p>Aucun membre dans cette équipe</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setTeamDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter des membres
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="py-4">
              {documents.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-medium">Aucun document</h3>
                  <p className="text-sm mt-1 mb-4">
                    Ajoutez des documents liés à ce projet pour les partager avec l'équipe.
                  </p>
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="space-y-2">
                      <Label htmlFor="document-name">Nom du document</Label>
                      <Input
                        id="document-name"
                        placeholder="Ex: Cahier des charges"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Type de document</Label>
                      <Select
                        value={documentType}
                        onValueChange={setDocumentType}
                      >
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="Type de document" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="spreadsheet">Tableur</SelectItem>
                          <SelectItem value="presentation">Présentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-file">Fichier</Label>
                      <Input
                        id="document-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                    <Button onClick={handleDocumentUpload} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Téléverser le document
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Documents du projet</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("files-upload")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un document
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 border rounded-md flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getDocumentIcon(doc.type)}</div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(doc.size)} • Ajouté le {doc.uploadDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t mt-6">
                    <div className="space-y-4 max-w-full">
                      <h3 className="text-sm font-medium">Ajouter un nouveau document</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="document-name">Nom du document</Label>
                          <Input
                            id="document-name"
                            placeholder="Ex: Cahier des charges"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="document-type">Type de document</Label>
                          <Select
                            value={documentType}
                            onValueChange={setDocumentType}
                          >
                            <SelectTrigger id="document-type">
                              <SelectValue placeholder="Type de document" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="document">Document</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="spreadsheet">Tableur</SelectItem>
                              <SelectItem value="presentation">Présentation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="document-file">Fichier</Label>
                        <Input
                          id="document-file"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                      <Button onClick={handleDocumentUpload}>
                        <Upload className="h-4 w-4 mr-2" />
                        Téléverser le document
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <ProjectTeamDialog
        open={teamDialogOpen}
        onOpenChange={setTeamDialogOpen}
        projectId={project.id}
        onAddMembers={handleAddTeamMembers}
      />

      <ProjectTasksDialog
        open={tasksDialogOpen}
        onOpenChange={setTasksDialogOpen}
        project={project}
      />
    </>
  );
}

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

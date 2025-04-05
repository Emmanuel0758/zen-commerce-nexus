
import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil, Share, Plus, Trash2, Download } from "lucide-react";

interface ProjectContextMenuProps {
  children: React.ReactNode;
  project: any;
  onView: () => void;
  onEdit: () => void;
  onAddTask: () => void;
  onDelete: () => void;
}

export function ProjectContextMenu({
  children,
  project,
  onView,
  onEdit,
  onAddTask,
  onDelete,
}: ProjectContextMenuProps) {
  const { toast } = useToast();

  const handleShare = () => {
    // In a real app, this would show a sharing dialog or copy a link to clipboard
    navigator.clipboard.writeText(`https://app.example.com/projects/${project.id}`).then(
      () => {
        toast({
          title: "Lien copié",
          description: "Le lien du projet a été copié dans le presse-papier",
        });
      },
      () => {
        toast({
          title: "Erreur",
          description: "Impossible de copier le lien du projet",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Voir les détails</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Modifier</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Ajouter une tâche</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          <span>Partager</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={onDelete}
          className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Supprimer</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

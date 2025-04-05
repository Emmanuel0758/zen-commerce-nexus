
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Share, Plus, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectMenuProps {
  project: any;
  onView: () => void;
  onEdit: () => void;
  onAddTask: () => void;
  onDelete: () => void;
}

export function ProjectMenu({
  project,
  onView,
  onEdit,
  onAddTask,
  onDelete,
}: ProjectMenuProps) {
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

  const handleItemClick = (callback: () => void) => {
    callback();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Menu">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleItemClick(onView)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Voir les détails</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleItemClick(onEdit)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Modifier</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleItemClick(onAddTask)}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Ajouter une tâche</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          <span>Partager</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleItemClick(onDelete)}
          className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

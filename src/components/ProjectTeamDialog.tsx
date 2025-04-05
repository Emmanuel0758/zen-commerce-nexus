
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Plus, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    role: "Chef de projet",
    avatar: "https://i.pravatar.cc/150?img=32",
    skills: ["Design", "UI/UX", "Management"],
  },
  {
    id: 2,
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    role: "Développeur Frontend",
    avatar: "https://i.pravatar.cc/150?img=12",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 3,
    name: "Julie Leroy",
    email: "julie.leroy@example.com",
    role: "Développeur Backend",
    avatar: "https://i.pravatar.cc/150?img=26",
    skills: ["Node.js", "Python", "SQL"],
  },
  {
    id: 4,
    name: "Marc Bernard",
    email: "marc.bernard@example.com",
    role: "Testeur QA",
    avatar: "https://i.pravatar.cc/150?img=65",
    skills: ["Test Automation", "Manual Testing"],
  },
  {
    id: 5,
    name: "Emilie Petit",
    email: "emilie.petit@example.com",
    role: "Designer UI/UX",
    avatar: "https://i.pravatar.cc/150?img=49",
    skills: ["Figma", "Sketch", "Adobe XD"],
  },
  {
    id: 6,
    name: "Antoine Girard",
    email: "antoine.girard@example.com",
    role: "DevOps",
    avatar: "https://i.pravatar.cc/150?img=67",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
];

interface ProjectTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
  onAddMembers: (members: any[]) => void;
}

export function ProjectTeamDialog({
  open,
  onOpenChange,
  projectId,
  onAddMembers,
}: ProjectTeamDialogProps) {
  const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleMember = (memberId: number) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleAddMembers = () => {
    const members = teamMembers.filter((member) =>
      selectedMembers.includes(member.id)
    );
    
    onAddMembers(members);
    
    toast({
      title: "Membres ajoutés",
      description: `${members.length} membres ont été ajoutés au projet`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gestion de l'équipe projet</DialogTitle>
          <DialogDescription>
            Ajoutez ou supprimez des membres de l'équipe pour ce projet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="search">Rechercher des membres</Label>
              <Input
                id="search"
                placeholder="Nom, email ou rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid w-[180px] gap-2">
              <Label htmlFor="role">Filtrer par rôle</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="Chef de projet">Chef de projet</SelectItem>
                  <SelectItem value="Développeur Frontend">
                    Développeur Frontend
                  </SelectItem>
                  <SelectItem value="Développeur Backend">
                    Développeur Backend
                  </SelectItem>
                  <SelectItem value="Designer UI/UX">Designer UI/UX</SelectItem>
                  <SelectItem value="Testeur QA">Testeur QA</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md p-2">
            <div className="font-medium mb-2">Membres sélectionnés</div>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  Aucun membre sélectionné
                </div>
              ) : (
                teamMembers
                  .filter((m) => selectedMembers.includes(m.id))
                  .map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="flex items-center gap-1 pl-1"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                      <button
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                        onClick={() => handleToggleMember(member.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
              )}
            </div>
          </div>

          <Separator />

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {role
              ? filteredMembers
                  .filter((m) => m.role === role)
                  .map((member) => (
                    <MemberItem
                      key={member.id}
                      member={member}
                      isSelected={selectedMembers.includes(member.id)}
                      onToggle={handleToggleMember}
                    />
                  ))
              : filteredMembers.map((member) => (
                  <MemberItem
                    key={member.id}
                    member={member}
                    isSelected={selectedMembers.includes(member.id)}
                    onToggle={handleToggleMember}
                  />
                ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleAddMembers} disabled={selectedMembers.length === 0}>
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter à l'équipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface MemberItemProps {
  member: typeof teamMembers[0];
  isSelected: boolean;
  onToggle: (id: number) => void;
}

function MemberItem({ member, isSelected, onToggle }: MemberItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer ${
        isSelected ? "bg-accent/50" : ""
      }`}
      onClick={() => onToggle(member.id)}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.avatar} />
          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
          <div className="flex items-center gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              {member.role}
            </Badge>
            {member.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{member.skills.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Button
        size="sm"
        variant={isSelected ? "default" : "outline"}
        className="ml-auto"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(member.id);
        }}
      >
        {isSelected ? "Sélectionné" : "Sélectionner"}
      </Button>
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash, BarChart } from "lucide-react";

export default function MarketingPage() {
  const { toast } = useToast();
  const [newCampaignDialogOpen, setNewCampaignDialogOpen] = useState(false);
  const [newLoyaltyDialogOpen, setNewLoyaltyDialogOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Array<{id: number, name: string, status: string}>>([]);
  const [loyaltyProgram, setLoyaltyProgram] = useState<{active: boolean, name: string} | null>(null);

  const handleCreateCampaign = () => {
    const newCampaign = {
      id: campaigns.length + 1,
      name: `Campagne ${campaigns.length + 1}`,
      status: "active"
    };
    
    setCampaigns([...campaigns, newCampaign]);
    toast({
      title: "Campagne créée",
      description: `La campagne ${newCampaign.name} a été créée avec succès`
    });
    setNewCampaignDialogOpen(false);
  };

  const handleCreateLoyaltyProgram = () => {
    setLoyaltyProgram({
      active: true,
      name: "Programme de fidélité Zen"
    });
    toast({
      title: "Programme de fidélité créé",
      description: "Le programme de fidélité a été configuré avec succès"
    });
    setNewLoyaltyDialogOpen(false);
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès"
    });
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Créez et gérez vos campagnes marketing et programmes de fidélité.
            </p>
            
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Campagnes</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setNewCampaignDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouvelle campagne
                  </Button>
                </CardHeader>
                <CardContent>
                  {campaigns.length === 0 ? (
                    <p>Aucune campagne en cours.</p>
                  ) : (
                    <div className="space-y-4">
                      {campaigns.map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-xs text-muted-foreground">{campaign.status === "active" ? "Active" : "Inactive"}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <BarChart className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => {
                              toast({
                                title: "Modification de campagne",
                                description: `La campagne ${campaign.name} a été modifiée`
                              });
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteCampaign(campaign.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Programme de fidélité</CardTitle>
                  {!loyaltyProgram && (
                    <Button variant="outline" size="sm" onClick={() => setNewLoyaltyDialogOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Configurer
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {!loyaltyProgram ? (
                    <p>Le programme de fidélité n'est pas encore configuré.</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{loyaltyProgram.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {loyaltyProgram.active ? "Actif" : "Inactif"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => {
                            toast({
                              title: "Statistiques",
                              description: "Affichage des statistiques du programme de fidélité"
                            });
                          }}>
                            <BarChart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => {
                            toast({
                              title: "Modification du programme",
                              description: "Le programme de fidélité a été modifié"
                            });
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Détails du programme</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>1 point pour chaque 1000 FCFA dépensé</li>
                          <li>Réductions exclusives pour les membres</li>
                          <li>Cadeaux au palier de 100 points</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue Nouvelle Campagne */}
      <Dialog open={newCampaignDialogOpen} onOpenChange={setNewCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle campagne</DialogTitle>
            <DialogDescription>
              Définissez les paramètres de votre nouvelle campagne marketing
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="campaign-name" className="text-sm font-medium block mb-1">
                  Nom de la campagne
                </label>
                <input
                  type="text"
                  id="campaign-name"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Soldes d'été 2023"
                />
              </div>
              <div>
                <label htmlFor="campaign-type" className="text-sm font-medium block mb-1">
                  Type de campagne
                </label>
                <select
                  id="campaign-type"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="email">Campagne d'emails</option>
                  <option value="social">Réseaux sociaux</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div>
                <label htmlFor="campaign-dates" className="text-sm font-medium block mb-1">
                  Dates de la campagne
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    id="start-date"
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <input
                    type="date"
                    id="end-date"
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCampaignDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateCampaign}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Programme de fidélité */}
      <Dialog open={newLoyaltyDialogOpen} onOpenChange={setNewLoyaltyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurer le programme de fidélité</DialogTitle>
            <DialogDescription>
              Définissez les paramètres de votre programme de fidélité
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="loyalty-name" className="text-sm font-medium block mb-1">
                  Nom du programme
                </label>
                <input
                  type="text"
                  id="loyalty-name"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Programme Zen Fidélité"
                />
              </div>
              <div>
                <label htmlFor="loyalty-type" className="text-sm font-medium block mb-1">
                  Type de programme
                </label>
                <select
                  id="loyalty-type"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="points">Points de fidélité</option>
                  <option value="tier">Programme à paliers</option>
                  <option value="cashback">Remboursement partiel</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Règles d'attribution
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-20 px-3 py-2 border rounded-md"
                  />
                  <span className="flex items-center">point(s) pour chaque</span>
                  <input
                    type="number"
                    min="100"
                    defaultValue="1000"
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                  <span className="flex items-center">FCFA dépensé</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewLoyaltyDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateLoyaltyProgram}>
              Configurer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

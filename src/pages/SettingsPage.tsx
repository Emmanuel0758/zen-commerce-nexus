
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Save, User, Shield, Globe, Building, Languages, CreditCard, Bell, Share2, Key } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [generalDialogOpen, setGeneralDialogOpen] = useState(false);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [userSheetOpen, setUserSheetOpen] = useState(false);
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);
  
  const handleSaveSettings = (type: string) => {
    toast({
      title: "Paramètres enregistrés",
      description: `Les paramètres ${type} ont été enregistrés avec succès`
    });
    
    switch(type) {
      case "généraux":
        setGeneralDialogOpen(false);
        break;
      case "sécurité":
        setSecurityDialogOpen(false);
        break;
      case "intégrations":
        setIntegrationDialogOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Paramètres</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="integrations">Intégrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres généraux</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Configuration de l'entreprise, langue, devise et préférences.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-start gap-2"
                        onClick={() => setGeneralDialogOpen(true)}
                      >
                        <Building className="h-4 w-4" />
                        Information de l'entreprise
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Langue modifiée",
                            description: "La langue a été changée avec succès"
                          });
                        }}
                      >
                        <Languages className="h-4 w-4" />
                        Langue et régionalisation
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Devise modifiée",
                            description: "La devise a été mise à jour avec succès"
                          });
                        }}
                      >
                        <CreditCard className="h-4 w-4" />
                        Devise et paiements
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Notifications modifiées",
                            description: "Les paramètres de notification ont été mis à jour"
                          });
                        }}
                      >
                        <Bell className="h-4 w-4" />
                        Notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Gestion de la sécurité, MFA et politique de mots de passe.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setSecurityDialogOpen(true)}
                      >
                        <Key className="h-4 w-4" />
                        Politique de mot de passe
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "MFA activé",
                            description: "L'authentification multi-facteurs a été activée"
                          });
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        Authentification multi-facteurs
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Journaux exportés",
                            description: "Les journaux d'audit ont été exportés avec succès"
                          });
                        }}
                      >
                        <Save className="h-4 w-4" />
                        Journaux d'audit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Utilisateurs et rôles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Gestion des utilisateurs et des droits d'accès.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setUserSheetOpen(true)}
                      >
                        <User className="h-4 w-4" />
                        Gérer les utilisateurs
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Permissions mises à jour",
                            description: "Les permissions et rôles ont été mis à jour avec succès"
                          });
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        Permissions et rôles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Intégrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Configuration des API et connexions tierces.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setIntegrationDialogOpen(true)}
                      >
                        <Globe className="h-4 w-4" />
                        API et webhooks
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Connexions tierces",
                            description: "Les services tiers ont été configurés avec succès"
                          });
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Services tiers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialogue Paramètres Généraux */}
      <Dialog open={generalDialogOpen} onOpenChange={setGeneralDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informations de l'entreprise</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="company-name" className="text-sm font-medium block mb-1">
                  Nom de l'entreprise
                </label>
                <Input
                  id="company-name"
                  defaultValue="Zen Cosmetics"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="company-address" className="text-sm font-medium block mb-1">
                  Adresse
                </label>
                <Textarea
                  id="company-address"
                  defaultValue="123 Rue du Commerce, Quartier Central, Dakar, Sénégal"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="company-phone" className="text-sm font-medium block mb-1">
                  Téléphone
                </label>
                <Input
                  id="company-phone"
                  defaultValue="+221 77 123 45 67"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="company-email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <Input
                  id="company-email"
                  defaultValue="contact@zencosmetics.com"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGeneralDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("généraux")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Sécurité */}
      <Dialog open={securityDialogOpen} onOpenChange={setSecurityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Politique de mot de passe</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Exigences de mot de passe
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="min-length" defaultChecked />
                    <label htmlFor="min-length" className="text-sm">Longueur minimale de 8 caractères</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="uppercase" defaultChecked />
                    <label htmlFor="uppercase" className="text-sm">Au moins une majuscule</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="number" defaultChecked />
                    <label htmlFor="number" className="text-sm">Au moins un chiffre</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="special-char" defaultChecked />
                    <label htmlFor="special-char" className="text-sm">Au moins un caractère spécial</label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password-expiry" className="text-sm font-medium block mb-1">
                  Expiration du mot de passe
                </label>
                <select
                  id="password-expiry"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="never">Jamais</option>
                  <option value="30">30 jours</option>
                  <option value="60">60 jours</option>
                  <option value="90" selected>90 jours</option>
                  <option value="180">180 jours</option>
                </select>
              </div>
              <div>
                <label htmlFor="failed-attempts" className="text-sm font-medium block mb-1">
                  Blocage après tentatives échouées
                </label>
                <select
                  id="failed-attempts"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="3">3 tentatives</option>
                  <option value="5" selected>5 tentatives</option>
                  <option value="10">10 tentatives</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSecurityDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("sécurité")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sheet Gestion Utilisateurs */}
      <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Gestion des utilisateurs</SheetTitle>
            <SheetDescription>
              Ajoutez, modifiez ou supprimez des utilisateurs du système.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Ahmed Diop</p>
                  <p className="text-sm text-muted-foreground">admin@zencosmetics.com</p>
                  <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">Admin</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Utilisateur modifié",
                    description: "Les détails de l'utilisateur ont été mis à jour"
                  });
                }}>
                  Modifier
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Fatou Ndiaye</p>
                  <p className="text-sm text-muted-foreground">f.ndiaye@zencosmetics.com</p>
                  <p className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block mt-1">Marketing</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Utilisateur modifié",
                    description: "Les détails de l'utilisateur ont été mis à jour"
                  });
                }}>
                  Modifier
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Moussa Sow</p>
                  <p className="text-sm text-muted-foreground">m.sow@zencosmetics.com</p>
                  <p className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full inline-block mt-1">Logistique</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Utilisateur modifié",
                    description: "Les détails de l'utilisateur ont été mis à jour"
                  });
                }}>
                  Modifier
                </Button>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => {
                  toast({
                    title: "Nouvel utilisateur",
                    description: "Un nouvel utilisateur a été ajouté avec succès"
                  });
                }}
              >
                Ajouter un utilisateur
              </Button>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setUserSheetOpen(false)}>
              Fermer
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Dialogue Intégrations */}
      <Dialog open={integrationDialogOpen} onOpenChange={setIntegrationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API et webhooks</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="api-key" className="text-sm font-medium block mb-1">
                  Clé API
                </label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    defaultValue="sk_prod_Zen7891ABCDEF0123456789"
                    readOnly
                    className="w-full"
                  />
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Clé API copiée",
                      description: "La clé API a été copiée dans le presse-papier"
                    });
                  }}>
                    Copier
                  </Button>
                </div>
              </div>
              <div>
                <label htmlFor="webhook-url" className="text-sm font-medium block mb-1">
                  URL de webhook
                </label>
                <Input
                  id="webhook-url"
                  placeholder="https://votre-site.com/webhook"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Événements
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="order-created" defaultChecked />
                    <label htmlFor="order-created" className="text-sm">Commande créée</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="order-updated" defaultChecked />
                    <label htmlFor="order-updated" className="text-sm">Commande mise à jour</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="payment-received" defaultChecked />
                    <label htmlFor="payment-received" className="text-sm">Paiement reçu</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="inventory-low" />
                    <label htmlFor="inventory-low" className="text-sm">Stock bas</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIntegrationDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("intégrations")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

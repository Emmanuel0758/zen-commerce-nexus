
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { 
  Save, User, Shield, Globe, Building, Languages, CreditCard, Bell, Share2, 
  Key, Brush, Image, Palette, Monitor, Laptop, Smartphone, 
  PenTool, Moon, Sun, ChevronsUpDown, DollarSign, Euro, PoundSterling, 
  BadgePercent, Upload, BarChart, Mail
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function SettingsPage() {
  const { toast } = useToast();
  const [generalDialogOpen, setGeneralDialogOpen] = useState(false);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [userSheetOpen, setUserSheetOpen] = useState(false);
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [appNameDialogOpen, setAppNameDialogOpen] = useState(false);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [currencyDialogOpen, setCurrencyDialogOpen] = useState(false);
  const [localizationDialogOpen, setLocalizationDialogOpen] = useState(false);
  const [emailTemplateDialogOpen, setEmailTemplateDialogOpen] = useState(false);
  const [analyticsDialogOpen, setAnalyticsDialogOpen] = useState(false);
  
  // App Settings State
  const [appName, setAppName] = useState("Zen Commerce");
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg");
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [currency, setCurrency] = useState("EUR");
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [language, setLanguage] = useState("fr");
  
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
      case "thème":
        setThemeDialogOpen(false);
        break;
      case "nom de l'application":
        setAppNameDialogOpen(false);
        break;
      case "logo":
        setLogoDialogOpen(false);
        break;
      case "devise":
        setCurrencyDialogOpen(false);
        break;
      case "localisation":
        setLocalizationDialogOpen(false);
        break;
      case "modèles d'email":
        setEmailTemplateDialogOpen(false);
        break;
      case "analytiques":
        setAnalyticsDialogOpen(false);
        break;
      default:
        break;
    }
  };
  
  // Save app settings to local storage
  useEffect(() => {
    const savedAppName = localStorage.getItem('appName');
    const savedLogoUrl = localStorage.getItem('logoUrl');
    const savedCurrency = localStorage.getItem('currency');
    const savedCurrencySymbol = localStorage.getItem('currencySymbol');
    
    if (savedAppName) setAppName(savedAppName);
    if (savedLogoUrl) setLogoUrl(savedLogoUrl);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedCurrencySymbol) setCurrencySymbol(savedCurrencySymbol);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('appName', appName);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('currency', currency);
    localStorage.setItem('currencySymbol', currencySymbol);
    
    // Update document title with app name
    document.title = appName;
    
    // Dispatch custom event for other components to update
    window.dispatchEvent(new CustomEvent('app-settings-changed', { 
      detail: { appName, logoUrl, currency, currencySymbol } 
    }));
  }, [appName, logoUrl, currency, currencySymbol]);

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
                <TabsTrigger value="appearance">Apparence</TabsTrigger>
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
                        onClick={() => setAppNameDialogOpen(true)}
                      >
                        <PenTool className="h-4 w-4" />
                        Nom de l'application: {appName}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setLogoDialogOpen(true)}
                      >
                        <Image className="h-4 w-4" />
                        Logo de l'application
                      </Button>
                      
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
                        onClick={() => setLocalizationDialogOpen(true)}
                      >
                        <Languages className="h-4 w-4" />
                        Langue et régionalisation
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setCurrencyDialogOpen(true)}
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
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setEmailTemplateDialogOpen(true)}
                      >
                        <Mail className="h-4 w-4" />
                        Modèles d'email
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setAnalyticsDialogOpen(true)}
                      >
                        <BarChart className="h-4 w-4" />
                        Analytiques et rapports
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
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Apparence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Personnalisation de l'interface et thème visuel.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setThemeDialogOpen(true)}
                      >
                        <Palette className="h-4 w-4" />
                        Thème et couleurs
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Mode affichage modifié",
                            description: "Le mode d'affichage a été mis à jour"
                          });
                        }}
                      >
                        <Monitor className="h-4 w-4" />
                        Taille d'affichage
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Thème modifié",
                            description: "Le thème a été mis à jour avec succès"
                          });
                        }}
                      >
                        <Sun className="h-4 w-4 mr-1" />
                        <Moon className="h-4 w-4" />
                        Mode clair/sombre
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          toast({
                            title: "Mise en page mise à jour",
                            description: "Les préférences de mise en page ont été sauvegardées"
                          });
                        }}
                      >
                        <Smartphone className="h-4 w-4 mr-1" />
                        <Laptop className="h-4 w-4" />
                        Mise en page responsive
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
        <DialogContent className="bg-card text-card-foreground">
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
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-address" className="text-sm font-medium block mb-1">
                  Adresse
                </label>
                <Textarea
                  id="company-address"
                  defaultValue="123 Rue du Commerce, Quartier Central, Dakar, Sénégal"
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-phone" className="text-sm font-medium block mb-1">
                  Téléphone
                </label>
                <Input
                  id="company-phone"
                  defaultValue="+221 77 123 45 67"
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <Input
                  id="company-email"
                  defaultValue="contact@zencosmetics.com"
                  className="w-full bg-muted"
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
      
      {/* Dialogue Nom de l'Application */}
      <Dialog open={appNameDialogOpen} onOpenChange={setAppNameDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Nom de l'application</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div>
              <label htmlFor="app-name" className="text-sm font-medium block mb-1">
                Nom de l'application
              </label>
              <Input
                id="app-name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Entrez le nom de l'application"
                className="w-full bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Ce nom sera affiché dans toute l'application et dans le titre du navigateur.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAppNameDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("nom de l'application")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Logo */}
      <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Logo de l'application</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground">Aucun logo</span>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="logo-url" className="text-sm font-medium block mb-1">
                  URL du logo
                </label>
                <Input
                  id="logo-url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-muted"
                />
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="flex gap-2 items-center">
                  <Upload className="h-4 w-4" />
                  Téléverser une image
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("logo")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Devise */}
      <Dialog open={currencyDialogOpen} onOpenChange={setCurrencyDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Devise et paiements</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="currency" className="text-sm font-medium block mb-1">
                  Devise principale
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={currency === "EUR" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("EUR");
                      setCurrencySymbol("€");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Euro className="h-4 w-4" /> EUR (€)
                  </Button>
                  <Button 
                    variant={currency === "USD" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("USD");
                      setCurrencySymbol("$");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" /> USD ($)
                  </Button>
                  <Button 
                    variant={currency === "GBP" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("GBP");
                      setCurrencySymbol("£");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <PoundSterling className="h-4 w-4" /> GBP (£)
                  </Button>
                </div>
              </div>
              
              <div>
                <label htmlFor="currency-format" className="text-sm font-medium block mb-1">
                  Format d'affichage
                </label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="symbol-before" 
                      name="currency-format" 
                      defaultChecked 
                      className="mr-2"
                    />
                    <label htmlFor="symbol-before">Symbole avant (100€)</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="symbol-after" 
                      name="currency-format"
                      className="mr-2" 
                    />
                    <label htmlFor="symbol-after">Symbole après (100 €)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="tax-rate" className="text-sm font-medium block mb-1">
                  Taux de taxe par défaut
                </label>
                <div className="flex items-center">
                  <Input
                    id="tax-rate"
                    defaultValue="20"
                    className="w-24 bg-muted"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-start gap-2"
                >
                  <BadgePercent className="h-4 w-4" />
                  Configurer les méthodes de paiement
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCurrencyDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("devise")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Localisation */}
      <Dialog open={localizationDialogOpen} onOpenChange={setLocalizationDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Langue et régionalisation</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="text-sm font-medium block mb-1">
                  Langue de l'interface
                </label>
                <select
                  id="language"
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date-format" className="text-sm font-medium block mb-1">
                  Format de date
                </label>
                <select
                  id="date-format"
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
                  defaultValue="dd/mm/yyyy"
                >
                  <option value="dd/mm/yyyy">JJ/MM/AAAA (31/12/2023)</option>
                  <option value="mm/dd/yyyy">MM/JJ/AAAA (12/31/2023)</option>
                  <option value="yyyy-mm-dd">AAAA-MM-JJ (2023-12-31)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="time-format" className="text-sm font-medium block mb-1">
                  Format d'heure
                </label>
                <select
                  id="time-format"
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
                  defaultValue="24h"
                >
                  <option value="24h">24 heures (14:30)</option>
                  <option value="12h">12 heures (02:30 PM)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="timezone" className="text-sm font-medium block mb-1">
                  Fuseau horaire
                </label>
                <select
                  id="timezone"
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
                  defaultValue="Africa/Dakar"
                >
                  <option value="Africa/Dakar">Africa/Dakar (UTC+0)</option>
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLocalizationDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("localisation")}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Sécurité */}
      <Dialog open={securityDialogOpen} onOpenChange={setSecurityDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
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
                    <input type="checkbox" id="min-length" defaultChecked className="bg-muted" />
                    <label htmlFor="min-length" className="text-sm">Longueur minimale de 8 caractères</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="uppercase" defaultChecked className="bg-muted" />
                    <label htmlFor="uppercase" className="text-sm">Au moins une majuscule</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="number" defaultChecked className="bg-muted" />
                    <label htmlFor="number" className="text-sm">Au moins un chiffre</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="special-char" defaultChecked className="bg-muted" />
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
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
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
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
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
      
      {/* Dialogue Thème */}
      <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Thème et couleurs</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium block mb-3">
                  Couleur primaire
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {["#9b87f5", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setPrimaryColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${primaryColor === color ? 'border-black dark:border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="px-3 py-1 text-sm border rounded bg-muted w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-3">
                  Thème prédéfini
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded-full bg-primary mr-2"></div> Par défaut
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div> Océan
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div> Forêt
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded-full bg-amber-600 mr-2"></div> Sable
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-3">
                  Mode d'apparence
                </label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 justify-center gap-2">
                    <Sun className="h-4 w-4" /> Clair
                  </Button>
                  <Button variant="outline" className="flex-1 justify-center gap-2">
                    <Moon className="h-4 w-4" /> Sombre
                  </Button>
                  <Button variant="default" className="flex-1 justify-center gap-2">
                    <ChevronsUpDown className="h-4 w-4" /> Système
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-3">
                  Rayon des coins
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  defaultValue="8"
                  className="w-full bg-muted"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Carré</span>
                  <span>Arrondi</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setThemeDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleSaveSettings("thème")}
            >
              Appliquer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Modèles d'Email */}
      <Dialog open={emailTemplateDialogOpen} onOpenChange={setEmailTemplateDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Modèles d'email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Confirmation de commande</h3>
                  <p className="text-xs text-muted-foreground">Envoyé après la confirmation d'une commande</p>
                </div>
                <Button variant="outline" size="sm">Éditer</Button>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Expédition de commande</h3>
                  <p className="text-xs text-muted-foreground">Envoyé lorsqu'une commande est expédiée</p>
                </div>
                <Button variant="outline" size="sm">Éditer</Button>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Bienvenue</h3>
                  <p className="text-xs text-muted-foreground">Envoyé à la création d'un compte client</p>
                </div>
                <Button variant="outline" size="sm">Éditer</Button>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Réinitialisation de mot de passe</h3>
                  <p className="text-xs text-muted-foreground">Envoyé lors d'une demande de réinitialisation</p>
                </div>
                <Button variant="outline" size="sm">Éditer</Button>
              </div>
              
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-sm font-medium">Abandon de panier</h3>
                  <p className="text-xs text-muted-foreground">Envoyé après un abandon de panier</p>
                </div>
                <Button variant="outline" size="sm">Éditer</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailTemplateDialogOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => handleSaveSettings("modèles d'email")}>
              Enregistrer tout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Analytiques */}
      <Dialog open={analyticsDialogOpen} onOpenChange={setAnalyticsDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Analytiques et rapports</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Services d'analyse
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="google-analytics" defaultChecked className="bg-muted" />
                    <label htmlFor="google-analytics" className="text-sm">Google Analytics</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="meta-pixel" className="bg-muted" />
                    <label htmlFor="meta-pixel" className="text-sm">Meta Pixel</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="hotjar" className="bg-muted" />
                    <label htmlFor="hotjar" className="text-sm">Hotjar</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="google-id" className="text-sm font-medium block mb-1">
                  ID Google Analytics
                </label>
                <Input
                  id="google-id"
                  placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX"
                  className="w-full bg-muted"
                />
              </div>
              
              <div>
                <label htmlFor="reports-email" className="text-sm font-medium block mb-1">
                  Emails pour les rapports automatiques
                </label>
                <Input
                  id="reports-email"
                  placeholder="email@example.com, email2@example.com"
                  className="w-full bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">Séparez les adresses par des virgules</p>
              </div>
              
              <div>
                <label htmlFor="report-frequency" className="text-sm font-medium block mb-1">
                  Fréquence des rapports automatiques
                </label>
                <select
                  id="report-frequency"
                  className="w-full px-3 py-2 rounded-md bg-muted border border-input"
                >
                  <option value="daily">Quotidien</option>
                  <option value="weekly" selected>Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnalyticsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleSaveSettings("analytiques")}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sheet Gestion Utilisateurs */}
      <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen}>
        <SheetContent className="sm:max-w-md bg-card text-card-foreground">
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
        <DialogContent className="bg-card text-card-foreground">
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
                    className="w-full bg-muted"
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
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Événements
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="order-created" defaultChecked className="bg-muted" />
                    <label htmlFor="order-created" className="text-sm">Commande créée</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="order-updated" defaultChecked className="bg-muted" />
                    <label htmlFor="order-updated" className="text-sm">Commande mise à jour</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="payment-received" defaultChecked className="bg-muted" />
                    <label htmlFor="payment-received" className="text-sm">Paiement reçu</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="inventory-low" className="bg-muted" />
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

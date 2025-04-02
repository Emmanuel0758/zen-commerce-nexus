
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
  BadgePercent, Upload, BarChart, Mail, Download, ChevronDown
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
  const [displayDialogOpen, setDisplayDialogOpen] = useState(false);
  const [journalAuditOpen, setJournalAuditOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [timeFormat, setTimeFormat] = useState("24h");
  
  // App Settings State
  const [appName, setAppName] = useState("Zen Commerce");
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg");
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [currency, setCurrency] = useState("XOF");
  const [currencySymbol, setCurrencySymbol] = useState("CFA");
  const [language, setLanguage] = useState("fr");
  const [companyInfo, setCompanyInfo] = useState({
    name: "Zen Cosmetics",
    address: "123 Rue du Commerce, Quartier Central, Dakar, Sénégal",
    phone: "+221 77 123 45 67",
    email: "contact@zencosmetics.com"
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    marketing: false,
    system: true
  });
  
  // Function to download audit logs
  const downloadAuditLogs = () => {
    // Create sample audit log data
    const auditData = [
      { timestamp: "2023-06-05 14:30:22", user: "admin@zencosmetics.com", action: "Login successful", ip: "192.168.1.145" },
      { timestamp: "2023-06-05 15:12:10", user: "admin@zencosmetics.com", action: "Updated product #123", ip: "192.168.1.145" },
      { timestamp: "2023-06-05 16:08:45", user: "f.ndiaye@zencosmetics.com", action: "Created order #789", ip: "192.168.1.150" },
      { timestamp: "2023-06-06 09:15:32", user: "admin@zencosmetics.com", action: "Changed password", ip: "192.168.1.145" },
      { timestamp: "2023-06-06 10:22:18", user: "m.sow@zencosmetics.com", action: "Updated inventory", ip: "192.168.1.180" }
    ];
    
    // Convert data to CSV
    let csvContent = "Date,Utilisateur,Action,Adresse IP\n";
    auditData.forEach(entry => {
      csvContent += `${entry.timestamp},"${entry.user}","${entry.action}","${entry.ip}"\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `journal_audit_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: "Le journal d'audit a été téléchargé"
    });
  };
  
  // Function to download permissions report
  const downloadPermissionsReport = () => {
    // Create sample permissions data
    const permissionsData = [
      { role: "Administrateur", module: "Tous", create: "✓", read: "✓", update: "✓", delete: "✓" },
      { role: "Marketing", module: "Produits", create: "✓", read: "✓", update: "✓", delete: "×" },
      { role: "Marketing", module: "Commandes", create: "×", read: "✓", update: "×", delete: "×" },
      { role: "Marketing", module: "Campagnes", create: "✓", read: "✓", update: "✓", delete: "✓" },
      { role: "Logistique", module: "Produits", create: "×", read: "✓", update: "✓", delete: "×" },
      { role: "Logistique", module: "Commandes", create: "×", read: "✓", update: "✓", delete: "×" },
      { role: "Logistique", module: "Expéditions", create: "✓", read: "✓", update: "✓", delete: "×" }
    ];
    
    // Convert data to CSV
    let csvContent = "Rôle,Module,Créer,Lire,Modifier,Supprimer\n";
    permissionsData.forEach(entry => {
      csvContent += `"${entry.role}","${entry.module}","${entry.create}","${entry.read}","${entry.update}","${entry.delete}"\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `permissions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: "Le rapport des permissions a été téléchargé"
    });
  };
  
  // Function to download analytics reports
  const downloadAnalyticsReport = () => {
    // Create sample analytics data
    const analyticsData = [
      { date: "2023-06-01", pageviews: 245, visitors: 120, conversion: 3.2 },
      { date: "2023-06-02", pageviews: 312, visitors: 145, conversion: 3.8 },
      { date: "2023-06-03", pageviews: 198, visitors: 98, conversion: 2.9 },
      { date: "2023-06-04", pageviews: 267, visitors: 132, conversion: 4.1 },
      { date: "2023-06-05", pageviews: 376, visitors: 178, conversion: 5.2 }
    ];
    
    // Convert data to CSV
    let csvContent = "Date,Pages vues,Visiteurs,Taux de conversion (%)\n";
    analyticsData.forEach(entry => {
      csvContent += `${entry.date},${entry.pageviews},${entry.visitors},${entry.conversion}\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rapport_analytique_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: "Le rapport analytique a été téléchargé"
    });
  };
  
  // Function to download a sample email template
  const downloadEmailTemplate = (templateName) => {
    // Create sample email template HTML
    const templateHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${templateName}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 200px; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
    .button { display: inline-block; padding: 10px 20px; background-color: #9b87f5; color: white; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="${appName}" class="logo">
      <h1>${templateName}</h1>
    </div>
    <p>Bonjour {{nom_client}},</p>
    <p>Exemple de contenu pour le modèle ${templateName.toLowerCase()}.</p>
    <p>Ceci est un modèle que vous pouvez personnaliser selon vos besoins.</p>
    <p><a href="{{lien_action}}" class="button">Action principale</a></p>
    <div class="footer">
      <p>${companyInfo.name} | ${companyInfo.address} | ${companyInfo.phone}</p>
      <p>&copy; ${new Date().getFullYear()} ${appName}. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>`;
    
    // Create and trigger download
    const blob = new Blob([templateHTML], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `modele_email_${templateName.toLowerCase().replace(/ /g, '_')}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement réussi",
      description: `Le modèle '${templateName}' a été téléchargé`
    });
  };
  
  const handleSaveSettings = (type: string) => {
    toast({
      title: "Paramètres enregistrés",
      description: `Les paramètres ${type} ont été enregistrés avec succès`
    });
    
    switch(type) {
      case "généraux":
        setCompanyInfo({...companyInfo});
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
        // Apply theme changes
        document.documentElement.style.setProperty('--primary-color', primaryColor);
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
      case "notifications":
        setNotificationsDialogOpen(false);
        break;
      case "affichage":
        setDisplayDialogOpen(false);
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
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    const savedLanguage = localStorage.getItem('language');
    const savedDateFormat = localStorage.getItem('dateFormat');
    const savedTimeFormat = localStorage.getItem('timeFormat');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedCompanyInfo = localStorage.getItem('companyInfo');
    const savedNotifications = localStorage.getItem('notifications');
    
    if (savedAppName) setAppName(savedAppName);
    if (savedLogoUrl) setLogoUrl(savedLogoUrl);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedCurrencySymbol) setCurrencySymbol(savedCurrencySymbol);
    if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedDateFormat) setDateFormat(savedDateFormat);
    if (savedTimeFormat) setTimeFormat(savedTimeFormat);
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    if (savedCompanyInfo) setCompanyInfo(JSON.parse(savedCompanyInfo));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    
    // Apply saved theme settings
    if (savedPrimaryColor) {
      document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    }
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('appName', appName);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('currency', currency);
    localStorage.setItem('currencySymbol', currencySymbol);
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('language', language);
    localStorage.setItem('dateFormat', dateFormat);
    localStorage.setItem('timeFormat', timeFormat);
    localStorage.setItem('darkMode', String(darkMode));
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update document title with app name
    document.title = appName;
    
    // Dispatch custom event for other components to update
    window.dispatchEvent(new CustomEvent('app-settings-changed', { 
      detail: { 
        appName, 
        logoUrl, 
        currency, 
        currencySymbol, 
        primaryColor,
        language,
        dateFormat,
        timeFormat,
        darkMode,
        companyInfo
      } 
    }));
  }, [appName, logoUrl, currency, currencySymbol, primaryColor, language, dateFormat, timeFormat, darkMode, companyInfo, notifications]);

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
                        Devise et paiements: {currencySymbol}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start gap-2"
                        onClick={() => setNotificationsDialogOpen(true)}
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
                        onClick={() => setJournalAuditOpen(true)}
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
                        onClick={() => setPermissionsOpen(true)}
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
                        onClick={() => setDisplayDialogOpen(true)}
                      >
                        <Monitor className="h-4 w-4" />
                        Taille d'affichage
                      </Button>
                      
                      <Button 
                        variant={darkMode ? "default" : "outline"}
                        className="flex items-center justify-start gap-2"
                        onClick={() => {
                          setDarkMode(!darkMode);
                          if (!darkMode) {
                            document.documentElement.classList.add('dark');
                          } else {
                            document.documentElement.classList.remove('dark');
                          }
                          toast({
                            title: "Thème modifié",
                            description: `Mode ${darkMode ? "clair" : "sombre"} activé`
                          });
                        }}
                      >
                        {darkMode ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                        {darkMode ? "Mode clair" : "Mode sombre"}
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
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-address" className="text-sm font-medium block mb-1">
                  Adresse
                </label>
                <Textarea
                  id="company-address"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-phone" className="text-sm font-medium block mb-1">
                  Téléphone
                </label>
                <Input
                  id="company-phone"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  className="w-full bg-muted"
                />
              </div>
              <div>
                <label htmlFor="company-email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <Input
                  id="company-email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
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
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  <Upload className="h-4 w-4" />
                  Téléverser une image
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setLogoUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
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
                <div className="grid grid-cols-4 gap-4">
                  <Button 
                    variant={currency === "XOF" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("XOF");
                      setCurrencySymbol("CFA");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    CFA (XOF)
                  </Button>
                  <Button 
                    variant={currency === "EUR" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("EUR");
                      setCurrencySymbol("€");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Euro className="h-4 w-4" /> EUR
                  </Button>
                  <Button 
                    variant={currency === "USD" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("USD");
                      setCurrencySymbol("$");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" /> USD
                  </Button>
                  <Button 
                    variant={currency === "GBP" ? "default" : "outline"}
                    onClick={() => {
                      setCurrency("GBP");
                      setCurrencySymbol("£");
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <PoundSterling className="h-4 w-4" /> GBP
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
                      defaultChecked={currency !== "XOF"}
                      className="mr-2"
                      onChange={() => {
                        // Update any display format preferences
                        toast({
                          title: "Format mis à jour",
                          description: "Le symbole sera affiché avant le montant"
                        });
                      }}
                    />
                    <label htmlFor="symbol-before">Symbole avant (100{currencySymbol})</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="symbol-after" 
                      name="currency-format"
                      defaultChecked={currency === "XOF"}
                      className="mr-2" 
                      onChange={() => {
                        // Update any display format preferences
                        toast({
                          title: "Format mis à jour",
                          description: "Le symbole sera affiché après le montant"
                        });
                      }}
                    />
                    <label htmlFor="symbol-after">Symbole après (100 {currencySymbol})</label>
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
                    defaultValue={currency === "XOF" ? "18" : "20"}
                    className="w-24 bg-muted"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-start gap-2"
                  onClick={() => {
                    toast({
                      title: "Méthodes de paiement",
                      description: "Les méthodes de paiement ont été configurées avec succès"
                    });
                  }}
                >
                  <BadgePercent className="h-4 w-4" />
                  Configurer les méthodes de paiement
                </Button>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Services de paiement disponibles</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="orange-money" className="bg-muted" defaultChecked={currency === "XOF"} />
                    <label htmlFor="orange-money">Orange Money</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="wave" className="bg-muted" defaultChecked={currency === "XOF"} />
                    <label htmlFor="wave">Wave</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="paypal" className="bg-muted" defaultChecked />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="stripe" className="bg-muted" defaultChecked />
                    <label htmlFor="stripe">Stripe</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="bank-transfer" className="bg-muted" defaultChecked />
                    <label htmlFor="bank-transfer">Virement bancaire</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="cash" className="bg-muted" defaultChecked />
                    <label htmlFor="cash">Espèces</label>
                  </div>
                </div>
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
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Langues</SelectLabel>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="wo">Wolof</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="date-format" className="text-sm font-medium block mb-1">
                  Format de date
                </label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner un format de date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA (31/12/2023)</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA (12/31/2023)</SelectItem>
                    <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ (2023-12-31)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="time-format" className="text-sm font-medium block mb-1">
                  Format d'heure
                </label>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner un format d'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 heures (14:30)</SelectItem>
                    <SelectItem value="12h">12 heures (02:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="timezone" className="text-sm font-medium block mb-1">
                  Fuseau horaire
                </label>
                <Select defaultValue="Africa/Dakar">
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Afrique</SelectLabel>
                      <SelectItem value="Africa/Dakar">Dakar (UTC+0)</SelectItem>
                      <SelectItem value="Africa/Abidjan">Abidjan (UTC+0)</SelectItem>
                      <SelectItem value="Africa/Bamako">Bamako (UTC+0)</SelectItem>
                      <SelectItem value="Africa/Casablanca">Casablanca (UTC+1)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Europe</SelectLabel>
                      <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                      <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Amériques</SelectLabel>
                      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Asie</SelectLabel>
                      <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select defaultValue="90">
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner une période d'expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Jamais</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="60">60 jours</SelectItem>
                    <SelectItem value="90">90 jours</SelectItem>
                    <SelectItem value="180">180 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="failed-attempts" className="text-sm font-medium block mb-1">
                  Blocage après tentatives échouées
                </label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner un nombre de tentatives" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 tentatives</SelectItem>
                    <SelectItem value="5">5 tentatives</SelectItem>
                    <SelectItem value="10">10 tentatives</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Button variant="outline" className="justify-start" onClick={() => {
                    setPrimaryColor("#9b87f5");
                    toast({
                      title: "Thème appliqué",
                      description: "Le thème par défaut a été appliqué"
                    });
                  }}>
                    <div className="w-4 h-4 rounded-full bg-primary mr-2"></div> Par défaut
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => {
                    setPrimaryColor("#3b82f6");
                    toast({
                      title: "Thème appliqué",
                      description: "Le thème océan a été appliqué"
                    });
                  }}>
                    <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div> Océan
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => {
                    setPrimaryColor("#10b981");
                    toast({
                      title: "Thème appliqué",
                      description: "Le thème forêt a été appliqué"
                    });
                  }}>
                    <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div> Forêt
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => {
                    setPrimaryColor("#f59e0b");
                    toast({
                      title: "Thème appliqué",
                      description: "Le thème sable a été appliqué"
                    });
                  }}>
                    <div className="w-4 h-4 rounded-full bg-amber-600 mr-2"></div> Sable
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-3">
                  Mode d'apparence
                </label>
                <div className="flex gap-4">
                  <Button 
                    variant={!darkMode ? "default" : "outline"} 
                    className="flex-1 justify-center gap-2"
                    onClick={() => {
                      setDarkMode(false);
                      document.documentElement.classList.remove('dark');
                    }}
                  >
                    <Sun className="h-4 w-4" /> Clair
                  </Button>
                  <Button 
                    variant={darkMode ? "default" : "outline"} 
                    className="flex-1 justify-center gap-2"
                    onClick={() => {
                      setDarkMode(true);
                      document.documentElement.classList.add('dark');
                    }}
                  >
                    <Moon className="h-4 w-4" /> Sombre
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-center gap-2"
                    onClick={() => {
                      // Follow system preference
                      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      setDarkMode(systemPrefersDark);
                      if (systemPrefersDark) {
                        document.documentElement.classList.add('dark');
                      } else {
                        document.documentElement.classList.remove('dark');
                      }
                      toast({
                        title: "Mode système activé",
                        description: "L'apparence suivra les préférences système"
                      });
                    }}
                  >
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Modèle ouvert",
                      description: "L'éditeur de modèle a été ouvert"
                    });
                  }}>Éditer</Button>
                  <Button variant="outline" size="sm" onClick={() => downloadEmailTemplate("Confirmation de commande")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Expédition de commande</h3>
                  <p className="text-xs text-muted-foreground">Envoyé lorsqu'une commande est expédiée</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Modèle ouvert",
                      description: "L'éditeur de modèle a été ouvert"
                    });
                  }}>Éditer</Button>
                  <Button variant="outline" size="sm" onClick={() => downloadEmailTemplate("Expédition de commande")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Bienvenue</h3>
                  <p className="text-xs text-muted-foreground">Envoyé à la création d'un compte client</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Modèle ouvert",
                      description: "L'éditeur de modèle a été ouvert"
                    });
                  }}>Éditer</Button>
                  <Button variant="outline" size="sm" onClick={() => downloadEmailTemplate("Bienvenue")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-sm font-medium">Réinitialisation de mot de passe</h3>
                  <p className="text-xs text-muted-foreground">Envoyé lors d'une demande de réinitialisation</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Modèle ouvert",
                      description: "L'éditeur de modèle a été ouvert"
                    });
                  }}>Éditer</Button>
                  <Button variant="outline" size="sm" onClick={() => downloadEmailTemplate("Réinitialisation de mot de passe")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-sm font-medium">Abandon de panier</h3>
                  <p className="text-xs text-muted-foreground">Envoyé après un abandon de panier</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Modèle ouvert",
                      description: "L'éditeur de modèle a été ouvert"
                    });
                  }}>Éditer</Button>
                  <Button variant="outline" size="sm" onClick={() => downloadEmailTemplate("Abandon de panier")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
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
                <Select defaultValue="weekly">
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => downloadAnalyticsReport()}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le rapport
                </Button>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Rapport envoyé",
                    description: "Le rapport a été envoyé par email"
                  });
                }}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer par email
                </Button>
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
      
      {/* Dialogue Notifications */}
      <Dialog open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Paramètres de notifications</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Canaux de notification
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="email-notif" 
                      checked={notifications.email}
                      onChange={() => setNotifications({...notifications, email: !notifications.email})}
                      className="bg-muted" 
                    />
                    <label htmlFor="email-notif" className="text-sm">Notifications par email</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="push-notif" 
                      checked={notifications.push}
                      onChange={() => setNotifications({...notifications, push: !notifications.push})}
                      className="bg-muted" 
                    />
                    <label htmlFor="push-notif" className="text-sm">Notifications push</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Types de notifications
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="orders-notif" 
                      checked={notifications.orders}
                      onChange={() => setNotifications({...notifications, orders: !notifications.orders})}
                      className="bg-muted" 
                    />
                    <label htmlFor="orders-notif" className="text-sm">Commandes et paiements</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="marketing-notif" 
                      checked={notifications.marketing}
                      onChange={() => setNotifications({...notifications, marketing: !notifications.marketing})}
                      className="bg-muted" 
                    />
                    <label htmlFor="marketing-notif" className="text-sm">Marketing et promotions</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="system-notif" 
                      checked={notifications.system}
                      onChange={() => setNotifications({...notifications, system: !notifications.system})}
                      className="bg-muted" 
                    />
                    <label htmlFor="system-notif" className="text-sm">Système et administration</label>
                  </div>
                </div>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Test envoyé",
                      description: "Une notification de test a été envoyée"
                    });
                  }}
                >
                  Envoyer une notification de test
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotificationsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleSaveSettings("notifications")}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Affichage */}
      <Dialog open={displayDialogOpen} onOpenChange={setDisplayDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Taille d'affichage</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Taille de police
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs">A</span>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    defaultValue="16"
                    className="w-full bg-muted"
                    onChange={(e) => {
                      document.documentElement.style.fontSize = `${e.target.value}px`;
                    }}
                  />
                  <span className="text-lg">A</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Densité d'affichage
                </label>
                <Select defaultValue="normal">
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue placeholder="Sélectionner une densité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="comfortable">Confortable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Animations
                </label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="enable-animations" defaultChecked className="bg-muted" />
                  <label htmlFor="enable-animations" className="text-sm">Activer les animations</label>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Mode d'accessibilité
                </label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="high-contrast" className="bg-muted" />
                  <label htmlFor="high-contrast" className="text-sm">Contraste élevé</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDisplayDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleSaveSettings("affichage")}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Journaux d'audit */}
      <Dialog open={journalAuditOpen} onOpenChange={setJournalAuditOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Journaux d'audit</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Période
                </label>
                <div className="flex gap-4">
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full bg-muted">
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 derniers jours</SelectItem>
                      <SelectItem value="30">30 derniers jours</SelectItem>
                      <SelectItem value="90">90 derniers jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Type d'événements
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="login-events" defaultChecked className="bg-muted" />
                    <label htmlFor="login-events" className="text-sm">Connexions</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="data-events" defaultChecked className="bg-muted" />
                    <label htmlFor="data-events" className="text-sm">Modifications de données</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="system-events" defaultChecked className="bg-muted" />
                    <label htmlFor="system-events" className="text-sm">Événements système</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm">Aperçu des journaux (5 dernières entrées)</p>
                <div className="max-h-60 overflow-y-auto border rounded-md">
                  <table className="w-full text-xs">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Utilisateur</th>
                        <th className="p-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">2023-06-05 14:30:22</td>
                        <td className="p-2">admin@zencosmetics.com</td>
                        <td className="p-2">Connexion réussie</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">2023-06-05 15:12:10</td>
                        <td className="p-2">admin@zencosmetics.com</td>
                        <td className="p-2">Mise à jour produit #123</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">2023-06-05 16:08:45</td>
                        <td className="p-2">f.ndiaye@zencosmetics.com</td>
                        <td className="p-2">Création commande #789</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">2023-06-06 09:15:32</td>
                        <td className="p-2">admin@zencosmetics.com</td>
                        <td className="p-2">Changement mot de passe</td>
                      </tr>
                      <tr>
                        <td className="p-2">2023-06-06 10:22:18</td>
                        <td className="p-2">m.sow@zencosmetics.com</td>
                        <td className="p-2">Mise à jour inventaire</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <Button 
                  className="w-full"
                  onClick={downloadAuditLogs}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger les journaux d'audit
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setJournalAuditOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue Permissions */}
      <Dialog open={permissionsOpen} onOpenChange={setPermissionsOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Permissions et rôles</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Rôles disponibles
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <div className="flex-grow">
                      <p className="font-medium">Administrateur</p>
                      <p className="text-xs text-muted-foreground">Accès complet à toutes les fonctionnalités</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Rôle modifié",
                        description: "Les permissions du rôle ont été mises à jour"
                      });
                    }}>Éditer</Button>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <div className="flex-grow">
                      <p className="font-medium">Marketing</p>
                      <p className="text-xs text-muted-foreground">Gestion des produits et campagnes marketing</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Rôle modifié",
                        description: "Les permissions du rôle ont été mises à jour"
                      });
                    }}>Éditer</Button>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <div className="flex-grow">
                      <p className="font-medium">Logistique</p>
                      <p className="text-xs text-muted-foreground">Gestion des commandes et expéditions</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Rôle modifié",
                        description: "Les permissions du rôle ont été mises à jour"
                      });
                    }}>Éditer</Button>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Nouveau rôle",
                    description: "Un nouveau rôle a été créé"
                  });
                }}
              >
                Ajouter un nouveau rôle
              </Button>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={downloadPermissionsReport}
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger le rapport de permissions
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermissionsOpen(false)}>
              Fermer
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Permissions enregistrées",
                  description: "Les permissions ont été mises à jour avec succès"
                });
                setPermissionsOpen(false);
              }}
            >
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
                    navigator.clipboard.writeText("sk_prod_Zen7891ABCDEF0123456789");
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
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Documentation API
                </label>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const apiDocs = `
                      # API Documentation
                      
                      ## Base URL
                      https://api.${window.location.hostname}
                      
                      ## Authentication
                      All requests must include the API key in the Authorization header:
                      \`Authorization: Bearer sk_prod_Zen7891ABCDEF0123456789\`
                      
                      ## Endpoints
                      
                      ### GET /products
                      Retrieve all products
                      
                      ### GET /products/:id
                      Retrieve a specific product
                      
                      ### POST /orders
                      Create a new order
                      
                      ### GET /orders/:id
                      Retrieve a specific order
                      
                      ### PUT /orders/:id/status
                      Update order status
                    `;
                    
                    const blob = new Blob([apiDocs], { type: 'text/plain;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('download', 'api_documentation.md');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    toast({
                      title: "Documentation téléchargée",
                      description: "La documentation API a été téléchargée"
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la documentation API
                </Button>
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

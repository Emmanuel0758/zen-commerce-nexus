import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAppSettings } from "@/hooks/use-app-settings";
import { Loader2, Save, Upload, Download, RefreshCw, AlertTriangle, FileDown, Settings2, Shield, Eye, FileText } from "lucide-react";
import { exportData } from "@/utils/exportUtils";

const SettingsPage = () => {
  const { settings, updateSettings, resetSettings } = useAppSettings();
  
  const [formState, setFormState] = useState({
    appName: settings.appName,
    logo: settings.logo,
    currency: settings.currency,
    theme: settings.theme,
    emailTemplates: settings.emailTemplates,
    analyticsEnabled: settings.analyticsEnabled,
    language: settings.language,
    companyAddress: '',
    companyCity: '',
    companyCountry: 'Côte d\'Ivoire',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    companyTaxId: '',
    exportFooter: '',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    timezone: 'Africa/Abidjan',
    defaultCurrency: settings.currency,
    invoicePrefix: 'INV-',
    invoiceSuffix: '',
    orderPrefix: 'ORD-',
    orderSuffix: '',
    quotePrefix: 'QUO-',
    quoteSuffix: '',
    receiptPrefix: 'REC-',
    receiptSuffix: '',
    pdfOrientation: 'portrait',
    pdfPageSize: 'a4',
    pdaMarginTop: '15',
    pdfMarginRight: '15',
    pdfMarginBottom: '15',
    pdfMarginLeft: '15',
    notificationSound: true,
    desktopNotifications: true,
    emailNotifications: true,
    autoSave: true,
    backupFrequency: 'daily',
    dataRetentionPeriod: '1year',
    defaultLanguage: settings.language,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [exportFormat, setExportFormat] = useState<"json" | "pdf" | "excel">("json");

  // Load company information from localStorage if available
  useEffect(() => {
    const companyInfo = localStorage.getItem('companyInfo');
    if (companyInfo) {
      try {
        const parsedInfo = JSON.parse(companyInfo);
        setFormState(prev => ({
          ...prev,
          ...parsedInfo
        }));
      } catch (error) {
        console.error('Failed to parse company info:', error);
      }
    }
  }, []);

  // Handle file selection for logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save app settings
      updateSettings({
        ...formState,
        logo: logoPreview,
      });
      
      // Save company information separately
      const companyInfo = {
        companyAddress: formState.companyAddress,
        companyCity: formState.companyCity,
        companyCountry: formState.companyCountry,
        companyEmail: formState.companyEmail,
        companyPhone: formState.companyPhone,
        companyWebsite: formState.companyWebsite,
        companyTaxId: formState.companyTaxId,
        exportFooter: formState.exportFooter,
        dateFormat: formState.dateFormat,
        timeFormat: formState.timeFormat,
        timezone: formState.timezone,
        defaultCurrency: formState.defaultCurrency,
        invoicePrefix: formState.invoicePrefix,
        invoiceSuffix: formState.invoiceSuffix,
        orderPrefix: formState.orderPrefix,
        orderSuffix: formState.orderSuffix,
        quotePrefix: formState.quotePrefix,
        quoteSuffix: formState.quoteSuffix,
        receiptPrefix: formState.receiptPrefix,
        receiptSuffix: formState.receiptSuffix,
        pdfOrientation: formState.pdfOrientation,
        pdfPageSize: formState.pdfPageSize,
        pdaMarginTop: formState.pdaMarginTop,
        pdfMarginRight: formState.pdfMarginRight,
        pdfMarginBottom: formState.pdfMarginBottom,
        pdfMarginLeft: formState.pdfMarginLeft,
      };
      
      localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
      
      toast({
        title: "Paramètres mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des paramètres.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    setIsRestoring(true);
    
    try {
      resetSettings();
      localStorage.removeItem('companyInfo');
      
      setFormState({
        appName: 'Zen Commerce',
        logo: null,
        currency: 'XOF',
        theme: 'system',
        emailTemplates: 'default',
        analyticsEnabled: true,
        language: 'fr',
        companyAddress: '',
        companyCity: '',
        companyCountry: 'Côte d\'Ivoire',
        companyEmail: '',
        companyPhone: '',
        companyWebsite: '',
        companyTaxId: '',
        exportFooter: '',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        timezone: 'Africa/Abidjan',
        defaultCurrency: 'XOF',
        invoicePrefix: 'INV-',
        invoiceSuffix: '',
        orderPrefix: 'ORD-',
        orderSuffix: '',
        quotePrefix: 'QUO-',
        quoteSuffix: '',
        receiptPrefix: 'REC-',
        receiptSuffix: '',
        pdfOrientation: 'portrait',
        pdfPageSize: 'a4',
        pdaMarginTop: '15',
        pdfMarginRight: '15',
        pdfMarginBottom: '15',
        pdfMarginLeft: '15',
        notificationSound: true,
        desktopNotifications: true,
        emailNotifications: true,
        autoSave: true,
        backupFrequency: 'daily',
        dataRetentionPeriod: '1year',
        defaultLanguage: 'fr',
      });
      
      setLogoPreview(null);
      setLogoFile(null);
      
      toast({
        title: "Paramètres réinitialisés",
        description: "Tous les paramètres ont été réinitialisés aux valeurs par défaut.",
      });
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réinitialisation des paramètres.",
        variant: "destructive"
      });
    } finally {
      setIsRestoring(false);
      setShowResetConfirm(false);
    }
  };

  const handleExportSettings = async () => {
    setIsExporting(true);
    
    try {
      const settingsData = [
        {
          ...settings,
          ...formState,
          logo: 'Données binaires non incluses'
        }
      ];
      
      const metadata = {
        title: 'Configuration de l\'application',
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };
      
      await exportData(settingsData, exportFormat, "zen-settings", metadata);
      
      toast({
        title: "Paramètres exportés",
        description: `Les paramètres ont été exportés avec succès au format ${exportFormat.toUpperCase()}.`,
      });
    } catch (error) {
      console.error('Error exporting settings:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exportation des paramètres.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const downloadFile = (filename: string, content: string = "Sample content") => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Fichier téléchargé",
      description: `${filename} a été téléchargé avec succès.`,
    });
  };

  return (
    <Layout title="Paramètres">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="currency">Devise & Paiement</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
          <TabsTrigger value="export">Export & Backup</TabsTrigger>
          <TabsTrigger value="integration">Intégrations</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
        </TabsList>

        {/* Onglet Général */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux de votre application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Nom de l'application</Label>
                  <Input
                    id="appName"
                    name="appName"
                    value={formState.appName}
                    onChange={handleInputChange}
                    placeholder="Nom de l'application"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select
                    value={formState.language}
                    onValueChange={(value) => handleSelectChange("language", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Format de date</Label>
                  <Select
                    value={formState.dateFormat}
                    onValueChange={(value) => handleSelectChange("dateFormat", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un format de date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Format de l'heure</Label>
                  <Select
                    value={formState.timeFormat}
                    onValueChange={(value) => handleSelectChange("timeFormat", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un format d'heure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 heures (14:30)</SelectItem>
                      <SelectItem value="12h">12 heures (2:30 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select
                    value={formState.timezone}
                    onValueChange={(value) => handleSelectChange("timezone", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Abidjan">Africa/Abidjan (UTC+0)</SelectItem>
                      <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center space-x-4">
                    {logoPreview && (
                      <div className="w-16 h-16 rounded border overflow-hidden">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-full max-w-sm"
                    />
                    {logoPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setLogoPreview(null);
                          setLogoFile(null);
                        }}
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoSave"
                      checked={formState.autoSave}
                      onCheckedChange={(checked) => handleSwitchChange("autoSave", checked)}
                    />
                    <Label htmlFor="autoSave">Enregistrement automatique</Label>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="mt-4">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les modifications
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Entreprise */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Ces informations seront utilisées dans les documents et rapports générés.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Adresse</Label>
                    <Input
                      id="companyAddress"
                      name="companyAddress"
                      value={formState.companyAddress}
                      onChange={handleInputChange}
                      placeholder="123 Avenue de Commerce"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCity">Ville</Label>
                    <Input
                      id="companyCity"
                      name="companyCity"
                      value={formState.companyCity}
                      onChange={handleInputChange}
                      placeholder="Abidjan"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCountry">Pays</Label>
                    <Select
                      value={formState.companyCountry}
                      onValueChange={(value) => handleSelectChange("companyCountry", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                        <SelectItem value="Sénégal">Sénégal</SelectItem>
                        <SelectItem value="Cameroun">Cameroun</SelectItem>
                        <SelectItem value="Mali">Mali</SelectItem>
                        <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                        <SelectItem value="Niger">Niger</SelectItem>
                        <SelectItem value="Togo">Togo</SelectItem>
                        <SelectItem value="Bénin">Bénin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      value={formState.companyEmail}
                      onChange={handleInputChange}
                      placeholder="contact@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Téléphone</Label>
                    <Input
                      id="companyPhone"
                      name="companyPhone"
                      value={formState.companyPhone}
                      onChange={handleInputChange}
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Site web</Label>
                    <Input
                      id="companyWebsite"
                      name="companyWebsite"
                      value={formState.companyWebsite}
                      onChange={handleInputChange}
                      placeholder="www.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyTaxId">Numéro d'identification fiscale</Label>
                    <Input
                      id="companyTaxId"
                      name="companyTaxId"
                      value={formState.companyTaxId}
                      onChange={handleInputChange}
                      placeholder="XXX-XXX-XXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exportFooter">Pied de page pour documents exportés</Label>
                  <Textarea
                    id="exportFooter"
                    name="exportFooter"
                    value={formState.exportFooter}
                    onChange={handleInputChange}
                    placeholder="Merci pour votre confiance"
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les informations
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Apparence */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select
                    value={formState.theme}
                    onValueChange={(value) => handleSelectChange("theme", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailTemplates">Templates d'email</Label>
                  <Select
                    value={formState.emailTemplates}
                    onValueChange={(value) =>
                      handleSelectChange("emailTemplates", value)
                    }
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="modern">Moderne</SelectItem>
                      <SelectItem value="corporate">Corporatif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => downloadFile("email-templates.html", "<html><body><h1>Template d'email</h1><p>Contenu du template</p></body></html>")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger les templates
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Devise & Paiement */}
        <TabsContent value="currency">
          <Card>
            <CardHeader>
              <CardTitle>Devise & Paiement</CardTitle>
              <CardDescription>
                Configurez les paramètres de devise et de paiement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise par défaut</Label>
                  <Select
                    value={formState.defaultCurrency}
                    onValueChange={(value) =>
                      handleSelectChange("defaultCurrency", value)
                    }
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XOF">CFA (XOF)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar américain ($)</SelectItem>
                      <SelectItem value="GBP">Livre sterling (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Méthodes de paiement actives</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-card" defaultChecked />
                        <Label htmlFor="payment-card">Carte bancaire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-mobile" defaultChecked />
                        <Label htmlFor="payment-mobile">Mobile Money</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-transfer" defaultChecked />
                        <Label htmlFor="payment-transfer">Virement bancaire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-cash" defaultChecked />
                        <Label htmlFor="payment-cash">Paiement à la livraison</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les modifications
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Documents */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des documents</CardTitle>
              <CardDescription>
                Configurez l'apparence et le comportement des documents exportés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">Préfixe des factures</Label>
                    <Input
                      id="invoicePrefix"
                      name="invoicePrefix"
                      value={formState.invoicePrefix}
                      onChange={handleInputChange}
                      placeholder="INV-"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invoiceSuffix">Suffixe des factures</Label>
                    <Input
                      id="invoiceSuffix"
                      name="invoiceSuffix"
                      value={formState.invoiceSuffix}
                      onChange={handleInputChange}
                      placeholder="-2025"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="orderPrefix">Préfixe des commandes</Label>
                    <Input
                      id="orderPrefix"
                      name="orderPrefix"
                      value={formState.orderPrefix}
                      onChange={handleInputChange}
                      placeholder="ORD-"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="orderSuffix">Suffixe des commandes</Label>
                    <Input
                      id="orderSuffix"
                      name="orderSuffix"
                      value={formState.orderSuffix}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quotePrefix">Préfixe des devis</Label>
                    <Input
                      id="quotePrefix"
                      name="quotePrefix"
                      value={formState.quotePrefix}
                      onChange={handleInputChange}
                      placeholder="QUO-"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quoteSuffix">Suffixe des devis</Label>
                    <Input
                      id="quoteSuffix"
                      name="quoteSuffix"
                      value={formState.quoteSuffix}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="receiptPrefix">Préfixe des reçus</Label>
                    <Input
                      id="receiptPrefix"
                      name="receiptPrefix"
                      value={formState.receiptPrefix}
                      onChange={handleInputChange}
                      placeholder="REC-"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="receiptSuffix">Suffixe des reçus</Label>
                    <Input
                      id="receiptSuffix"
                      name="receiptSuffix"
                      value={formState.receiptSuffix}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pdfOrientation">Orientation des PDF</Label>
                    <Select
                      value={formState.pdfOrientation}
                      onValueChange={(value) => handleSelectChange("pdfOrientation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Paysage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pdfPageSize">Taille des pages PDF</Label>
                    <Select
                      value={formState.pdfPageSize}
                      onValueChange={(value) => handleSelectChange("pdfPageSize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pdaMarginTop">Marge haut (mm)</Label>
                    <Input
                      id="pdaMarginTop"
                      name="pdaMarginTop"
                      type="number"
                      value={formState.pdaMarginTop}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pdfMarginRight">Marge droite (mm)</Label>
                    <Input
                      id="pdfMarginRight"
                      name="pdfMarginRight"
                      type="number"
                      value={formState.pdfMarginRight}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pdfMarginBottom">Marge bas (mm)</Label>
                    <Input
                      id="pdfMarginBottom"
                      name="pdfMarginBottom"
                      type="number"
                      value={formState.pdfMarginBottom}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pdfMarginLeft">Marge gauche (mm)</Label>
                    <Input
                      id="pdfMarginLeft"
                      name="pdfMarginLeft"
                      type="number"
                      value={formState.pdfMarginLeft}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les paramètres
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez les paramètres de notification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div className="space-

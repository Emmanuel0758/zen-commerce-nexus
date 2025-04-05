
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notificationSound"
                      checked={formState.notificationSound}
                      onCheckedChange={(checked) => handleSwitchChange("notificationSound", checked)}
                    />
                    <Label htmlFor="notificationSound">Sons de notification</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="desktopNotifications"
                      checked={formState.desktopNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("desktopNotifications", checked)}
                    />
                    <Label htmlFor="desktopNotifications">Notifications sur le bureau</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="emailNotifications"
                      checked={formState.emailNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                    />
                    <Label htmlFor="emailNotifications">Notifications par email</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Types de notifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-orders" defaultChecked />
                      <Label htmlFor="notification-orders">Nouvelles commandes</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-messages" defaultChecked />
                      <Label htmlFor="notification-messages">Nouveaux messages</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-products" defaultChecked />
                      <Label htmlFor="notification-products">Mise à jour des produits</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-delivery" defaultChecked />
                      <Label htmlFor="notification-delivery">Statut des livraisons</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-payment" defaultChecked />
                      <Label htmlFor="notification-payment">Paiements reçus</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notification-returns" defaultChecked />
                      <Label htmlFor="notification-returns">Demandes de retour</Label>
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
                      Enregistrer les paramètres
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Configurez les paramètres de sécurité de votre application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentification</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" defaultChecked />
                    <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="session-timeout" defaultChecked />
                    <Label htmlFor="session-timeout">Déconnexion automatique après inactivité</Label>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="timeout-duration">Durée d'inactivité avant déconnexion</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Sélectionnez une durée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Autorisations</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Rôle par défaut pour les nouveaux utilisateurs</Label>
                    <Select defaultValue="viewer">
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="manager">Gestionnaire</SelectItem>
                        <SelectItem value="editor">Éditeur</SelectItem>
                        <SelectItem value="viewer">Visiteur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="ip-restriction" />
                    <Label htmlFor="ip-restriction">Restriction par adresse IP</Label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" variant="default">
                    <Shield className="mr-2 h-4 w-4" />
                    Enregistrer les paramètres de sécurité
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Avancé */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>
                Configuration avancée de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cache et performances</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-cache" defaultChecked />
                  <Label htmlFor="enable-cache">Activer le cache</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-compression" defaultChecked />
                  <Label htmlFor="enable-compression">Activer la compression des données</Label>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="cache-duration">Durée du cache</Label>
                  <Select defaultValue="86400">
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3600">1 heure</SelectItem>
                      <SelectItem value="21600">6 heures</SelectItem>
                      <SelectItem value="43200">12 heures</SelectItem>
                      <SelectItem value="86400">24 heures</SelectItem>
                      <SelectItem value="604800">7 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Journalisation</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="log-level">Niveau de journalisation</Label>
                  <Select defaultValue="info">
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Erreur uniquement</SelectItem>
                      <SelectItem value="warn">Avertissements et erreurs</SelectItem>
                      <SelectItem value="info">Informations, avertissements et erreurs</SelectItem>
                      <SelectItem value="debug">Débogage (toutes les entrées)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="log-database" defaultChecked />
                  <Label htmlFor="log-database">Journaliser les requêtes de base de données</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="log-api" defaultChecked />
                  <Label htmlFor="log-api">Journaliser les appels API</Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maintenance</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Activer le mode maintenance</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Message de maintenance</Label>
                  <Textarea
                    id="maintenance-message"
                    placeholder="Site en maintenance. Veuillez revenir plus tard."
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6">
                <Button type="button" variant="destructive" onClick={() => setShowResetConfirm(true)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réinitialiser tous les paramètres
                </Button>
                
                <Button type="button">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Appliquer les paramètres avancés
                </Button>
              </div>
              
              {showResetConfirm && (
                <div className="bg-destructive/10 p-4 rounded border border-destructive mt-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-destructive">Confirmer la réinitialisation</h4>
                      <p className="text-sm mt-1">
                        Cette action réinitialisera tous les paramètres aux valeurs par défaut et ne peut pas être annulée.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          type="button"
                          variant="destructive"
                          disabled={isRestoring}
                          onClick={handleResetSettings}
                        >
                          {isRestoring ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Réinitialisation...
                            </>
                          ) : (
                            "Confirmer la réinitialisation"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowResetConfirm(false)}
                          disabled={isRestoring}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Export & Backup */}
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export & Sauvegarde</CardTitle>
              <CardDescription>
                Exportez vos données et configurez les sauvegardes automatiques.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Exporter les paramètres</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="export-format">Format d'exportation</Label>
                  <Select
                    value={exportFormat}
                    onValueChange={(value: "json" | "pdf" | "excel") => setExportFormat(value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez un format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel (CSV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  type="button"
                  onClick={handleExportSettings}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exportation...
                    </>
                  ) : (
                    <>
                      <FileDown className="mr-2 h-4 w-4" />
                      Exporter les paramètres
                    </>
                  )}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sauvegardes automatiques</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-backup" defaultChecked />
                  <Label htmlFor="auto-backup">Activer les sauvegardes automatiques</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Fréquence des sauvegardes</Label>
                  <Select
                    value={formState.backupFrequency}
                    onValueChange={(value) => handleSelectChange("backupFrequency", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Conservation des données</Label>
                  <Select
                    value={formState.dataRetentionPeriod}
                    onValueChange={(value) => handleSelectChange("dataRetentionPeriod", value)}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Sélectionnez une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1 mois</SelectItem>
                      <SelectItem value="3months">3 mois</SelectItem>
                      <SelectItem value="6months">6 mois</SelectItem>
                      <SelectItem value="1year">1 an</SelectItem>
                      <SelectItem value="forever">Indéfiniment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Importation</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="import-file">Importer depuis un fichier</Label>
                  <Input
                    id="import-file"
                    type="file"
                    accept=".json,.csv,.xlsx"
                  />
                </div>
                
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Importer les paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Intégrations */}
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>
                Configurez les intégrations avec d'autres services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Passerelles de paiement</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <div className="font-bold">PP</div>
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-gray-500">Intégration pour recevoir des paiements via PayPal</p>
                      </div>
                    </div>
                    <Switch id="paypal-integration" />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <div className="font-bold">S</div>
                      </div>
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-gray-500">Intégration pour traiter les paiements par carte</p>
                      </div>
                    </div>
                    <Switch id="stripe-integration" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <div className="font-bold">OM</div>
                      </div>
                      <div>
                        <h4 className="font-medium">Orange Money</h4>
                        <p className="text-sm text-gray-500">Intégration pour les paiements mobile en Afrique</p>
                      </div>
                    </div>
                    <Switch id="orange-money-integration" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Services de livraison</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <div className="font-bold">DHL</div>
                      </div>
                      <div>
                        <h4 className="font-medium">DHL Express</h4>
                        <p className="text-sm text-gray-500">Intégration de suivi et d'étiquettes d'expédition</p>
                      </div>
                    </div>
                    <Switch id="dhl-integration" />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <div className="font-bold">GL</div>
                      </div>
                      <div>
                        <h4 className="font-medium">GeoLocation</h4>
                        <p className="text-sm text-gray-500">Intégration pour suivre les livraisons en temps réel</p>
                      </div>
                    </div>
                    <Switch id="geolocation-integration" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Marketing et Analytics</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <div className="font-bold">GA</div>
                      </div>
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-gray-500">Intégration pour suivre les statistiques de visite</p>
                      </div>
                    </div>
                    <Switch
                      id="analytics-integration"
                      checked={formState.analyticsEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("analyticsEnabled", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <div className="font-bold">MS</div>
                      </div>
                      <div>
                        <h4 className="font-medium">MailService</h4>
                        <p className="text-sm text-gray-500">Intégration pour l'envoi d'emails marketing</p>
                      </div>
                    </div>
                    <Switch id="email-marketing-integration" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="button">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les intégrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet API */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Configuration de l'API</CardTitle>
              <CardDescription>
                Gérez l'accès à l'API et générez des clés d'API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Clés d'API</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-api" defaultChecked />
                  <Label htmlFor="enable-api">Activer l'accès à l'API</Label>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Clé d'API principale</h4>
                      <div className="flex items-center mt-1 space-x-2">
                        <Input
                          readOnly
                          value="api_12345678abcdefgh"
                          className="font-mono bg-background"
                        />
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Régénérer
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Autorisations d'API</h3>
                  <Button variant="outline" size="sm">
                    Ajouter une clé
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Clé de l'application mobile</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actif</span>
                        <Button variant="ghost" size="sm">
                          Révoquer
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Utilisée par l'application mobile pour se connecter</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Créée le:</span> 01/04/2025
                      </div>
                      <div>
                        <span className="text-gray-500">Dernière utilisation:</span> Aujourd'hui
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Intégration comptable</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actif</span>
                        <Button variant="ghost" size="sm">
                          Révoquer
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Utilisée pour la synchronisation avec le logiciel comptable</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Créée le:</span> 15/03/2025
                      </div>
                      <div>
                        <span className="text-gray-500">Dernière utilisation:</span> Hier
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documentation de l'API</h3>
                
                <p className="text-sm text-gray-500">
                  Consultez notre documentation complète pour apprendre comment intégrer notre API à vos applications.
                </p>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => downloadFile("api-documentation.pdf", "Documentation API")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Télécharger la documentation
                  </Button>
                  
                  <Button variant="secondary">
                    Explorer l'API
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet À propos */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>À propos de l'application</CardTitle>
              <CardDescription>
                Informations sur la version et les licences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-center mb-6">
                  {settings.logo ? (
                    <img
                      src={settings.logo}
                      alt={settings.appName}
                      className="h-20 object-contain"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                      {settings.appName.substring(0, 1)}
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-center">{settings.appName}</h2>
                <p className="text-center text-gray-500">Plateforme de commerce en ligne</p>
                
                <div className="grid gap-2 mt-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Version</span>
                    <span>1.5.0</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Date de sortie</span>
                    <span>5 avril 2025</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Licence</span>
                    <span>Commercial</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Support technique</span>
                    <span>support@zencommerce.com</span>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h3 className="font-medium mb-2">Journal des modifications récentes</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">v1.5.0:</span>
                      <span>Ajout des fonctionnalités d'exportation avancées et amélioration des performances.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">v1.4.2:</span>
                      <span>Correction de bugs et améliorations de sécurité.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">v1.4.0:</span>
                      <span>Intégration avec les services de paiement mobile et optimisation pour l'Afrique.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button variant="outline">
                  Vérifier les mises à jour
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;

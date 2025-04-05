import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { toast } from "@/hooks/use-toast";
import { useAppSettings } from "@/hooks/use-app-settings";

const SettingsPage = () => {
  const { settings, updateSettings } = useAppSettings();
  
  const [formState, setFormState] = useState({
    appName: settings.appName,
    logo: settings.logo,
    currency: settings.currency,
    theme: settings.theme,
    emailTemplates: settings.emailTemplates,
    analyticsEnabled: settings.analyticsEnabled,
    language: settings.language,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...formState,
      logo: logoPreview,
    });
    toast({
      title: "Paramètres mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
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
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto gap-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="currency">Devise & Paiement</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
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
                  <Label htmlFor="language">Langue</Label>
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

                <Button type="submit">Enregistrer les modifications</Button>
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
                  <Button type="submit">Enregistrer les modifications</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => downloadFile("email-templates.html", "<html><body><h1>Template d'email</h1><p>Contenu du template</p></body></html>")}
                  >
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
                  <Label htmlFor="currency">Devise</Label>
                  <Select
                    value={formState.currency}
                    onValueChange={(value) =>
                      handleSelectChange("currency", value)
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

                <Button type="submit">Enregistrer les modifications</Button>
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-orders">Nouvelles commandes</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevez des notifications pour les nouvelles commandes
                      </p>
                    </div>
                    <Switch id="notify-orders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-stock">Alerte de stock</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevez des notifications lorsque le stock est faible
                      </p>
                    </div>
                    <Switch id="notify-stock" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-deliveries">Livraisons</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevez des notifications pour les mises à jour de livraison
                      </p>
                    </div>
                    <Switch id="notify-deliveries" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-marketing">Marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevez des notifications pour les campagnes marketing
                      </p>
                    </div>
                    <Switch id="notify-marketing" defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                </div>

                <div className="pt-2">
                  <Button>Mettre à jour le mot de passe</Button>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="font-medium">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Activer l'authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Sécurisez davantage votre compte avec une couche supplémentaire de protection
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="font-medium">Permissions</h3>
                <div className="grid gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => downloadFile("permissions-report.csv", "Role,Module,Create,Read,Update,Delete\nAdmin,All,Yes,Yes,Yes,Yes\nManager,Products,Yes,Yes,Yes,No\nManager,Orders,Yes,Yes,Yes,No")}
                  >
                    Télécharger le rapport de permissions
                  </Button>
                </div>
              </div>

              <div className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Journal d'audit</h3>
                  <Button 
                    variant="outline"
                    onClick={() => downloadFile("audit-log.csv", "Timestamp,User,Action,IP\n2023-05-01 14:23:45,admin@example.com,Login,192.168.1.1\n2023-05-02 09:12:33,admin@example.com,Settings Update,192.168.1.1")}
                  >
                    Télécharger le journal d'audit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Avancé */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>
                Configurez les paramètres avancés de votre application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analyticsEnabled">Activer les analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Suivez les performances de votre application
                      </p>
                    </div>
                    <Switch
                      id="analyticsEnabled"
                      checked={formState.analyticsEnabled}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("analyticsEnabled", checked)
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Exportation des données</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => downloadFile("sales-report.csv", "Date,Product,Quantity,Revenue\n2023-05-01,Product A,10,5000\n2023-05-01,Product B,5,2500")}
                    >
                      Exporter les ventes (CSV)
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => downloadFile("customer-report.csv", "ID,Name,Email,Orders,Total Spend\n1,John Doe,john@example.com,5,2500\n2,Jane Smith,jane@example.com,3,1500")}
                    >
                      Exporter les clients (CSV)
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => downloadFile("analytics-report.json", JSON.stringify({visits: 1500, conversions: 120, revenue: 15000}, null, 2))}
                    >
                      Exporter les analytics (JSON)
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => downloadFile("inventory-report.csv", "Product,SKU,Stock,Value\nProduct A,SKU001,150,7500\nProduct B,SKU002,75,3750")}
                    >
                      Exporter l'inventaire (CSV)
                    </Button>
                  </div>
                </div>
                
                <Button type="submit">Enregistrer les modifications</Button>
              </form>

              <div className="pt-6 border-t">
                <div className="space-y-4">
                  <h3 className="font-medium text-destructive">Zone de danger</h3>
                  <div className="grid gap-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        toast({
                          title: "Attention",
                          description: "Cette action nécessite une confirmation supplémentaire.",
                          variant: "destructive"
                        });
                      }}
                    >
                      Réinitialiser tous les paramètres
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;

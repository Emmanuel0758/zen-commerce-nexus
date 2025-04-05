
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { 
  Bot, Send, Loader2, QrCode, Copy, Mail, Phone, Wifi, Text, FileText, 
  BarChart, ImageIcon, MessageSquareText, Palette, Code, Lightbulb, 
  CalendarIcon, Calculator, Braces, BookOpen, Search, Megaphone, 
  PenTool, ListChecks, Share2, Clock, MapPin, Globe, Headphones
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface SuggestionType {
  type: "url" | "text" | "email" | "phone" | "wifi";
  content: string;
  label: string;
}

interface ImageGenerationType {
  prompt: string;
  imageUrl: string;
}

interface TextSuggestionType {
  prompt: string;
  content: string;
  type: "marketing" | "description" | "social" | "email" | "custom";
}

interface CodeSnippetType {
  language: string;
  code: string;
  description: string;
}

interface TranslationType {
  original: string;
  translated: string;
  language: string;
}

interface ScheduleSuggestionType {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
}

export const AIAssistant = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("qrcode");
  const [isLoading, setIsLoading] = useState(false);
  const [qrSuggestions, setQrSuggestions] = useState<SuggestionType[]>([]);
  const [textSuggestions, setTextSuggestions] = useState<TextSuggestionType[]>([]);
  const [colorPalettes, setColorPalettes] = useState<{name: string, colors: string[]}[]>([]);
  const [generatedImages, setGeneratedImages] = useState<ImageGenerationType[]>([]);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippetType[]>([]);
  const [translations, setTranslations] = useState<TranslationType[]>([]);
  const [calculationResults, setCalculationResults] = useState<string>("");
  const [schedules, setSchedules] = useState<ScheduleSuggestionType[]>([]);
  
  const [textType, setTextType] = useState<string>("marketing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("french");
  const [codeLanguage, setCodeLanguage] = useState<string>("javascript");
  const [imageStyle, setImageStyle] = useState<string>("photorealistic");
  const [imageSize, setImageSize] = useState<string>("square");
  const [creativityLevel, setCreativityLevel] = useState<number>(50);
  const [includeExamples, setIncludeExamples] = useState<boolean>(true);
  const [scheduleType, setScheduleType] = useState<string>("work");
  const [mapLocation, setMapLocation] = useState<string>("");
  const [mapResults, setMapResults] = useState<{name: string, address: string, imageUrl: string}[]>([]);

  // Fonction simulant une réponse d'IA pour QR Codes
  const generateQRSuggestions = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour obtenir des suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQrSuggestions([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Logique de génération de suggestions basée sur des mots clés simples
    // Dans une implémentation réelle, cela serait remplacé par un appel à une API d'IA
    const lowercasePrompt = prompt.toLowerCase();
    const newSuggestions: SuggestionType[] = [];

    if (lowercasePrompt.includes("site") || lowercasePrompt.includes("web") || lowercasePrompt.includes("lien")) {
      newSuggestions.push({
        type: "url",
        content: "https://example.com/promo",
        label: "Site web promotionnel"
      });
      newSuggestions.push({
        type: "url",
        content: "https://example.com/portfolio",
        label: "Portfolio professionnel"
      });
    }

    if (lowercasePrompt.includes("contact") || lowercasePrompt.includes("email") || lowercasePrompt.includes("courriel")) {
      newSuggestions.push({
        type: "email",
        content: "contact@example.com",
        label: "Email de contact"
      });
      newSuggestions.push({
        type: "email",
        content: "support@example.com",
        label: "Email du support"
      });
    }

    if (lowercasePrompt.includes("appel") || lowercasePrompt.includes("téléphone") || lowercasePrompt.includes("numéro")) {
      newSuggestions.push({
        type: "phone",
        content: "+33612345678",
        label: "Numéro de téléphone"
      });
      newSuggestions.push({
        type: "phone",
        content: "+33987654321",
        label: "Numéro du service client"
      });
    }

    if (lowercasePrompt.includes("wifi") || lowercasePrompt.includes("réseau") || lowercasePrompt.includes("internet")) {
      newSuggestions.push({
        type: "wifi",
        content: JSON.stringify({
          ssid: "MonReseauWiFi",
          password: "MotDePasse123",
          security: "WPA"
        }),
        label: "Configuration WiFi"
      });
      newSuggestions.push({
        type: "wifi",
        content: JSON.stringify({
          ssid: "WiFi-Invités",
          password: "Bienvenue2023",
          security: "WPA2"
        }),
        label: "WiFi pour invités"
      });
    }

    // Si aucune suggestion spécifique n'a été générée, fournir une suggestion de texte générique
    if (newSuggestions.length === 0) {
      newSuggestions.push({
        type: "text",
        content: `Information: ${prompt}`,
        label: "Texte informatif"
      });
      newSuggestions.push({
        type: "text",
        content: `Note: ${prompt}`,
        label: "Note personnelle"
      });
    }

    setQrSuggestions(newSuggestions);
    setIsLoading(false);
    
    toast({
      title: "Suggestions générées",
      description: `${newSuggestions.length} suggestions disponibles`,
    });
  };

  // Fonction pour générer du texte
  const generateTextContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer du texte",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTextSuggestions([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockTexts: Record<string, string[]> = {
      marketing: [
        "Découvrez notre gamme exclusive de produits. Profitez de 20% de réduction pour votre première commande.",
        "Ne manquez pas notre offre exceptionnelle! Des remises incroyables vous attendent sur notre site.",
        "🌟 Offre limitée dans le temps! Nos meilleurs produits à prix réduits pour célébrer l'arrivée de la nouvelle saison."
      ],
      description: [
        "Ce produit de haute qualité est fabriqué avec des matériaux durables et respectueux de l'environnement. Sa conception élégante s'adapte parfaitement à tous les styles.",
        "Conçu pour répondre aux besoins des professionnels exigeants, notre solution innovante combine performance et facilité d'utilisation.",
        "Un design minimaliste associé à des fonctionnalités avancées. Notre produit se distingue par sa polyvalence et sa durabilité exceptionnelle."
      ],
      social: [
        "🚀 Nous sommes ravis de vous présenter notre nouvelle collection! #innovation #qualité #design",
        "✨ Nouveauté en magasin! Venez découvrir nos créations uniques et faites-nous part de vos impressions. 📱",
        "🎉 Grande nouvelle! Notre marque a été récompensée pour son engagement écologique. Merci à tous nos clients fidèles! #développementdurable"
      ],
      email: [
        "Cher client,\n\nNous sommes heureux de vous informer de nos dernières nouveautés. Visitez notre site pour découvrir toutes nos offres.\n\nCordialement,\nL'équipe commerciale",
        "Bonjour,\n\nMerci pour votre fidélité! Nous avons le plaisir de vous offrir un code promo exclusif: MERCI10.\n\nÀ bientôt,\nLe service client",
        "Madame, Monsieur,\n\nNous vous invitons à participer à notre événement annuel qui se tiendra le 15 juin. De nombreuses surprises vous attendent!\n\nAvec nos meilleures salutations,\nL'équipe événementielle"
      ],
      custom: [
        `En réponse à "${prompt}", voici une suggestion personnalisée: Explorez nos solutions adaptées spécifiquement à vos besoins.`,
        `Basé sur votre requête "${prompt}", nous proposons: Une approche innovante qui répond exactement à vos attentes.`,
        `Pour satisfaire votre demande concernant "${prompt}", notre équipe a développé un concept sur mesure qui saura vous séduire.`
      ]
    };

    // Générer quelques textes basés sur le type sélectionné
    const texts = mockTexts[textType as keyof typeof mockTexts] || mockTexts.custom;
    const generatedTexts = texts.map(content => ({
      prompt,
      content,
      type: textType as any
    }));

    setTextSuggestions(generatedTexts);
    setIsLoading(false);
    
    toast({
      title: "Textes générés",
      description: `${generatedTexts.length} suggestions de texte disponibles`,
    });
  };

  // Fonction pour générer des palettes de couleurs
  const generateColorPalettes = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer des palettes",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setColorPalettes([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Palettes prédéfinies selon des thèmes communs
    const mockPalettes = [
      {
        name: "Moderne & Minimaliste",
        colors: ["#2D3047", "#419D78", "#E0A458", "#F4E9CD", "#FFFFFF"]
      },
      {
        name: "Vibrant & Dynamique",
        colors: ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"]
      },
      {
        name: "Élégant & Professionnel",
        colors: ["#1B1B25", "#565676", "#A9A9CA", "#D5D5E8", "#FFFFFF"]
      },
      {
        name: "Naturel & Apaisant",
        colors: ["#7D8C7C", "#A5B5A3", "#DBEBC0", "#F7F8F3", "#C3D197"]
      },
      {
        name: "Chaleureux & Accueillant",
        colors: ["#5E4C3D", "#9A765A", "#E2C07F", "#F1E4D2", "#FBEEEC"]
      }
    ];

    setColorPalettes(mockPalettes);
    setIsLoading(false);
    
    toast({
      title: "Palettes générées",
      description: `${mockPalettes.length} palettes de couleurs disponibles`,
    });
  };

  // Fonction pour générer des images
  const generateImages = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer des images",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImages([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Images fictives (dans une vraie implémentation, on appellerait une API comme DALL-E ou Midjourney)
    const styleText = imageStyle === "photorealistic" ? "Photorealistic" : 
                      imageStyle === "cartoon" ? "Cartoon Style" : 
                      imageStyle === "abstract" ? "Abstract Art" : "3D Rendered";
                      
    const sizeParam = imageSize === "square" ? "600x600" : 
                      imageSize === "portrait" ? "600x800" : "800x600";
                      
    const mockImages = [
      {
        prompt: `${prompt} (${styleText}, Style quality: ${creativityLevel}%)`,
        imageUrl: `https://placehold.co/${sizeParam}/eee/31343C?text=${encodeURIComponent(styleText + " 1")}`
      },
      {
        prompt: `${prompt} (${styleText}, Style quality: ${creativityLevel}%)`,
        imageUrl: `https://placehold.co/${sizeParam}/eee/31343C?text=${encodeURIComponent(styleText + " 2")}`
      },
      {
        prompt: `${prompt} (${styleText}, Style quality: ${creativityLevel}%)`,
        imageUrl: `https://placehold.co/${sizeParam}/eee/31343C?text=${encodeURIComponent(styleText + " 3")}`
      }
    ];

    setGeneratedImages(mockImages);
    setIsLoading(false);
    
    toast({
      title: "Images générées",
      description: `${mockImages.length} images disponibles`,
    });
  };

  // Fonction pour générer du code
  const generateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez décrire le code que vous souhaitez générer",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCodeSnippets([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Exemples de code en fonction du langage sélectionné
    let generatedSnippets: CodeSnippetType[] = [];

    if (codeLanguage === "javascript") {
      generatedSnippets = [
        {
          language: "javascript",
          description: "Fonction pour filtrer un tableau d'objets",
          code: `function filterItems(items, filterCriteria) {
  return items.filter(item => {
    return Object.entries(filterCriteria).every(([key, value]) => {
      return item[key] === value;
    });
  });
}`
        },
        {
          language: "javascript",
          description: "Classe pour gérer des données avec localStorage",
          code: `class StorageManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
  }
}`
        }
      ];
    } else if (codeLanguage === "python") {
      generatedSnippets = [
        {
          language: "python",
          description: "Fonction pour charger et traiter des données CSV",
          code: `import pandas as pd

def process_csv_data(file_path, columns_to_use=None):
    # Charger les données
    df = pd.read_csv(file_path)
    
    # Filtrer les colonnes si spécifié
    if columns_to_use:
        df = df[columns_to_use]
    
    # Supprimer les lignes avec des valeurs manquantes
    df = df.dropna()
    
    # Effectuer quelques transformations de base
    # (à adapter selon vos besoins)
    for col in df.select_dtypes(include=['number']).columns:
        df[f'{col}_normalized'] = (df[col] - df[col].mean()) / df[col].std()
    
    return df`
        },
        {
          language: "python",
          description: "Classe pour une API REST simple avec Flask",
          code: `from flask import Flask, request, jsonify

app = Flask(__name__)

# Base de données simulée
todos = [
    {"id": 1, "task": "Apprendre Flask", "completed": False},
    {"id": 2, "task": "Créer une API REST", "completed": False}
]

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    if not request.json or 'task' not in request.json:
        return jsonify({"error": "La tâche est requise"}), 400
    
    todo = {
        'id': todos[-1]['id'] + 1 if todos else 1,
        'task': request.json['task'],
        'completed': False
    }
    todos.append(todo)
    return jsonify(todo), 201

if __name__ == '__main__':
    app.run(debug=True)`
        }
      ];
    } else if (codeLanguage === "html") {
      generatedSnippets = [
        {
          language: "html",
          description: "Formulaire de contact avec validation",
          code: `<form id="contactForm" class="contact-form">
  <div class="form-group">
    <label for="name">Nom</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit" class="submit-btn">Envoyer</button>
</form>

<script>
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validation basic
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    // Envoyer le formulaire (à implémenter)
    console.log('Formulaire envoyé:', { name, email, message });
    alert('Votre message a été envoyé!');
    this.reset();
  });
</script>`
        },
        {
          language: "html",
          description: "Page d'accueil responsive",
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Responsive</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    
    header {
      background-color: #333;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    nav {
      display: flex;
      justify-content: center;
      background-color: #444;
      padding: 0.5rem;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
    }
    
    .hero {
      height: 50vh;
      background-color: #f4f4f4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1rem;
    }
    
    .content {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
      }
      
      nav a {
        margin: 0.2rem 0;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Mon Site Web</h1>
  </header>
  
  <nav>
    <a href="#">Accueil</a>
    <a href="#">À propos</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>
  
  <section class="hero">
    <h2>Bienvenue sur notre site</h2>
    <p>Découvrez nos services et produits exceptionnels</p>
    <button style="margin-top: 1rem; padding: 0.5rem 1rem; background-color: #333; color: white; border: none; cursor: pointer;">En savoir plus</button>
  </section>
  
  <div class="content">
    <h2>Nos Services</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in.</p>
  </div>
  
  <footer>
    <p>&copy; 2023 Mon Site Web. Tous droits réservés.</p>
  </footer>
</body>
</html>`
        }
      ];
    } else if (codeLanguage === "css") {
      generatedSnippets = [
        {
          language: "css",
          description: "Style pour cards modernes avec animations",
          code: `.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 16px rgba(0,0,0,0.1);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.card-text {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.card-btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.card-btn:hover {
  background-color: #2980b9;
}`
        }
      ];
    } else {
      generatedSnippets = [
        {
          language: "sql",
          description: "Requêtes SQL pour une base de données d'e-commerce",
          code: `-- Création d'une table clients
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_inscription DATE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT
);

-- Création d'une table produits
CREATE TABLE produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categorie VARCHAR(100) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création d'une table commandes
CREATE TABLE commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'validee', 'expediee', 'livree', 'annulee') DEFAULT 'en_attente',
    montant_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Requête pour obtenir les commandes récentes avec les informations clients
SELECT c.id AS commande_id, 
       c.date_commande, 
       c.statut, 
       c.montant_total,
       cl.nom, 
       cl.prenom, 
       cl.email
FROM commandes c
JOIN clients cl ON c.client_id = cl.id
WHERE c.date_commande > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY c.date_commande DESC;`
        }
      ];
    }

    setCodeSnippets(generatedSnippets);
    setIsLoading(false);
    
    toast({
      title: "Code généré",
      description: `${generatedSnippets.length} snippets de code disponibles`,
    });
  };

  // Fonction pour traduire du texte
  const translateText = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Texte manquant",
        description: "Veuillez entrer un texte à traduire",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTranslations([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Traductions simulées
    const languages: Record<string, string> = {
      english: "Hello, this is a translation of your text. Thank you for using our translation service.",
      french: "Bonjour, ceci est une traduction de votre texte. Merci d'utiliser notre service de traduction.",
      spanish: "Hola, esta es una traducción de su texto. Gracias por utilizar nuestro servicio de traducción.",
      german: "Hallo, dies ist eine Übersetzung Ihres Textes. Vielen Dank, dass Sie unseren Übersetzungsdienst nutzen.",
      italian: "Ciao, questa è una traduzione del tuo testo. Grazie per aver utilizzato il nostro servizio di traduzione."
    };

    const translationResult: TranslationType = {
      original: prompt,
      translated: languages[selectedLanguage] || languages.french,
      language: selectedLanguage
    };

    setTranslations([translationResult]);
    setIsLoading(false);
    
    toast({
      title: "Traduction effectuée",
      description: `Texte traduit en ${selectedLanguage === "english" ? "anglais" : 
                    selectedLanguage === "french" ? "français" : 
                    selectedLanguage === "spanish" ? "espagnol" : 
                    selectedLanguage === "german" ? "allemand" : "italien"}`,
    });
  };

  // Fonction pour effectuer des calculs
  const performCalculation = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Expression manquante",
        description: "Veuillez entrer une expression mathématique ou un problème à résoudre",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCalculationResults("");

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulation de résolution de problèmes mathématiques
    let result = "";
    
    if (prompt.includes("+") || prompt.includes("-") || prompt.includes("*") || prompt.includes("/")) {
      result = `
Résultat: 42

Étapes de calcul:
1. Analyse de l'expression: "${prompt}"
2. Application des règles de priorité des opérations
3. Résolution séquentielle
4. Résultat final: 42
      `;
    } else if (prompt.toLowerCase().includes("équation") || prompt.includes("=")) {
      result = `
Solution: x = 7

Démarche:
1. Expression initiale: "${prompt}"
2. Isolation des variables
3. Résolution de l'équation
4. Vérification de la solution
5. x = 7 est la solution unique
      `;
    } else if (prompt.toLowerCase().includes("pourcentage") || prompt.includes("%")) {
      result = `
Calcul de pourcentage: 25%

Analyse:
1. Problème identifié: "${prompt}"
2. Conversion en expression mathématique
3. Calcul de la proportion
4. Résultat: 25%
      `;
    } else {
      result = `
Analyse de la demande: "${prompt}"

Interprétation:
Il s'agit d'un problème complexe nécessitant plusieurs étapes de résolution.

Solution proposée:
La réponse est 42, obtenue après analyse des contraintes du problème.

Vérification:
La solution est cohérente avec les données fournies.
      `;
    }

    setCalculationResults(result);
    setIsLoading(false);
    
    toast({
      title: "Calcul effectué",
      description: "La résolution mathématique est disponible",
    });
  };

  // Fonction pour générer des suggestions de planning
  const generateScheduleSuggestions = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Description manquante",
        description: "Veuillez décrire les activités à planifier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSchedules([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Date actuelle pour les exemples
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    // Suggestions de planning basées sur le type sélectionné
    let scheduleSuggestions: ScheduleSuggestionType[] = [];
    
    if (scheduleType === "work") {
      scheduleSuggestions = [
        {
          title: "Réunion d'équipe",
          description: "Présentation des objectifs hebdomadaires et suivi des projets en cours",
          startTime: "09:00",
          endTime: "10:30",
          date: formatDate(today)
        },
        {
          title: "Session de travail",
          description: "Développement des nouvelles fonctionnalités",
          startTime: "11:00",
          endTime: "12:30",
          date: formatDate(today)
        },
        {
          title: "Point client",
          description: "Présentation de l'avancement du projet au client",
          startTime: "14:00",
          endTime: "15:00",
          date: formatDate(tomorrow)
        }
      ];
    } else if (scheduleType === "personal") {
      scheduleSuggestions = [
        {
          title: "Séance de sport",
          description: "Entraînement cardio et musculation",
          startTime: "18:00",
          endTime: "19:30",
          date: formatDate(today)
        },
        {
          title: "Cours de cuisine",
          description: "Apprendre à préparer des plats méditerranéens",
          startTime: "11:00",
          endTime: "13:00",
          date: formatDate(tomorrow)
        },
        {
          title: "Sortie culturelle",
          description: "Visite du musée d'art moderne",
          startTime: "15:00",
          endTime: "17:30",
          date: formatDate(tomorrow)
        }
      ];
    } else {
      scheduleSuggestions = [
        {
          title: "Tournoi sportif",
          description: "Compétition amicale entre équipes",
          startTime: "10:00",
          endTime: "16:00",
          date: formatDate(today)
        },
        {
          title: "Réunion de préparation",
          description: "Organisation logistique de l'événement",
          startTime: "14:00",
          endTime: "15:30",
          date: formatDate(today)
        },
        {
          title: "Soirée de gala",
          description: "Célébration annuelle avec remise de prix",
          startTime: "19:00",
          endTime: "23:00",
          date: formatDate(tomorrow)
        }
      ];
    }

    setSchedules(scheduleSuggestions);
    setIsLoading(false);
    
    toast({
      title: "Planning généré",
      description: `${scheduleSuggestions.length} suggestions d'activités disponibles`,
    });
  };

  // Fonction pour rechercher des lieux
  const searchLocations = async () => {
    if (!mapLocation.trim()) {
      toast({
        title: "Lieu manquant",
        description: "Veuillez entrer un lieu à rechercher",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMapResults([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Résultats simulés de recherche
    const mockResults = [
      {
        name: "Restaurant Le Gourmet",
        address: "15 Rue de la Gastronomie, 75001 Paris",
        imageUrl: "https://placehold.co/400x200/eee/31343C?text=Restaurant"
      },
      {
        name: "Café des Artistes",
        address: "27 Avenue des Arts, 75002 Paris",
        imageUrl: "https://placehold.co/400x200/eee/31343C?text=Café"
      },
      {
        name: "Musée de l'Histoire",
        address: "5 Place de la Culture, 75004 Paris",
        imageUrl: "https://placehold.co/400x200/eee/31343C?text=Musée"
      }
    ];

    setMapResults(mockResults);
    setIsLoading(false);
    
    toast({
      title: "Recherche terminée",
      description: `${mockResults.length} résultats trouvés pour "${mapLocation}"`,
    });
  };

  const handleGenerate = () => {
    switch(activeTab) {
      case "qrcode":
        generateQRSuggestions();
        break;
      case "text":
        generateTextContent();
        break;
      case "color":
        generateColorPalettes();
        break;
      case "image":
        generateImages();
        break;
      case "code":
        generateCode();
        break;
      case "translate":
        translateText();
        break;
      case "calculate":
        performCalculation();
        break;
      case "schedule":
        generateScheduleSuggestions();
        break;
      case "map":
        searchLocations();
        break;
      default:
        generateQRSuggestions();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    localStorage.setItem("qrSuggestion", JSON.stringify(suggestion));
    toast({
      title: "Suggestion copiée",
      description: "Accédez à l'onglet \"Générer QR Code\" pour l'utiliser",
    });
  };

  const handleTextCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Texte copié",
      description: "Le texte a été copié dans le presse-papiers",
    });
  };

  const handleColorCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Couleur copiée",
      description: `La couleur ${color} a été copiée dans le presse-papiers`,
    });
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "url": return <QrCode className="h-5 w-5" />;
      case "email": return <Mail className="h-5 w-5" />;
      case "phone": return <Phone className="h-5 w-5" />;
      case "wifi": return <Wifi className="h-5 w-5" />;
      default: return <Text className="h-5 w-5" />;
    }
  };

  const getIconForTextType = (type: string) => {
    switch (type) {
      case "marketing": return <BarChart className="h-5 w-5" />;
      case "description": return <FileText className="h-5 w-5" />;
      case "social": return <MessageSquareText className="h-5 w-5" />;
      case "email": return <Mail className="h-5 w-5" />;
      default: return <Text className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant IA Multifonction
          </CardTitle>
          <CardDescription>
            Un assistant intelligent pour générer QR codes, textes, palettes de couleurs, images, code, traductions et plus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full flex-wrap h-auto">
              <TabsTrigger value="qrcode" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Textes
              </TabsTrigger>
              <TabsTrigger value="color" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Couleurs
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="translate" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Traduction
              </TabsTrigger>
              <TabsTrigger value="calculate" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculs
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lieux
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qrcode" className="space-y-4">
              <Textarea
                placeholder="Exemple: Je veux créer un QR code pour le site web de mon restaurant"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-type" className="text-sm font-medium">Type de texte</label>
                  <Select value={textType} onValueChange={setTextType}>
                    <SelectTrigger id="text-type">
                      <SelectValue placeholder="Sélectionnez un type de texte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing & Promotions</SelectItem>
                      <SelectItem value="description">Description de produit</SelectItem>
                      <SelectItem value="social">Réseaux sociaux</SelectItem>
                      <SelectItem value="email">Emails</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Décrivez ce que vous souhaitez générer comme texte..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
                <div className="flex items-center space-x-2">
                  <Switch id="examples" checked={includeExamples} onCheckedChange={setIncludeExamples} />
                  <Label htmlFor="examples">Inclure des exemples</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="color" className="space-y-4">
              <Textarea
                placeholder="Décrivez l'ambiance ou le style de palette que vous souhaitez générer..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <Textarea
                  placeholder="Décrivez l'image que vous souhaitez générer..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="image-style" className="text-sm font-medium">Style d'image</label>
                    <Select value={imageStyle} onValueChange={setImageStyle}>
                      <SelectTrigger id="image-style">
                        <SelectValue placeholder="Sélectionnez un style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photorealistic">Photoréaliste</SelectItem>
                        <SelectItem value="cartoon">Dessin animé</SelectItem>
                        <SelectItem value="abstract">Art abstrait</SelectItem>
                        <SelectItem value="3d">Rendu 3D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="image-size" className="text-sm font-medium">Format d'image</label>
                    <Select value={imageSize} onValueChange={setImageSize}>
                      <SelectTrigger id="image-size">
                        <SelectValue placeholder="Sélectionnez un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Carré</SelectItem>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Paysage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="creativity" className="text-sm font-medium">Niveau de créativité</label>
                  <Slider
                    id="creativity"
                    min={0}
                    max={100}
                    step={1}
                    value={[creativityLevel]}
                    onValueChange={(values) => setCreativityLevel(values[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Précis</span>
                    <span>Équilibré</span>
                    <span>Créatif</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="code-language" className="text-sm font-medium">Langage de programmation</label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger id="code-language">
                      <SelectValue placeholder="Sélectionnez un langage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="html">HTML/CSS</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Décrivez le code que vous souhaitez générer..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
              </div>
            </TabsContent>

            <TabsContent value="translate" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="translate-language" className="text-sm font-medium">Langue cible</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="translate-language">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">Anglais</SelectItem>
                      <SelectItem value="french">Français</SelectItem>
                      <SelectItem value="spanish">Espagnol</SelectItem>
                      <SelectItem value="german">Allemand</SelectItem>
                      <SelectItem value="italian">Italien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Entrez le texte à traduire..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
              </div>
            </TabsContent>

            <TabsContent value="calculate" className="space-y-4">
              <Textarea
                placeholder="Entrez une expression mathématique ou décrivez un problème à résoudre..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Type de planning</label>
                  <RadioGroup value={scheduleType} onValueChange={setScheduleType} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work">Professionnel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id="personal" />
                      <Label htmlFor="personal">Personnel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="event" id="event" />
                      <Label htmlFor="event">Événement</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Textarea
                  placeholder="Décrivez les activités à planifier..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
              </div>
            </TabsContent>

            <TabsContent value="map" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Rechercher un lieu, une adresse, un restaurant..."
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    className="bg-background/50"
                  />
                  <Button 
                    onClick={searchLocations} 
                    disabled={isLoading || !mapLocation.trim()}
                    className="shrink-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            {activeTab !== "map" && (
              <Badge variant="outline" className="text-xs font-normal">
                AI Powered
              </Badge>
            )}
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || (activeTab !== "map" && !prompt.trim()) || (activeTab === "map" && !mapLocation.trim())}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                Générer
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* QR Code Suggestions */}
      {activeTab === "qrcode" && qrSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestions de QR Code</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {qrSuggestions.map((suggestion, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getIconForType(suggestion.type)}
                    {suggestion.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {suggestion.type === 'wifi' 
                      ? 'Configuration WiFi (SSID, mot de passe)'
                      : suggestion.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Utiliser cette suggestion
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Text Suggestions */}
      {activeTab === "text" && textSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestions de texte</h3>
          <div className="grid gap-4">
            {textSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getIconForTextType(suggestion.type)}
                    {suggestion.type === "marketing" ? "Texte marketing" : 
                     suggestion.type === "description" ? "Description de produit" :
                     suggestion.type === "social" ? "Post pour réseaux sociaux" :
                     suggestion.type === "email" ? "Email" : "Texte personnalisé"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line">
                    {suggestion.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleTextCopy(suggestion.content)}
                  >
                    <Copy className="h-4 w-4" />
                    Copier le texte
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Color Palettes */}
      {activeTab === "color" && colorPalettes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Palettes de couleurs</h3>
          <div className="grid gap-6">
            {colorPalettes.map((palette, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{palette.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex flex-col items-center"
                        onClick={() => handleColorCopy(color)}
                      >
                        <div 
                          className="w-12 h-12 rounded-md cursor-pointer hover:ring-2 ring-offset-2 ring-offset-background transition-all" 
                          style={{ backgroundColor: color }}
                          title={`Cliquez pour copier: ${color}`}
                        />
                        <span className="text-xs mt-1">{color}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Generated Images */}
      {activeTab === "image" && generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Images générées</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {generatedImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={image.imageUrl} 
                  alt={`Image générée basée sur: ${image.prompt}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleImageClick(image.imageUrl)}
                />
                <CardFooter className="p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => handleImageClick(image.imageUrl)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Voir en taille réelle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippets */}
      {activeTab === "code" && codeSnippets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Snippets de code</h3>
          <div className="grid gap-6">
            {codeSnippets.map((snippet, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{snippet.description}</CardTitle>
                  <Badge variant="outline">{snippet.language}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleTextCopy(snippet.code)}
                  >
                    <Copy className="h-4 w-4" />
                    Copier le code
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Translations */}
      {activeTab === "translate" && translations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Traduction</h3>
          <div className="grid gap-4">
            {translations.map((translation, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Traduction en {
                      translation.language === "english" ? "anglais" : 
                      translation.language === "french" ? "français" : 
                      translation.language === "spanish" ? "espagnol" : 
                      translation.language === "german" ? "allemand" : "italien"
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Texte original:</p>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                        {translation.original}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Traduction:</p>
                      <p className="text-sm bg-primary/10 p-3 rounded-md">
                        {translation.translated}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleTextCopy(translation.translated)}
                  >
                    <Copy className="h-4 w-4" />
                    Copier la traduction
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Calculation Results */}
      {activeTab === "calculate" && calculationResults && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Résultat du calcul</h3>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Résolution mathématique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {calculationResults}
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                onClick={() => handleTextCopy(calculationResults)}
              >
                <Copy className="h-4 w-4" />
                Copier le résultat
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Schedule Suggestions */}
      {activeTab === "schedule" && schedules.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Planning proposé</h3>
          <div className="grid gap-4">
            {schedules.map((schedule, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    {schedule.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {schedule.date}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {schedule.startTime} - {schedule.endTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {schedule.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleTextCopy(`${schedule.title} (${schedule.date}, ${schedule.startTime} - ${schedule.endTime}): ${schedule.description}`)}
                  >
                    <Copy className="h-4 w-4" />
                    Copier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Ajouter au calendrier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Map Results */}
      {activeTab === "map" && mapResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Résultats pour "{mapLocation}"</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {mapResults.map((result, index) => (
              <Card key={index}>
                <img 
                  src={result.imageUrl} 
                  alt={result.name}
                  className="w-full h-36 object-cover"
                />
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-base">{result.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    {result.address}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Partager
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Voir sur la carte
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Image modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image générée</DialogTitle>
            <DialogDescription>
              Basée sur votre demande: {prompt}
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center my-4">
              <img 
                src={selectedImage} 
                alt="Image générée en taille réelle" 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setSelectedImage(null)}>Fermer</Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


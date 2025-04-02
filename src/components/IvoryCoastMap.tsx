
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Points de livraison exemple en Côte d'Ivoire
const deliveryPoints = [
  { id: 'DEL-1055', name: 'Livraison Abidjan Centre', coordinates: [-4.0305, 5.3364] as [number, number], status: 'en_cours' },
  { id: 'DEL-1052', name: 'Livraison Bouaké', coordinates: [-5.0338, 7.6881] as [number, number], status: 'retard' },
  { id: 'DEL-1050', name: 'Livraison Yamoussoukro', coordinates: [-5.2767, 6.8275] as [number, number], status: 'prêt' },
  { id: 'DEL-1048', name: 'Livraison San-Pédro', coordinates: [-6.6363, 4.7411] as [number, number], status: 'en_cours' },
  { id: 'DEL-1045', name: 'Livraison Korhogo', coordinates: [-5.6279, 9.4580] as [number, number], status: 'en_cours' }
];

// Couleurs pour les différents statuts
const statusColors = {
  en_cours: '#10b981', // vert
  retard: '#f59e0b', // orange
  prêt: '#3b82f6' // bleu
};

type IvoryCoastMapProps = {
  height?: string;
  className?: string;
};

// Clé par défaut (cette clé devrait être remplacée par une clé valide)
const DEFAULT_TOKEN = 'pk.eyJ1IjoiY2xldmVyYWZyaWNhZGV2IiwiYSI6ImNrZzcyMGRvcjA5ZTMydG16dHl3aGwxN2kifQ.R_tJ5SDg_-uOA8B48KA7Kg';

const IvoryCoastMap = ({ height = '400px', className = '' }: IvoryCoastMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mapboxToken, setMapboxToken] = useState(() => {
    return localStorage.getItem('mapbox-token') || DEFAULT_TOKEN;
  });
  const [tokenInput, setTokenInput] = useState(mapboxToken);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    // Nettoyer la carte existante si elle existe
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    setMapError(null);

    try {
      // Initialiser la carte avec le token
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-5.5471, 7.5400], // Centre de la Côte d'Ivoire
        zoom: 5.5,
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );

      // Gérer les erreurs de chargement de la carte
      map.current.on('error', (e: any) => {
        console.error('Mapbox error:', e);
        setMapError('Erreur de chargement de la carte. Veuillez vérifier votre clé API Mapbox.');
      });

      // Ajouter les points de livraison une fois la carte chargée
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Création du popup pour afficher les infos
        popupRef.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: true,
          offset: 25
        });

        // Ajouter chaque point de livraison
        deliveryPoints.forEach(point => {
          const marker = document.createElement('div');
          marker.className = 'delivery-marker';
          marker.style.width = '20px';
          marker.style.height = '20px';
          marker.style.borderRadius = '50%';
          marker.style.backgroundColor = statusColors[point.status as keyof typeof statusColors];
          marker.style.border = '2px solid white';
          marker.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)';
          marker.style.cursor = 'pointer';

          // Créer un marqueur Mapbox
          const newMarker = new mapboxgl.Marker(marker)
            .setLngLat(point.coordinates)
            .addTo(map.current!);

          // Ajouter interaction au survol
          marker.addEventListener('mouseenter', () => {
            if (popupRef.current && map.current) {
              popupRef.current
                .setLngLat(point.coordinates)
                .setHTML(`
                  <div style="padding: 8px;">
                    <p style="margin: 0; font-weight: 600;">${point.name}</p>
                    <p style="margin: 0; font-size: 0.9em; color: #666;">ID: ${point.id}</p>
                    <p style="margin: 0; font-size: 0.9em; color: #666;">
                      Status: ${point.status === 'en_cours' ? 'En cours' : 
                               point.status === 'retard' ? 'Retardé' : 'Prêt'}
                    </p>
                  </div>
                `)
                .addTo(map.current);
            }
          });

          marker.addEventListener('mouseleave', () => {
            setTimeout(() => {
              if (popupRef.current) {
                popupRef.current.remove();
              }
            }, 300);
          });
        });

        toast({
          title: "Carte chargée",
          description: "La carte interactive de la Côte d'Ivoire est maintenant disponible",
        });
      });

    } catch (error) {
      console.error("Erreur d'initialisation de la carte:", error);
      setMapError("Impossible d'initialiser la carte. Veuillez vérifier votre clé API Mapbox.");
    }
  };

  const saveToken = () => {
    localStorage.setItem('mapbox-token', tokenInput);
    setMapboxToken(tokenInput);
    setShowTokenInput(false);
    toast({
      title: "Clé API sauvegardée",
      description: "Votre clé API Mapbox a été enregistrée"
    });
  };

  // Initialiser la carte au chargement du composant
  useEffect(() => {
    initializeMap();
    
    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {showTokenInput ? (
        <div className="absolute inset-0 z-10 bg-background/90 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-4">
            <h3 className="text-lg font-medium">Configurer votre clé API Mapbox</h3>
            <p className="text-sm text-muted-foreground">
              Pour utiliser la carte interactive, vous avez besoin d'une clé API Mapbox.
              Créez un compte sur <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a> et entrez votre clé publique ci-dessous.
            </p>
            <div className="flex gap-2">
              <Input 
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="flex-1"
                placeholder="Entrez votre clé API Mapbox"
              />
              <Button onClick={saveToken}>Enregistrer</Button>
            </div>
            <Button variant="outline" onClick={() => setShowTokenInput(false)}>Annuler</Button>
          </div>
        </div>
      ) : null}
      
      {mapError && (
        <div className="absolute inset-0 z-10 bg-background/90 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-4 text-center">
            <p className="text-red-500 font-medium">{mapError}</p>
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={() => setShowTokenInput(true)}
                variant="default"
              >
                Configurer la clé API
              </Button>
              <Button 
                onClick={initializeMap}
                variant="outline"
              >
                Réessayer
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="h-full w-full rounded-lg overflow-hidden" />
      
      {!mapError && !showTokenInput && (
        <div className="absolute bottom-4 right-4 z-10">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTokenInput(true)}
            className="bg-white bg-opacity-70 hover:bg-opacity-100"
          >
            Configurer API
          </Button>
        </div>
      )}
    </div>
  );
};

export default IvoryCoastMap;


import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Points de livraison exemple en Côte d'Ivoire
const deliveryPoints = [
  { id: 'DEL-1055', name: 'Livraison Abidjan Centre', coordinates: [-4.0305, 5.3364], status: 'en_cours' },
  { id: 'DEL-1052', name: 'Livraison Bouaké', coordinates: [-5.0338, 7.6881], status: 'retard' },
  { id: 'DEL-1050', name: 'Livraison Yamoussoukro', coordinates: [-5.2767, 6.8275], status: 'prêt' },
  { id: 'DEL-1048', name: 'Livraison San-Pédro', coordinates: [-6.6363, 4.7411], status: 'en_cours' },
  { id: 'DEL-1045', name: 'Livraison Korhogo', coordinates: [-5.6279, 9.4580], status: 'en_cours' }
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

const IvoryCoastMap = ({ height = '400px', className = '' }: IvoryCoastMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Utiliser une clé d'API publique temporaire pour Mapbox
    // Dans une application réelle, cela devrait être stocké en toute sécurité
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xsNzE1cm01MHM0bDNkbXpqdjZmcnB4ZSJ9.pfavUjZxUDTKhVhe-ZpGxg';

    // Initialiser la carte
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

    // Ajouter les points de livraison une fois la carte chargée
    map.current.on('load', () => {
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
    });

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div ref={mapContainer} className={`rounded-lg overflow-hidden ${className}`} style={{ height }} />
  );
};

export default IvoryCoastMap;

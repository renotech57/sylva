
import React, { useState } from 'react';

const VisualDiagram: React.FC = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const parts = [
    { id: 'entrait', name: 'Entrait', d: 'M 50 250 L 450 250 L 450 260 L 50 260 Z', color: '#92400e' },
    { id: 'arba1', name: 'Arbalétrier Gauche', d: 'M 50 250 L 250 50 L 260 60 L 60 260 Z', color: '#b45309' },
    { id: 'arba2', name: 'Arbalétrier Droit', d: 'M 450 250 L 250 50 L 240 60 L 440 260 Z', color: '#b45309' },
    { id: 'poincon', name: 'Poinçon', d: 'M 245 50 L 255 50 L 255 250 L 245 250 Z', color: '#78350f' },
    { id: 'fiche1', name: 'Contre-fiche Gauche', d: 'M 150 150 L 245 200 L 245 210 L 150 160 Z', color: '#d97706' },
    { id: 'fiche2', name: 'Contre-fiche Droite', d: 'M 350 150 L 255 200 L 255 210 L 350 160 Z', color: '#d97706' },
  ];

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-inner border border-stone-200">
      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Structure d'une Ferme Traditionnelle</h3>
      <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-lg">
        {parts.map((part) => (
          <path
            key={part.id}
            d={part.d}
            fill={hoveredPart === part.id ? '#f59e0b' : part.color}
            className="transition-colors duration-200 cursor-help"
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
          />
        ))}
        {/* Simple Labels */}
        <text x="250" y="280" textAnchor="middle" className="text-xs font-medium fill-stone-400">Schéma interactif</text>
      </svg>
      
      <div className="mt-4 h-12 flex items-center justify-center bg-stone-100 rounded-lg">
        {hoveredPart ? (
          <p className="text-amber-900 font-bold text-lg animate-pulse">
            {parts.find(p => p.id === hoveredPart)?.name}
          </p>
        ) : (
          <p className="text-stone-400 text-sm">Survolez une pièce pour voir son nom</p>
        )}
      </div>
    </div>
  );
};

export default VisualDiagram;

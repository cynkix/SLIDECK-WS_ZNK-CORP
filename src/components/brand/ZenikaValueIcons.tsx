import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Icône "Complexités constatées" :
 * Cercle plein orange (#F5921E) avec triangle d'alerte arrondi et point d'exclamation en blanc pur.
 * Conforme exactement à la charte et à la maquette fournie.
 */
export const ZenikaComplexityIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire orange de la marque */}
    <circle cx="50" cy="50" r="50" fill="#F5921E" />
    
    {/* Triangle d'alerte aux coins arrondis et trait blanc épais */}
    <path
      d="M50 24L23 72.5C21.6 75 23.4 78 26.3 78H73.7C76.6 78 78.4 75 77 72.5L50 24Z"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Barre supérieure du point d'exclamation */}
    <line
      x1="50"
      y1="43"
      x2="50"
      y2="57"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
    />
    
    {/* Point inférieur d'exclamation */}
    <circle cx="50" cy="67.5" r="3.2" fill="#FFFFFF" />
  </svg>
);

/**
 * Icône "3 Piliers Stratégiques / Valeur ajoutée" :
 * Cercle plein rouge Zenika (#E60039) avec 3 couches isométriques superposées aux coins arrondis en blanc pur.
 * Conforme exactement à la charte et à la maquette fournie.
 */
export const ZenikaPillarsIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire rouge Zenika */}
    <circle cx="50" cy="50" r="50" fill="#E60039" />
    
    {/* Couche supérieure : losange isométrique fermé aux coins arrondis */}
    <path
      d="M50 27L74 38.5C75.5 39.3 75.5 41.5 74 42.3L50 53.8C48.5 54.5 46.5 54.5 45 53.8L21 42.3C19.5 41.5 19.5 39.3 21 38.5L45 27C46.5 26.2 48.5 26.2 50 27Z"
      stroke="#FFFFFF"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Couche intermédiaire : arche isométrique inférieure */}
    <path
      d="M21 53L45 64.5C46.5 65.2 48.5 65.2 50 64.5L74 53"
      stroke="#FFFFFF"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Couche inférieure : arche isométrique de base */}
    <path
      d="M21 64L45 75.5C46.5 76.2 48.5 76.2 50 75.5L74 64"
      stroke="#FFFFFF"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/**
 * Icône "Valeur Métier & ROI" :
 * Cercle plein vert émeraude (#00B074) avec flèche de croissance brisée ascendante en blanc pur.
 * Conforme exactement à la charte et à la maquette fournie.
 */
export const ZenikaRoiIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire vert émeraude */}
    <circle cx="50" cy="50" r="50" fill="#00B074" />
    
    {/* Tracé brisé de croissance vers le haut-droite */}
    <path
      d="M26 62.5L44 44.5L54.5 55L73.5 35"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Pointe de flèche proéminente */}
    <path
      d="M57 34H75V52"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Icône "Conseil / Stratégie & Architecture" :
 * Cercle plein bleu (#2563EB) avec boussole / cadrage stratégique en blanc pur.
 * Conforme au même style graphique que ZenikaPillarsIcon et ZenikaComplexityIcon.
 */
export const ZenikaConseilIcon: React.FC<IconProps> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire bleu stratégique */}
    <circle cx="50" cy="50" r="50" fill="#2563EB" />
    
    {/* Aiguille boussole nord en blanc plein */}
    <path
      d="M50 20L61 47L50 42L39 47Z"
      fill="#FFFFFF"
    />
    
    {/* Aiguille sud en tracé contour géométrique */}
    <path
      d="M50 80L39 53L50 58L61 53Z"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Axe central */}
    <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
    
    {/* Repères cardinaux */}
    <line x1="50" y1="11" x2="50" y2="15" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="50" y1="85" x2="50" y2="89" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="11" y1="50" x2="15" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="85" y1="50" x2="89" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

/**
 * Icône "Réalisation / Software Craft & Cloud-Native" :
 * Cercle plein rouge Zenika (#E60039) avec chevrons code craft et slash central en blanc pur.
 * Conforme au même style graphique que ZenikaPillarsIcon.
 */
export const ZenikaRealisationIcon: React.FC<IconProps> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire rouge Zenika */}
    <circle cx="50" cy="50" r="50" fill="#E60039" />
    
    {/* Chevron gauche < */}
    <path
      d="M36 34L21 50L36 66"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Chevron droit > */}
    <path
      d="M64 34L79 50L64 66"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Slash / central */}
    <line
      x1="55"
      y1="31"
      x2="45"
      y2="69"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Icône "Formation / Académie & Acculturation IA" :
 * Cercle plein ambre/orange (#F5921E) avec toque académique et gland d'apprentissage en blanc pur.
 * Conforme au même style graphique que ZenikaComplexityIcon.
 */
export const ZenikaFormationIcon: React.FC<IconProps> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Fond circulaire ambre chaud de la marque */}
    <circle cx="50" cy="50" r="50" fill="#F5921E" />
    
    {/* Toque académique supérieure */}
    <path
      d="M50 26L79 40L50 54L21 40Z"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Base arrondie de la toque */}
    <path
      d="M33 48V64C33 71 67 71 67 64V48"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Cordon et gland latéral */}
    <path
      d="M79 42V61"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="79" cy="66" r="3.5" fill="#FFFFFF" />
  </svg>
);


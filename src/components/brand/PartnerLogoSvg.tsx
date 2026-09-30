import React from 'react';

interface PartnerLogoProps {
  id: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const PartnerLogoSvg: React.FC<PartnerLogoProps> = ({ id, className = "h-8 w-auto", size = 32, style }) => {
  switch (id) {
    case 'gcp':
    case 'google-cloud':
      return (
        <svg viewBox="0 0 192 155" width={size * 1.25} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Google Cloud Authentic SVG */}
          <path d="M78.6 63.9l14.9-25.9a38.4 38.4 0 0 0-38.4-19.1c-14.8.8-27.9 9.3-34.1 22.8a38.5 38.5 0 0 0 3.2 39.5l14.9-25.9c3.8-6.6 11.8-9.8 19.3-7.8 7.5 2 12.8 8.8 12.8 16.4h7.4z" fill="#EA4335" />
          <path d="M148.9 97.4l22.4 13a45.7 45.7 0 0 0 13.9-24.8 46.1 46.1 0 0 0-7.8-38.3c-9.1-13.2-24.5-20.9-40.4-20.2-7.8.4-15.3 3.1-21.8 7.7l14.9 25.9c4.3-3 9.6-4.6 15-4.4 9.8.3 18.4 6.7 21.6 16 3.2 9.3-.1 19.6-7.8 25.6l-10 5.5z" fill="#4285F4" />
          <path d="M148.9 97.4l-14.9 25.9c-4.4 7.6-12.5 12.3-21.3 12.3H56.5a24.6 24.6 0 0 1-21.3-12.3L12.8 97.4A45.8 45.8 0 0 0 4.9 122c4.4 15.6 15.8 28.3 30.6 34.2 8.7 3.5 18 5.3 27.4 5.3h76.6c13.7 0 26.9-5.7 36.3-15.8 8.8-9.5 13.5-22.1 13.1-35.1l-39.8-13.2h-.2z" fill="#34A853" />
          <path d="M112.7 135.6a24.6 24.6 0 0 0 21.3-12.3l14.9-25.9-29.8-17.2-26.2 45.4h19.8z" fill="#FBBC04" />
        </svg>
      );

    case 'databricks':
      return (
        <svg viewBox="0 0 140 120" width={size * 1.15} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Databricks 4 isometric chevrons */}
          <path d="M70 0L14.7 30.7l14.2 7.9L70 15.8l41.1 22.8 14.2-7.9L70 0z" fill="#FF3621" />
          <path d="M70 28.5L28.9 51.3l14.2 7.9L70 44.3l26.9 14.9 14.2-7.9L70 28.5z" fill="#FF3621" />
          <path d="M70 57L28.9 79.8l14.2 7.9L70 72.8l26.9 14.9 14.2-7.9L70 57z" fill="#FF3621" />
          <path d="M70 85.5L14.7 116.2l14.2 7.9L70 101.3l41.1 22.8 14.2-7.9L70 85.5z" fill="#FF3621" />
        </svg>
      );

    case 'confluent':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Confluent overlapping flow circles */}
          <circle cx="60" cy="60" r="50" stroke="#00A0DF" strokeWidth="8" strokeDasharray="30 15" opacity="0.3" />
          <circle cx="42" cy="48" r="22" fill="#00A0DF" fillOpacity="0.85" />
          <circle cx="78" cy="48" r="22" fill="#0081B8" fillOpacity="0.85" />
          <circle cx="60" cy="78" r="22" fill="#00C4FF" fillOpacity="0.85" />
          <path d="M42 48L78 48L60 78Z" fill="#FFFFFF" fillOpacity="0.35" />
        </svg>
      );

    case 'redhat':
      return (
        <svg viewBox="0 0 120 100" width={size * 1.2} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red Hat iconic shadow Fedora silhouette */}
          <path d="M102.5 54.3c-2.3-13.8-19.4-17.6-32.6-18.4-5.3-.3-10.4-.2-15.3.8-1.5.3-3 .7-4.4 1.2-1.9.7-3.6 1.6-5.1 2.8C42 42.8 38 48 37 54c-1.4 8.7 2.3 14 6.8 17.5 4.3 3.3 10.3 4.9 17.2 4.9 10 0 20-3.3 27.5-9.6 7-5.9 11.5-13.4 14-22.5z" fill="#EE0000" />
          <path d="M109 61c-5.8 4.2-18.5 7.5-32.5 7.5-22.5 0-38-8.5-44.5-17.2-2.5-3.3-3.8-6.8-4-10.3-.2-3.8 1-7.5 3.3-10.5 4.8-6.3 13.8-10 24.2-10 13.5 0 25.5 6.3 31.5 16 1.8 2.9 3 6.2 3.5 9.7 1 7.2 9.5 9.8 18.5 4.8z" fill="#EE0000" />
          <ellipse cx="62" cy="55" rx="38" ry="8" fill="#151515" opacity="0.9" />
          <path d="M38 52c-8 2-18 6-18 12 0 7 19 12 42 12s42-5 42-12c0-5-7-9-17-11-7 4-18 6-25 6s-17-3-24-7z" fill="#EE0000" />
        </svg>
      );

    case 'gitlab':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* GitLab Tanuki Fox */}
          <path d="M60 110L82.8 40H37.2L60 110Z" fill="#E24329" />
          <path d="M60 110L37.2 40H11.5L60 110Z" fill="#FC6D26" />
          <path d="M11.5 40L2.5 67.5C1.8 69.8 2.6 72.3 4.5 73.7L60 110L11.5 40Z" fill="#FCA326" />
          <path d="M11.5 40H37.2L26 5.5C25.1 2.8 21.4 2.8 20.6 5.5L11.5 40Z" fill="#E24329" />
          <path d="M60 110L82.8 40H108.5L60 110Z" fill="#FC6D26" />
          <path d="M108.5 40L117.5 67.5C118.2 69.8 117.4 72.3 115.5 73.7L60 110L108.5 40Z" fill="#FCA326" />
          <path d="M108.5 40H82.8L94 5.5C94.9 2.8 98.6 2.8 99.4 5.5L108.5 40Z" fill="#E24329" />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 140 90" width={size * 1.3} height={size * 0.85} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AWS Typography + Smile Arrow */}
          <text x="25" y="44" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="38" fill="currentColor" letterSpacing="-1">aws</text>
          <path d="M18 56C42 74 96 74 120 54" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
          <path d="M112 50L124 53L118 64Z" fill="#FF9900" />
        </svg>
      );

    case 'kong':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kong API Gateway Geometric Gorilla Badge */}
          <rect width="120" height="120" rx="24" fill="#003366" />
          <path d="M35 32H85L95 62L60 98L25 62L35 32Z" fill="#00B0FF" />
          <path d="M48 45H72L78 60L60 78L42 60L48 45Z" fill="#FFFFFF" />
          <circle cx="53" cy="54" r="3" fill="#003366" />
          <circle cx="67" cy="54" r="3" fill="#003366" />
        </svg>
      );

    case 'cloudtemple':
    case 'cloud-temple':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud Temple Sovereign Cloud Shield */}
          <rect width="120" height="120" rx="24" fill="#00BFA5" fillOpacity="0.12" />
          <path d="M60 20L95 36V62C95 82 80 98 60 105C40 98 25 82 25 62V36L60 20Z" stroke="#00BFA5" strokeWidth="6" fill="#00BFA5" fillOpacity="0.2" />
          <path d="M42 60C42 50 50 42 60 42C70 42 78 50 78 60C78 70 70 78 60 78" stroke="#00BFA5" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="6" fill="#00BFA5" />
        </svg>
      );

    case 'grafana':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grafana Labs Faceted Orange Logo */}
          <circle cx="60" cy="60" r="54" fill="#F46800" fillOpacity="0.15" stroke="#F46800" strokeWidth="4" />
          <path d="M60 25L90 42V78L60 95L30 78V42L60 25Z" fill="#F46800" />
          <path d="M60 25L90 78H30L60 25Z" fill="#FFA534" fillOpacity="0.6" />
          <circle cx="60" cy="60" r="10" fill="#FFFFFF" />
        </svg>
      );

    case 'safe':
    case 'scaled-agile':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Scaled Agile SAFe Hexagon */}
          <rect width="120" height="120" rx="24" fill="#1B365D" />
          <path d="M60 22L92 40V78L60 96L28 78V40L60 22Z" stroke="#F5A623" strokeWidth="5" fill="none" />
          <text x="60" y="68" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="22" fill="#FFFFFF" textAnchor="middle">SAFe</text>
        </svg>
      );

    case 'kubernetes':
    case 'cncf':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kubernetes 7-spoked wheel */}
          <path d="M60 12L98 32V78L60 108L22 78V32L60 12Z" stroke="#326CE5" strokeWidth="6" fill="#326CE5" fillOpacity="0.1" />
          <circle cx="60" cy="60" r="16" fill="#326CE5" />
          <line x1="60" y1="20" x2="60" y2="44" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
          <line x1="88" y1="36" x2="72" y2="50" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
          <line x1="90" y1="72" x2="72" y2="66" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
          <line x1="60" y1="100" x2="60" y2="76" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
          <line x1="30" y1="72" x2="48" y2="66" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
          <line x1="32" y1="36" x2="48" y2="50" stroke="#326CE5" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'elastic':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elastic Search Clusters */}
          <circle cx="60" cy="60" r="54" fill="#005571" fillOpacity="0.1" />
          <rect x="24" y="32" width="72" height="12" rx="6" fill="#FED136" />
          <rect x="36" y="54" width="60" height="12" rx="6" fill="#00BFB3" />
          <rect x="24" y="76" width="48" height="12" rx="6" fill="#F04E98" />
        </svg>
      );

    case 'qualiopi':
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Qualiopi Certification Emblem */}
          <rect width="120" height="120" rx="20" fill="#E60039" fillOpacity="0.08" stroke="#E60039" strokeWidth="2" />
          <rect x="20" y="25" width="26" height="70" fill="#002395" rx="3" />
          <rect x="47" y="25" width="26" height="70" fill="#FFFFFF" rx="3" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="74" y="25" width="26" height="70" fill="#ED2939" rx="3" />
          <text x="60" y="110" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="11" fill="#E60039" textAnchor="middle">QUALIOPI</text>
        </svg>
      );

    default:
      return (
        <div style={style} className="w-20 h-20 rounded-lg bg-[#E60039]/10 text-[#E60039] font-bold flex items-center justify-center font-mono text-base">
          {id.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

import { z } from 'zod';

export interface ShareData {
  emissions: Record<string, number>; // emissionId -> quantity
  timestamp: number;
  version: string;
}

const ShareDataSchema = z.object({
  emissions: z.record(z.string(), z.number().min(0)),
  timestamp: z.number().positive(),
  version: z.string(),
});

// Compression simple pour réduire la taille des URLs
const compressEmissions = (emissions: Record<string, number>): string => {
  // Ne garder que les émissions avec une quantité > 0
  const filtered = Object.entries(emissions)
    .filter(([_, quantity]) => quantity > 0)
    .reduce((acc, [id, quantity]) => ({ ...acc, [id]: quantity }), {});

  // Encoder en base64
  const json = JSON.stringify(filtered);
  return btoa(json).replace(/[+/=]/g, (match) => {
    switch (match) {
      case '+': return '-';
      case '/': return '_';
      case '=': return '';
      default: return match;
    }
  });
};

const decompressEmissions = (compressed: string): Record<string, number> => {
  try {
    // Restaurer les caractères base64
    const base64 = compressed.replace(/[-_]/g, (match) => {
      return match === '-' ? '+' : '/';
    });
    
    // Ajouter le padding manquant
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const json = atob(base64 + padding);
    
    return JSON.parse(json);
  } catch (error) {
    console.error('Erreur lors de la décompression:', error);
    return {};
  }
};

export const generateShareUrl = (emissions: Record<string, number>): string => {
  const shareData: ShareData = {
    emissions,
    timestamp: Date.now(),
    version: '1.0'
  };

  const compressed = compressEmissions(shareData.emissions);
  const url = new URL(window.location.href);
  url.searchParams.set('s', compressed);
  url.searchParams.set('t', shareData.timestamp.toString());
  url.searchParams.set('v', shareData.version);
  
  return url.toString();
};

export const parseShareUrl = (url?: string): ShareData | null => {
  try {
    const urlObj = new URL(url || window.location.href);
    const compressed = urlObj.searchParams.get('s');
    const timestamp = urlObj.searchParams.get('t');
    const version = urlObj.searchParams.get('v');

    if (!compressed || !timestamp || !version) {
      return null;
    }

    const emissions = decompressEmissions(compressed);
    
    const shareData: ShareData = {
      emissions,
      timestamp: parseInt(timestamp),
      version
    };

    // Valider les données
    ShareDataSchema.parse(shareData);
    
    return shareData;
  } catch (error) {
    console.error('Erreur lors du parsing de l\'URL:', error);
    return null;
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.opacity = '0';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la copie:', error);
    return false;
  }
};

export const isValidShareUrl = (url: string): boolean => {
  return parseShareUrl(url) !== null;
};
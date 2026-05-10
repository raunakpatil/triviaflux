
'use client';

/**
 * @fileOverview Centralized service for resolving and caching entity images.
 */

import { doc, getDoc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';

export interface ImageResult {
  imageUrl: string;
  thumbnailUrl?: string;
}

const TMDB_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Enhanced category fallbacks
const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  'Geography': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1280',
  'Population': 'https://images.unsplash.com/photo-1518391846015-55a9cc00bb86?auto=format&fit=crop&q=80&w=1280',
  'Sports': 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1280',
  'Entertainment': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1280',
  'Crypto & Finance': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1280',
  'Science & Space': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280',
  'Technology': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1280',
  'History': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=1280',
  'Weather & Nature': 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1280',
  'default': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280'
};

/**
 * Resolves a relevant image URL for an entity.
 * Checks Firestore cache first.
 */
export async function resolveEntityImage(
  db: Firestore,
  entityName: string,
  deckTitle: string,
  hint?: string
): Promise<string> {
  const entityId = entityName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const cacheRef = doc(db, 'cachedEntities', entityId);

  try {
    const cacheSnap = await getDoc(cacheRef);
    if (cacheSnap.exists()) {
      return cacheSnap.data().imageUrl;
    }
  } catch (e) {
    // Silently fallback to dynamic resolution if cache fails
  }

  let imageUrl = '';

  // Determine source based on hint/deck
  if (hint?.startsWith('/')) {
    // TMDB path detected
    imageUrl = `${TMDB_BASE_URL}${hint}`;
  } else if (hint) {
    // Unsplash search fallback
    imageUrl = `https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1280&q=${encodeURIComponent(hint)}`;
  } else {
    // Generic picsum seed
    imageUrl = `https://picsum.photos/seed/${entityId}/1200/800`;
  }

  // Final cache write (non-blocking)
  if (imageUrl) {
    setDoc(cacheRef, {
      name: entityName,
      imageUrl,
      updatedAt: serverTimestamp()
    }, { merge: true }).catch(() => {});
  }

  return imageUrl || CATEGORY_PLACEHOLDERS['default'];
}

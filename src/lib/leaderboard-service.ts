import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  addDoc, 
  getDocs, 
  Firestore, 
  serverTimestamp,
  where
} from 'firebase/firestore';

export interface ScoreEntry {
  name: string;
  score: number;
  mode: string;
  tag: string;
  timestamp: any;
}

export function saveScore(db: Firestore, entry: Omit<ScoreEntry, 'timestamp'>) {
  const scoresRef = collection(db, 'leaderboard');
  addDoc(scoresRef, {
    ...entry,
    timestamp: serverTimestamp(),
  }).catch((err) => {
    console.error('Failed to save score:', err);
  });
}

export async function getTopScores(db: Firestore, mode: string, limitCount: number = 10): Promise<ScoreEntry[]> {
  const scoresRef = collection(db, 'leaderboard');
  const q = query(
    scoresRef,
    where('mode', '==', mode),
    orderBy('score', 'desc'),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as ScoreEntry);
}
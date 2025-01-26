import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './config';
import { UAParser } from 'ua-parser-js';

const ANALYTICS_COLLECTION = 'analytics';

interface PageView {
  path: string;
  timestamp: Date;
  ipHash: string;
  userAgent: {
    browser: string;
    os: string;
    device: string;
  };
  referrer: string;
}

export async function logPageView(pageView: Omit<PageView, 'timestamp'>) {
  try {
    await addDoc(collection(db, ANALYTICS_COLLECTION), {
      ...pageView,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error logging page view:', error);
  }
}

export async function getAnalytics(startDate?: Date, endDate?: Date) {
  try {
    let queryConstraints = [];
    
    if (startDate && endDate) {
      queryConstraints.push(
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate))
      );
    }
    
    queryConstraints.push(orderBy('timestamp', 'desc'));
    const q = query(collection(db, ANALYTICS_COLLECTION), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return {
      pageViews: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      error: null
    };
  } catch (error: any) {
    return { pageViews: [], error: error.message };
  }
} 
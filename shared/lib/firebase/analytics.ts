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
    console.log("Firebase analytics: Fetching data with date range:", { 
      startDate: startDate?.toISOString(), 
      endDate: endDate?.toISOString() 
    });
    
    let queryConstraints = [];
    
    if (startDate && endDate) {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
      
      console.log("Firebase analytics: Using date filters:", { 
        startTimestamp, 
        endTimestamp 
      });
      
      queryConstraints.push(
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp)
      );
    }
    
    queryConstraints.push(orderBy('timestamp', 'desc'));
    const q = query(collection(db, ANALYTICS_COLLECTION), ...queryConstraints);
    
    console.log("Firebase analytics: Executing query with constraints:", 
      queryConstraints.map(c => c.type)
    );
    
    const snapshot = await getDocs(q);
    const pageViews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log("Firebase analytics: Retrieved data:", { 
      count: pageViews.length,
      sample: pageViews.slice(0, 2)
    });
    
    return {
      pageViews,
      error: null
    };
  } catch (error: any) {
    console.error('Firebase analytics: Error fetching data:', error);
    return { 
      pageViews: [], 
      error: error.message || "Failed to fetch analytics data" 
    };
  }
} 
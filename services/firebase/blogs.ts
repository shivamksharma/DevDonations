import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost, BlogStatus } from '@/shared/utils/types/admin';

const COLLECTION_NAME = 'blogs';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | null): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

// Convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert Firestore document to BlogPost
const docToBlogPost = (doc: any): BlogPost => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    author: data.author,
    authorId: data.authorId,
    status: data.status,
    featuredImage: data.featuredImage,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
  } as BlogPost;
};

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Get published blog posts
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    throw error;
  }
};

// Get blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docToBlogPost(docSnap);
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

// Get blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return docToBlogPost(querySnapshot.docs[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw error;
  }
};

// Create new blog post
export const createBlogPost = async (blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    const docData = {
      ...blogData,
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Update blog post
export const updateBlogPost = async (id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    };
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

// Update blog post status
export const updateBlogPostStatus = async (id: string, status: BlogStatus): Promise<void> => {
  await updateBlogPost(id, { status });
};

// Delete blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

// Get recent blog posts
export const getRecentBlogPosts = async (count: number = 4): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    throw error;
  }
};

// Subscribe to blog posts (real-time)
export const subscribeToBlogPosts = (callback: (posts: BlogPost[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(docToBlogPost);
    callback(posts);
  }, (error) => {
    console.error('Error subscribing to blog posts:', error);
  });
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
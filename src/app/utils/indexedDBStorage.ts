// IndexedDB storage for large CSV datasets
// IndexedDB supports much larger storage limits than localStorage (50-100MB+)

const DB_NAME = 'DashboardDB';
const STORE_NAME = 'conversationData';
const DB_VERSION = 1;

interface ConversationRow {
  [key: string]: string;
}

// Open or create the database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

// Save CSV data to IndexedDB
export async function saveCSVData(data: ConversationRow[]): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Clear existing data first
    store.clear();
    
    // Store the data with a known key
    const request = store.put(data, 'csvData');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      console.log('✅ Data saved to IndexedDB');
      resolve();
    };
    
    transaction.onerror = () => reject(transaction.error);
  });
}

// Load CSV data from IndexedDB
export async function loadCSVData(): Promise<ConversationRow[]> {
  try {
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('csvData');
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const data = request.result || [];
        console.log(`📊 Loaded ${data.length} rows from IndexedDB`);
        resolve(data);
      };
    });
  } catch (error) {
    console.error('Error loading from IndexedDB:', error);
    return [];
  }
}

// Check if data exists in IndexedDB
export async function hasCSVData(): Promise<boolean> {
  try {
    const data = await loadCSVData();
    return data.length > 0;
  } catch {
    return false;
  }
}

// Clear all data from IndexedDB
export async function clearCSVData(): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      console.log('🗑️ Data cleared from IndexedDB');
      resolve();
    };
  });
}

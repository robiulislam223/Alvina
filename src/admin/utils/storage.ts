export const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const raw = localStorage.getItem(`alvina_${key}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
  }
  return defaultValue;
};

export const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`alvina_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

export const initializeStorage = (): void => {
  // Ensure storage is initialized cleanly
};

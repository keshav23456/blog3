/**
 * useAutoSave Hook
 * 
 * Automatically saves form data to localStorage at regular intervals
 * Prevents data loss from accidental page closes or crashes
 */

import { useEffect, useRef, useCallback } from 'react';

export const useAutoSave = (
  data,
  key,
  options = {}
) => {
  const {
    delay = 3000, // Auto-save every 3 seconds
    enabled = true,
    onSave = null,
    onRestore = null,
  } = options;

  const timeoutRef = useRef(null);
  const previousDataRef = useRef(null);

  // Save to localStorage
  const save = useCallback(() => {
    if (!enabled || !key) return;

    try {
      const dataToSave = {
        ...data,
        _savedAt: new Date().toISOString(),
      };
      localStorage.setItem(`autosave_${key}`, JSON.stringify(dataToSave));
      
      if (onSave) {
        onSave(dataToSave);
      }
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  }, [data, key, enabled, onSave]);

  // Restore from localStorage
  const restore = useCallback(() => {
    if (!key) return null;

    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        if (onRestore) {
          onRestore(parsed);
        }
        
        return parsed;
      }
    } catch (error) {
      console.error('Auto-restore error:', error);
    }
    
    return null;
  }, [key, onRestore]);

  // Clear auto-saved data
  const clear = useCallback(() => {
    if (!key) return;

    try {
      localStorage.removeItem(`autosave_${key}`);
    } catch (error) {
      console.error('Auto-save clear error:', error);
    }
  }, [key]);

  // Check if there's saved data
  const hasSavedData = useCallback(() => {
    if (!key) return false;
    return localStorage.getItem(`autosave_${key}`) !== null;
  }, [key]);

  // Get saved timestamp
  const getSavedTimestamp = useCallback(() => {
    const saved = restore();
    return saved?._savedAt || null;
  }, [restore]);

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !data) return;

    // Check if data changed
    const dataString = JSON.stringify(data);
    if (dataString === previousDataRef.current) return;
    
    previousDataRef.current = dataString;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save();
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, save]);

  // Warn before leaving if there's unsaved data
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e) => {
      if (hasSavedData()) {
        save(); // Last attempt to save
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, save, hasSavedData]);

  return {
    save,
    restore,
    clear,
    hasSavedData,
    getSavedTimestamp,
  };
};

export default useAutoSave;



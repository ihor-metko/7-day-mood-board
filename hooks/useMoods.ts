import { useState, useEffect, useCallback, useRef } from 'react';
import { Mood, Weekday, WEEKDAYS } from '@/types/mood';
import { fetchMoods, putMood } from '@/services/api';

type UseMoodsResult = {
  moods: Record<Weekday, Mood | null>;
  isLoading: boolean;
  error: string | null;
  updateMood: (day: Weekday, mood: Mood | null) => void;
  clearError: () => void;
};

type InflightRequest = {
  clientRequestId: number;
  day: Weekday;
  mood: Mood | null;
};

export function useMoods(): UseMoodsResult {
  // Authoritative server state
  const [serverMoods, setServerMoods] = useState<Record<Weekday, Mood | null>>(() =>
    WEEKDAYS.reduce((acc, day) => ({ ...acc, [day]: null }), {} as Record<Weekday, Mood | null>)
  );
  
  // Optimistic overlay
  const [optimisticOverlay, setOptimisticOverlay] = useState<Partial<Record<Weekday, Mood | null>>>({});
  
  // Inflight tracking
  const inflightRequests = useRef<Map<Weekday, InflightRequest>>(new Map());
  const nextClientRequestId = useRef<number>(1);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load initial state
  useEffect(() => {
    let mounted = true;
    
    fetchMoods()
      .then(response => {
        if (!mounted) return;
        
        const moodsRecord = response.days.reduce((acc, dayData) => {
          acc[dayData.day] = dayData.mood;
          return acc;
        }, {} as Record<Weekday, Mood | null>);
        
        setServerMoods(moodsRecord);
        setIsLoading(false);
      })
      .catch(err => {
        if (!mounted) return;
        setError(`Failed to load moods: ${err.message}`);
        setIsLoading(false);
      });
    
    return () => {
      mounted = false;
    };
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const updateMood = useCallback((day: Weekday, mood: Mood | null) => {
    // Assign clientRequestId
    const clientRequestId = nextClientRequestId.current++;
    
    // Apply optimistic update immediately
    setOptimisticOverlay(prev => ({ ...prev, [day]: mood }));
    
    // Track inflight request
    inflightRequests.current.set(day, { clientRequestId, day, mood });
    
    // Send request in background
    putMood(day, mood, clientRequestId)
      .then(response => {
        // Check if this is still the latest request for this day
        const inflight = inflightRequests.current.get(day);
        
        if (inflight && inflight.clientRequestId === response.clientRequestId) {
          // This is the latest request, reconcile with server state
          const moodsRecord = response.days.reduce((acc, dayData) => {
            acc[dayData.day] = dayData.mood;
            return acc;
          }, {} as Record<Weekday, Mood | null>);
          
          setServerMoods(moodsRecord);
          
          // Remove optimistic overlay for this day
          setOptimisticOverlay(prev => {
            const newOverlay = { ...prev };
            delete newOverlay[day];
            return newOverlay;
          });
          
          // Remove from inflight tracking
          inflightRequests.current.delete(day);
        }
        // If this is not the latest request, ignore it (out-of-order reply)
      })
      .catch(err => {
        // On error, remove optimistic overlay and show error
        setOptimisticOverlay(prev => {
          const newOverlay = { ...prev };
          delete newOverlay[day];
          return newOverlay;
        });
        
        inflightRequests.current.delete(day);
        
        setError(`Failed to update ${day}: ${err.message}`);
      });
  }, []);
  
  // Compute final moods (server state + optimistic overlay)
  const moods = { ...serverMoods, ...optimisticOverlay };
  
  return {
    moods,
    isLoading,
    error,
    updateMood,
    clearError,
  };
}

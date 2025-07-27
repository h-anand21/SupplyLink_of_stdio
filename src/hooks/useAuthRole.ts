
import { useState, useEffect } from 'react';
import type { Role } from '@/lib/types';

// This is a mock implementation of the useAuthRole hook.
// It simulates fetching a user role from local storage.
export function useAuthRole() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get the role from localStorage
    const storedRole = localStorage.getItem('userRole') as Role | null;
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  return { role, loading };
}

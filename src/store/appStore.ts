import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet, Translation } from '@/types/pet';

interface AppState {
  // Onboarding
  hasOnboarded: boolean;
  setOnboarded: () => void;

  // App version
  appVersion: 'v3' | 'v2' | 'v1';
  setAppVersion: (v: 'v3' | 'v2' | 'v1') => void;

  // Pets
  pets: Pet[];
  selectedPetId: string | null;
  addPet: (pet: Pet) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  removePet: (id: string) => void;
  selectPet: (id: string | null) => void;

  // Translations
  translations: Translation[];
  addTranslation: (t: Translation) => void;
  rateFeedback: (id: string, feedback: 'up' | 'down') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setOnboarded: () => set({ hasOnboarded: true }),

      appVersion: 'v3',
      setAppVersion: (v) => set({ appVersion: v }),

      pets: [],
      selectedPetId: null,
      addPet: (pet) => set((s) => ({ pets: [...s.pets, pet], selectedPetId: pet.id })),
      updatePet: (id, updates) =>
        set((s) => ({ pets: s.pets.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),
      removePet: (id) =>
        set((s) => ({
          pets: s.pets.filter((p) => p.id !== id),
          selectedPetId: s.selectedPetId === id ? (s.pets[0]?.id ?? null) : s.selectedPetId,
        })),
      selectPet: (id) => set({ selectedPetId: id }),

      translations: [],
      addTranslation: (t) => set((s) => ({ translations: [t, ...s.translations] })),
      rateFeedback: (id, feedback) =>
        set((s) => ({
          translations: s.translations.map((t) => (t.id === id ? { ...t, feedback } : t)),
        })),
    }),
    { name: 'pawtalk-store' }
  )
);

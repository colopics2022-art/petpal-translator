import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, PawPrint, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BREEDS = {
  dog: ['Labrador', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Beagle', 'Husky', 'Corgi', 'Dachshund', 'Mixed'],
  cat: ['Persian', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'Abyssinian', 'Sphynx', 'British Shorthair', 'Tabby', 'Mixed'],
};

const TAGS = ['Playful', 'Calm', 'Energetic', 'Shy', 'Curious', 'Lazy', 'Vocal', 'Independent', 'Clingy', 'Mischievous'];

export default function MyPetsPage() {
  const { pets, addPet, removePet, selectPet } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'dog' as 'dog' | 'cat', breed: '', age: '', tags: [] as string[] });

  const handleSubmit = () => {
    if (!form.name || !form.breed) return;
    const pet = {
      id: crypto.randomUUID(),
      name: form.name,
      type: form.type,
      breed: form.breed,
      age: parseInt(form.age) || 1,
      photoUrl: '',
      personalityTags: form.tags,
      createdAt: new Date().toISOString(),
    };
    addPet(pet);
    selectPet(pet.id);
    setForm({ name: '', type: 'dog', breed: '', age: '', tags: [] });
    setShowForm(false);
  };

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  return (
    <div className="px-5 pt-12 pb-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-black">🐾 My Pets</h1>
          <p className="text-sm text-muted-foreground">{pets.length} pet{pets.length !== 1 ? 's' : ''}</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="rounded-2xl gradient-amber text-primary-foreground font-heading font-bold shadow-card hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Pet
        </Button>
      </div>

      {/* Pet List */}
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                {pet.photoUrl ? (
                  <img src={pet.photoUrl} className="h-full w-full rounded-full object-cover" alt={pet.name} />
                ) : (
                  <span className="text-2xl">{pet.type === 'dog' ? '🐕' : '🐈'}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-heading font-bold">{pet.name}</p>
                <p className="text-xs text-muted-foreground">{pet.breed} · {pet.age} yr{pet.age !== 1 ? 's' : ''}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {pet.personalityTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-medium text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removePet(pet.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {pets.length === 0 && !showForm && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <PawPrint className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground mb-1">No pets yet!</p>
            <p className="text-xs text-muted-foreground">Add your furry friend to get started</p>
          </div>
        )}
      </div>

      {/* Add Pet Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-elevated"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading font-bold">New Pet</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Type */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              {(['dog', 'cat'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((f) => ({ ...f, type, breed: '' }))}
                  className={`rounded-xl border-2 py-3 text-center text-sm font-heading font-bold transition-all ${
                    form.type === type
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  {type === 'dog' ? '🐕 Dog' : '🐈 Cat'}
                </button>
              ))}
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Pet name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mb-3 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
            />

            {/* Breed */}
            <select
              value={form.breed}
              onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
              className="mb-3 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
            >
              <option value="">Select breed</option>
              {BREEDS[form.type].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Age */}
            <input
              type="number"
              placeholder="Age (years)"
              min="0"
              max="30"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              className="mb-4 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
            />

            {/* Tags */}
            <p className="mb-2 text-xs font-heading font-bold text-muted-foreground">Personality</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    form.tags.includes(tag)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!form.name || !form.breed}
              className="w-full rounded-2xl gradient-amber text-primary-foreground font-heading font-bold h-11 shadow-card hover:opacity-90 disabled:opacity-40"
            >
              Add {form.name || 'Pet'} 🐾
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

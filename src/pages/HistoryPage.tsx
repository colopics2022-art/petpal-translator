import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/appStore';
import TranslationCard from '@/components/TranslationCard';
import { Search, Filter } from 'lucide-react';
import { EMOTION_CONFIG, type EmotionState } from '@/types/pet';

export default function HistoryPage() {
  const { translations, pets } = useAppStore();
  const [search, setSearch] = useState('');
  const [filterEmotion, setFilterEmotion] = useState<EmotionState | ''>('');
  const [filterPet, setFilterPet] = useState('');

  const filtered = useMemo(() => {
    return translations.filter((t) => {
      if (search && !t.translation.toLowerCase().includes(search.toLowerCase()) && !t.petName.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterEmotion && t.emotion !== filterEmotion) return false;
      if (filterPet && t.petId !== filterPet) return false;
      return true;
    });
  }, [translations, search, filterEmotion, filterPet]);

  // Group by date
  const grouped = useMemo(() => {
    const groups: Record<string, typeof translations> = {};
    filtered.forEach((t) => {
      const date = new Date(t.createdAt).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="px-5 pt-12 pb-4">
      <div className="mb-6">
        <h1 className="text-xl font-heading font-black">📜 History</h1>
        <p className="text-sm text-muted-foreground">{translations.length} translation{translations.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search translations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-input bg-card pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <select
          value={filterPet}
          onChange={(e) => setFilterPet(e.target.value)}
          className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
        >
          <option value="">All Pets</option>
          {pets.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={filterEmotion}
          onChange={(e) => setFilterEmotion(e.target.value as EmotionState | '')}
          className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
        >
          <option value="">All Emotions</option>
          {Object.entries(EMOTION_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>{config.emoji} {config.label}</option>
          ))}
        </select>
      </div>

      {/* Translations grouped by date */}
      {Object.keys(grouped).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Filter className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            {translations.length === 0 ? 'No translations yet' : 'No results found'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <p className="mb-3 text-xs font-heading font-bold text-muted-foreground">{date}</p>
              <div className="space-y-3">
                {items.map((t) => (
                  <TranslationCard key={t.id} translation={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

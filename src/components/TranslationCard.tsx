import type { Translation } from '@/types/pet';
import EmotionBadge from './EmotionBadge';
import { ThumbsUp, ThumbsDown, Mic, Camera, Layers } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const modeIcon = { audio: Mic, visual: Camera, deep: Layers };

export default function TranslationCard({ translation }: { translation: Translation }) {
  const rateFeedback = useAppStore((s) => s.rateFeedback);
  const ModeIcon = modeIcon[translation.type];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <ModeIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-heading font-bold">{translation.petName}</p>
            <p className="text-[10px] text-muted-foreground">
              {new Date(translation.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <EmotionBadge emotion={translation.emotion} size="sm" />
      </div>

      <p className="mb-3 text-sm leading-relaxed font-body">"{translation.translation}"</p>

      <div className="mb-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full gradient-amber transition-all"
            style={{ width: `${translation.confidence}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{translation.confidence}%</span>
      </div>

      {translation.suggestions.length > 0 && (
        <div className="mb-3 space-y-1.5">
          <p className="text-xs font-heading font-bold text-muted-foreground">Try this:</p>
          {translation.suggestions.slice(0, 2).map((s, i) => (
            <div key={i} className="rounded-lg bg-muted/50 px-3 py-2 text-xs">
              <span className="font-medium">{s.verbal}</span>
              <span className="text-muted-foreground"> — {s.action}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <p className="flex-1 text-[10px] text-muted-foreground">Was this helpful?</p>
        <button
          onClick={() => rateFeedback(translation.id, 'up')}
          className={cn("rounded-lg p-1.5 transition-colors", translation.feedback === 'up' ? "bg-secondary text-secondary-foreground" : "hover:bg-muted")}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => rateFeedback(translation.id, 'down')}
          className={cn("rounded-lg p-1.5 transition-colors", translation.feedback === 'down' ? "bg-accent text-accent-foreground" : "hover:bg-muted")}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

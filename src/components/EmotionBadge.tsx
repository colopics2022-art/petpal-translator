import { EMOTION_CONFIG, type EmotionState } from '@/types/pet';
import { cn } from '@/lib/utils';

export default function EmotionBadge({ emotion, size = 'md' }: { emotion: EmotionState; size?: 'sm' | 'md' }) {
  const config = EMOTION_CONFIG[emotion];
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border border-border bg-card font-body font-medium",
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
    )}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}

import { PawPrint, Heart, ExternalLink } from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

export default function SettingsPage() {
  return (
    <div className="px-5 pt-12 pb-4">
      <div className="mb-6">
        <h1 className="text-xl font-heading font-black">⚙️ Settings</h1>
        <p className="text-sm text-muted-foreground">App preferences</p>
      </div>

      <div className="space-y-3">
        {/* App Info */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-amber shadow-card">
              <PawPrint className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold">PawTalk AI</p>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Speak Paw. Understand All."
          </p>
        </div>

        {/* Sections */}
        {[
          { title: 'Translation Quality', items: ['Use HD audio processing', 'Enable body language detection', 'Auto-stop on silence'] },
          { title: 'Notifications', items: ['Daily horoscope reminder', 'Translation streak alerts', 'New feature updates'] },
          { title: 'Data & Privacy', items: ['Export my data', 'Clear translation history', 'Delete my account'] },
        ].map((section) => (
          <div key={section.title} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="mb-3 font-heading font-bold text-sm">{section.title}</p>
            {section.items.map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-border/50 py-2.5 last:border-0">
                <span className="text-sm">{item}</span>
                <div className="h-5 w-9 rounded-full bg-muted p-0.5">
                  <div className="h-4 w-4 rounded-full bg-muted-foreground/30 transition-all" />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Premium */}
        <div className="rounded-2xl gradient-amber p-4 text-primary-foreground shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <Heart className="h-4 w-4" fill="currentColor" />
            <p className="font-heading font-bold text-sm">Upgrade to Premium</p>
          </div>
          <p className="mb-3 text-xs opacity-90">
            Unlimited translations, advanced analytics, and no ads!
          </p>
          <button className="w-full rounded-xl bg-background/20 py-2 text-sm font-heading font-bold backdrop-blur-sm hover:bg-background/30 transition-colors">
            Coming Soon
          </button>
        </div>

        <div className="pt-2">
          <Disclaimer />
        </div>

        <p className="text-center text-[10px] text-muted-foreground pb-4">
          Made with <Heart className="inline h-3 w-3 text-accent" fill="currentColor" /> for pet lovers everywhere
        </p>
      </div>
    </div>
  );
}

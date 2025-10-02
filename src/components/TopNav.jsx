import React from 'react';
import { Rocket, Settings } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0d10]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold tracking-tight">Aegis VII</div>
            <div className="text-xs text-gray-400">AI Collaboration Suite</div>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <a
            href="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-400 hover:text-gray-200"
          >
            Spline Scene
          </a>
        </nav>
      </div>
    </header>
  );
}

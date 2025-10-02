import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Aegis VII • Built for multi-agent collaboration
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-200">Docs</a>
          <a href="#" className="hover:text-gray-200">Changelog</a>
          <a href="#" className="hover:text-gray-200">Community</a>
        </div>
      </div>
    </footer>
  );
}

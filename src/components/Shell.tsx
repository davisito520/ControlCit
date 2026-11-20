import { ReactNode } from "react";
import { Usuario } from "../types";

const HOSPITAL = 'Hospital General "Dr. Armando Velasquez Mago"';

interface ShellProps {
  usuario: Usuario;
  onLogout: () => void;
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}

export function Shell({ usuario, onLogout, tabs, activeTab, onTabChange, children }: ShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-emerald-600" />
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">{HOSPITAL}</h1>
              <p className="text-xs text-slate-400 leading-tight">Control de Citas</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">{usuario.nombre}</p>
              <p className="text-xs text-slate-400">
                {usuario.rol === "recepcionista" ? "Recepcionista" : "Médico"}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-slate-500 hover:text-emerald-700 px-3 py-2 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}

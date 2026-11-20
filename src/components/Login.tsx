import { useState } from "react";
import { Usuario } from "../types";
import { USUARIOS } from "../data/seed";

const HOSPITAL = 'Hospital General "Dr. Armando Velasquez Mago"';

export function Login({ onLogin }: { onLogin: (u: Usuario) => void }) {
  const [seleccion, setSeleccion] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-2 h-2 rounded-full bg-emerald-600 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">{HOSPITAL}</h1>
          <p className="text-slate-500 mt-1">Control de Citas</p>
        </div>

        <div className="bg-white border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Acceso rápido</h2>
          <p className="text-xs text-slate-400 mb-4">
            Seleccione un usuario de prueba para entrar con un clic.
          </p>

          <div className="space-y-3">
            {USUARIOS.map((u) => {
              const activo = seleccion === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setSeleccion(u.id)}
                  className={`w-full p-4 border text-left transition-colors ${
                    activo
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  <p className="font-medium text-slate-800 text-sm">{u.nombre}</p>
                  <p className="text-xs text-slate-400">
                    {u.rol === "recepcionista" ? "Recepcionista" : "Médico"}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            disabled={!seleccion}
            onClick={() => {
              const u = USUARIOS.find((x) => x.id === seleccion);
              if (u) onLogin(u);
            }}
            className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium py-3 transition-colors"
          >
            Ingresar al sistema
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Todos los datos se guardan localmente en este navegador.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Usuario, Rol, Medico } from "../types";
import { MEDICOS_INICIALES } from "../data/seed";
import { useLocalStorage } from "../lib/storage";

const HOSPITAL = 'Hospital General "Dr. Armando Velasquez Mago"';

interface NuevoUsuario {
  nombre: string;
  rol: Rol;
  medicoId: string;
}

const FORMULARIO_VACIO: NuevoUsuario = {
  nombre: "",
  rol: "recepcionista",
  medicoId: "",
};

export function Login({ onLogin }: { onLogin: (u: Usuario) => void }) {
  const [usuarios, setUsuarios] = useLocalStorage<Usuario[]>("hsr_usuarios", []);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState<NuevoUsuario>(FORMULARIO_VACIO);
  const [error, setError] = useState("");

  const agregarUsuario = () => {
    if (!formulario.nombre.trim()) {
      setError("Ingrese el nombre completo del usuario.");
      return;
    }
    if (formulario.rol === "medico" && !formulario.medicoId) {
      setError("Seleccione el médico asociado al usuario.");
      return;
    }

    const usuario: Usuario = {
      id: `u${Date.now()}`,
      nombre: formulario.nombre.trim(),
      rol: formulario.rol,
      ...(formulario.rol === "medico" ? { medicoId: formulario.medicoId } : {}),
    };

    setUsuarios((actuales) => [...actuales, usuario]);
    setSeleccion(usuario.id);
    setFormulario(FORMULARIO_VACIO);
    setError("");
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Areas-internas-dle-hospital-de-sarare.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-950/65" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8 text-white">
          <div className="inline-block w-2 h-2 rounded-full bg-emerald-400 mb-4" />
          <h1 className="font-serif italic text-3xl font-semibold tracking-tight">{HOSPITAL}</h1>
          <p className="text-emerald-200 mt-2">Control de Citas</p>
        </div>

        <div className="bg-white border border-white/50 p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Acceso al sistema</h2>
              <p className="text-xs text-slate-400 mt-1">Seleccione un usuario para ingresar.</p>
            </div>
            <button
              onClick={() => {
                setMostrarFormulario((visible) => !visible);
                setError("");
              }}
              className="text-xs font-medium text-emerald-700 border border-emerald-600 px-3 py-2 hover:bg-emerald-50 whitespace-nowrap"
            >
              {mostrarFormulario ? "Cerrar" : "Agregar usuario"}
            </button>
          </div>

          {mostrarFormulario && (
            <div className="border border-slate-200 bg-slate-50 p-4 mb-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Nuevo usuario</h3>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Nombre completo</label>
                <input
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                  className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600"
                  placeholder="Ej. María Rodríguez"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Rol</label>
                <select
                  value={formulario.rol}
                  onChange={(e) => setFormulario({ ...formulario, rol: e.target.value as Rol, medicoId: "" })}
                  className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="recepcionista">Recepcionista</option>
                  <option value="medico">Médico</option>
                </select>
              </div>
              {formulario.rol === "medico" && (
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Médico asociado</label>
                  <select
                    value={formulario.medicoId}
                    onChange={(e) => setFormulario({ ...formulario, medicoId: e.target.value })}
                    className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="">Seleccione...</option>
                    {MEDICOS_INICIALES.map((medico: Medico) => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nombre} — {medico.especialidad}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {error && <p className="text-xs text-rose-700">{error}</p>}
              <button
                onClick={agregarUsuario}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5"
              >
                Guardar usuario
              </button>
            </div>
          )}

          {usuarios.length === 0 ? (
            <div className="border border-dashed border-slate-300 py-8 text-center">
              <p className="text-sm text-slate-500">No hay usuarios registrados.</p>
              <p className="text-xs text-slate-400 mt-1">Agregue un usuario para comenzar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {usuarios.map((u) => {
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
          )}

          <button
            disabled={!seleccion}
            onClick={() => {
              const usuario = usuarios.find((x) => x.id === seleccion);
              if (usuario) onLogin(usuario);
            }}
            className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium py-3 transition-colors"
          >
            Ingresar al sistema
          </button>
        </div>

        <p className="text-center text-xs text-white/70 mt-6">
          Todos los datos se guardan localmente en este navegador.
        </p>
      </div>
    </div>
  );
}

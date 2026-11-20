import { useState } from "react";
import { Usuario, Cita, Medico } from "../types";
import { CITAS_INICIALES, MEDICOS_INICIALES } from "../data/seed";
import { useLocalStorage } from "../lib/storage";
import { Shell } from "./Shell";
import { EstadoBadge } from "./Dashboard";

function hoyStr() {
  return new Date().toISOString().slice(0, 10);
}

export function MedicoPanel({ usuario, onLogout }: { usuario: Usuario; onLogout: () => void }) {
  const [citas, setCitas] = useLocalStorage<Cita[]>("hsr_citas", CITAS_INICIALES);
  const [medicos] = useLocalStorage<Medico[]>("hsr_medicos", MEDICOS_INICIALES);
  const [medicoSelId, setMedicoSelId] = useState(usuario.medicoId || "");
  const [notaCitaId, setNotaCitaId] = useState<string | null>(null);
  const [notaTexto, setNotaTexto] = useState("");

  const medicoActual = medicos.find((m) => m.id === medicoSelId);
  const hoy = hoyStr();
  const misCitas = citas.filter((c) => c.medicoId === medicoSelId && c.fecha === hoy);
  const enSala = misCitas.filter((c) => c.estado === "En Sala de Espera");
  const atendidas = misCitas.filter((c) => c.estado === "Atendida");

  const marcarAtendida = (id: string) =>
    setCitas((p) => p.map((c) => (c.id === id ? { ...c, estado: "Atendida" } : c)));

  const guardarNota = (id: string) => {
    setCitas((p) => p.map((c) => (c.id === id ? { ...c, notaMedica: notaTexto } : c)));
    setNotaCitaId(null);
    setNotaTexto("");
  };

  const tabs = [
    { id: "agenda", label: "Mi agenda del día" },
    { id: "sala", label: "Sala de espera" },
  ];
  const [tab, setTab] = useState("agenda");

  if (!medicoSelId) {
    return (
      <Shell usuario={usuario} onLogout={onLogout} tabs={[]} activeTab="" onTabChange={() => {}}>
        <div className="max-w-md mx-auto bg-white border border-slate-200 p-6 mt-10">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Seleccione su nombre</h2>
          <p className="text-sm text-slate-500 mb-4">Elija su perfil de médico para ver su agenda.</p>
          <select
            value={medicoSelId}
            onChange={(e) => setMedicoSelId(e.target.value)}
            className="w-full border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="">Seleccione...</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre} — {m.especialidad}
              </option>
            ))}
          </select>
        </div>
      </Shell>
    );
  }

  return (
    <Shell usuario={usuario} onLogout={onLogout} tabs={tabs} activeTab={tab} onTabChange={setTab}>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">{medicoActual?.nombre}</h2>
        <p className="text-sm text-emerald-600">
          {medicoActual?.especialidad} · Consultorio {medicoActual?.consultorio} ·{" "}
          {new Date().toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {tab === "agenda" && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <MiniCard label="Citas hoy" valor={misCitas.length} accent="text-emerald-700" />
            <MiniCard label="En sala de espera" valor={enSala.length} accent="text-amber-700" />
            <MiniCard label="Atendidas" valor={atendidas.length} accent="text-slate-800" />
          </div>

          <div className="bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Agenda de hoy</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {misCitas.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-slate-400">No tiene citas para hoy.</p>
              )}
              {misCitas
                .sort((a, b) => a.hora.localeCompare(b.hora))
                .map((c) => (
                  <div key={c.id} className="px-5 py-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-slate-700 w-14 text-sm">{c.hora}</span>
                    <div className="flex-1 min-w-[140px]">
                      <p className="font-medium text-slate-800">{c.pacienteNombre}</p>
                      <p className="text-xs text-slate-400">CI: {c.cedula}{c.motivo ? ` · ${c.motivo}` : ""}</p>
                      {c.notaMedica && (
                        <p className="text-xs text-slate-500 mt-1 italic">Nota: {c.notaMedica}</p>
                      )}
                    </div>
                    <EstadoBadge estado={c.estado} />
                    <div className="flex items-center gap-3 text-xs">
                      <button
                        onClick={() => {
                          setNotaCitaId(c.id);
                          setNotaTexto(c.notaMedica || "");
                        }}
                        className="text-slate-500 hover:text-emerald-600 hover:underline"
                      >
                        Nota
                      </button>
                      {c.estado !== "Atendida" && c.estado !== "Cancelada" && (
                        <button
                          onClick={() => marcarAtendida(c.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5"
                        >
                          Atendida
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {tab === "sala" && (
        <div className="space-y-5">
          <div className="bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              Pacientes esperando consulta. Marque "Atendida" cuando finalice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enSala.length === 0 && (
              <p className="col-span-full text-center text-sm text-slate-400 py-10">
                No hay pacientes en sala de espera.
              </p>
            )}
            {enSala.map((c) => (
              <div key={c.id} className="bg-white border border-amber-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-slate-500">{c.hora}</span>
                  <EstadoBadge estado={c.estado} />
                </div>
                <p className="font-semibold text-slate-800">{c.pacienteNombre}</p>
                <p className="text-xs text-slate-400">CI: {c.cedula}</p>
                {c.motivo && <p className="text-sm text-slate-600 mt-1">{c.motivo}</p>}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setNotaCitaId(c.id);
                      setNotaTexto(c.notaMedica || "");
                    }}
                    className="text-slate-500 text-xs font-medium px-3 py-1.5 border border-slate-200 hover:bg-slate-50"
                  >
                    Nota
                  </button>
                  <button
                    onClick={() => marcarAtendida(c.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 ml-auto"
                  >
                    Atendida
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notaCitaId && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Nota médica</h3>
            </div>
            <div className="p-5">
              <textarea
                value={notaTexto}
                onChange={(e) => setNotaTexto(e.target.value)}
                rows={5}
                placeholder="Escriba una nota breve tras la consulta..."
                className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setNotaCitaId(null);
                  setNotaTexto("");
                }}
                className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => guardarNota(notaCitaId)}
                className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              >
                Guardar nota
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function MiniCard({ label, valor, accent }: { label: string; valor: number; accent: string }) {
  return (
    <div className="bg-white border border-slate-200 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent}`}>{valor}</p>
    </div>
  );
}

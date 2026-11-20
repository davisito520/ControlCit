import { Cita, ESPECIALIDADES, Medico, EstadoCita } from "../types";

interface DashboardProps {
  citas: Cita[];
  medicos: Medico[];
  filtroEsp: string;
  setFiltroEsp: (v: string) => void;
  filtroMed: string;
  setFiltroMed: (v: string) => void;
}

function hoyStr() {
  return new Date().toISOString().slice(0, 10);
}

function Card({ label, valor, accent }: { label: string; valor: number; accent: string }) {
  return (
    <div className="bg-white border border-slate-200 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${accent}`}>{valor}</p>
    </div>
  );
}

export function Dashboard({
  citas,
  medicos,
  filtroEsp,
  setFiltroEsp,
  filtroMed,
  setFiltroMed,
}: DashboardProps) {
  const hoy = hoyStr();
  const citasHoy = citas.filter((c) => c.fecha === hoy);
  const filtradas = citasHoy.filter(
    (c) => (!filtroEsp || c.especialidad === filtroEsp) && (!filtroMed || c.medicoId === filtroMed)
  );

  const cuenta = (e: EstadoCita) => filtradas.filter((c) => c.estado === e).length;

  const medicosFiltrados = filtroEsp
    ? medicos.filter((m) => m.especialidad === filtroEsp)
    : medicos;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Panel principal</h2>
        <p className="text-sm text-slate-500">
          Resumen de citas de hoy{" "}
          {new Date().toLocaleDateString("es-BO", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <div className="bg-white border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <p className="text-slate-500 text-sm self-center">Filtros:</p>
        <div className="flex-1">
          <label className="block text-xs text-slate-400 mb-1">Especialidad</label>
          <select
            value={filtroEsp}
            onChange={(e) => {
              setFiltroEsp(e.target.value);
              setFiltroMed("");
            }}
            className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="">Todas</option>
            {ESPECIALIDADES.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-slate-400 mb-1">Médico</label>
          <select
            value={filtroMed}
            onChange={(e) => setFiltroMed(e.target.value)}
            className="w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="">Todos</option>
            {medicosFiltrados.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Citas para hoy" valor={filtradas.length} accent="text-emerald-700" />
        <Card label="En sala de espera" valor={cuenta("En Sala de Espera")} accent="text-amber-700" />
        <Card label="Atendidas" valor={cuenta("Atendida")} accent="text-slate-800" />
        <Card label="Canceladas" valor={cuenta("Cancelada")} accent="text-rose-700" />
      </div>

      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Citas de hoy</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {filtradas.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-400">
              No hay citas que coincidan con los filtros.
            </p>
          )}
          {filtradas
            .sort((a, b) => a.hora.localeCompare(b.hora))
            .map((c) => (
              <div key={c.id} className="px-5 py-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-slate-700 w-14">{c.hora}</span>
                <span className="font-medium text-slate-800 flex-1 min-w-[140px]">{c.pacienteNombre}</span>
                <span className="text-slate-500 hidden sm:inline">{c.especialidad}</span>
                <span className="text-slate-500 hidden md:inline">{c.medicoNombre}</span>
                <EstadoBadge estado={c.estado} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function EstadoBadge({ estado }: { estado: EstadoCita }) {
  const map: Record<EstadoCita, string> = {
    Programada: "bg-emerald-100 text-emerald-700",
    Confirmada: "bg-emerald-600 text-white",
    "En Sala de Espera": "bg-amber-100 text-amber-700",
    Atendida: "bg-slate-800 text-white",
    Cancelada: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-medium ${map[estado]}`}>{estado}</span>
  );
}

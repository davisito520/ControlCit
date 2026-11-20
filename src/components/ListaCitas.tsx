import { useState } from "react";
import { Cita, ESTADOS, EstadoCita, ESPECIALIDADES, Medico } from "../types";
import { EstadoBadge } from "./Dashboard";
import { Comprobante } from "./Comprobante";

interface Props {
  citas: Cita[];
  onCambiarEstado: (id: string, estado: EstadoCita) => void;
  onEliminar: (id: string) => void;
  onEditar: (c: Cita) => void;
}

export function ListaCitas({ citas, onCambiarEstado, onEliminar, onEditar }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEsp, setFiltroEsp] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [comprobante, setComprobante] = useState<Cita | null>(null);

  const filtradas = citas
    .filter((c) => {
      const match =
        c.pacienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.cedula.includes(busqueda) ||
        c.medicoNombre.toLowerCase().includes(busqueda.toLowerCase());
      return match && (!filtroEsp || c.especialidad === filtroEsp) && (!filtroEstado || c.estado === filtroEstado);
    })
    .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

  const field = "border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Citas agendadas</h2>
        <p className="text-sm text-slate-500">Gestione, cambie estado e imprima comprobantes.</p>
      </div>

      <div className="bg-white border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
        <input
          placeholder="Buscar por paciente, cédula o médico..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={`${field} flex-1`}
        />
        <select value={filtroEsp} onChange={(e) => setFiltroEsp(e.target.value)} className={field}>
          <option value="">Todas las especialidades</option>
          {ESPECIALIDADES.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className={field}>
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Especialidad</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Médico</th>
                <th className="px-4 py-3 font-medium">Fecha / Hora</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No se encontraron citas.
                  </td>
                </tr>
              )}
              {filtradas.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{c.pacienteNombre}</p>
                    <p className="text-xs text-slate-400">CI: {c.cedula}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{c.especialidad}</td>
                  <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{c.medicoNombre}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(c.fecha + "T00:00:00").toLocaleDateString("es-BO", { day: "2-digit", month: "2-digit" })} · {c.hora}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.estado}
                      onChange={(e) => onCambiarEstado(c.id, e.target.value as EstadoCita)}
                      className="text-xs border border-slate-200 px-2 py-1 bg-white focus:outline-none focus:border-emerald-600"
                    >
                      {ESTADOS.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    <div className="mt-1">
                      <EstadoBadge estado={c.estado} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <button onClick={() => setComprobante(c)} className="text-emerald-600 hover:underline">
                        Comprobante
                      </button>
                      <button onClick={() => onEditar(c)} className="text-slate-600 hover:underline">
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("¿Eliminar definitivamente esta cita?")) onEliminar(c.id);
                        }}
                        className="text-rose-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {comprobante && <Comprobante cita={comprobante} onClose={() => setComprobante(null)} />}
    </div>
  );
}

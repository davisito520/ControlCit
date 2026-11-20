import { useState } from "react";
import { ESPECIALIDADES, DIAS_SEMANA, Medico } from "../types";

interface Props {
  medicos: Medico[];
  onGuardar: (m: Medico) => void;
}

export function DirectorioMedicos({ medicos, onGuardar }: Props) {
  const [editando, setEditando] = useState<Medico | null>(null);
  const [nuevo, setNuevo] = useState(false);

  const vacio: Medico = {
    id: "",
    nombre: "",
    especialidad: ESPECIALIDADES[0],
    diasConsulta: [],
    consultorio: "",
  };

  const actual = editando || (nuevo ? vacio : null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Directorio de médicos</h2>
          <p className="text-sm text-slate-500">Agregue o edite médicos, especialidad, días y consultorio.</p>
        </div>
        <button
          onClick={() => {
            setNuevo(true);
            setEditando(null);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 text-sm"
        >
          Nuevo médico
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicos.map((m) => (
          <div key={m.id} className="bg-white border border-slate-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-800">{m.nombre}</p>
                <p className="text-sm text-emerald-600">{m.especialidad}</p>
              </div>
              <button
                onClick={() => {
                  setEditando(m);
                  setNuevo(false);
                }}
                className="text-xs text-slate-400 hover:text-emerald-600"
              >
                Editar
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-500 space-y-1">
              <p>Consultorio: <span className="font-medium text-slate-700">{m.consultorio}</span></p>
              <p>Días: <span className="font-medium text-slate-700">{m.diasConsulta.join(", ") || "—"}</span></p>
            </div>
          </div>
        ))}
      </div>

      {actual && (
        <ModalMedico
          medico={actual}
          onClose={() => {
            setEditando(null);
            setNuevo(false);
          }}
          onGuardar={(m) => {
            onGuardar(m);
            setEditando(null);
            setNuevo(false);
          }}
        />
      )}
    </div>
  );
}

function ModalMedico({
  medico,
  onClose,
  onGuardar,
}: {
  medico: Medico;
  onClose: () => void;
  onGuardar: (m: Medico) => void;
}) {
  const [form, setForm] = useState<Medico>({
    ...medico,
    id: medico.id || `m${Date.now()}`,
  });

  const toggleDia = (d: string) => {
    setForm((p) => ({
      ...p,
      diasConsulta: p.diasConsulta.includes(d)
        ? p.diasConsulta.filter((x) => x !== d)
        : [...p.diasConsulta, d],
    }));
  };

  const field = "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600";

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            {medico.id ? "Editar médico" : "Nuevo médico"}
          </h3>
          <button onClick={onClose} className="text-sm text-slate-400 hover:text-slate-700">
            Cerrar
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Nombre completo</label>
            <input className={field} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Especialidad</label>
            <select className={field} value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })}>
              {ESPECIALIDADES.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Consultorio</label>
            <input className={field} value={form.consultorio} onChange={(e) => setForm({ ...form, consultorio: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Días de consulta</label>
            <div className="flex flex-wrap gap-2">
              {DIAS_SEMANA.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDia(d)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                    form.diasConsulta.includes(d)
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100">
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!form.nombre || !form.consultorio) {
                alert("Complete nombre y consultorio.");
                return;
              }
              onGuardar(form);
            }}
            className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

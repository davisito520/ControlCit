import { useState } from "react";
import { Cita, ESPECIALIDADES, Medico } from "../types";

interface Props {
  citas: Cita[];
  medicos: Medico[];
  onCrear: (c: Cita) => void;
}

function hoyStr() {
  return new Date().toISOString().slice(0, 10);
}

const HORAS: string[] = (() => {
  const arr: string[] = [];
  for (let h = 8; h < 17; h++) {
    arr.push(`${String(h).padStart(2, "0")}:00`);
    arr.push(`${String(h).padStart(2, "0")}:30`);
  }
  return arr;
})();

export function AgendarCita({ citas, medicos, onCrear }: Props) {
  const [form, setForm] = useState({
    pacienteNombre: "",
    cedula: "",
    edad: "",
    telefono: "",
    motivo: "",
    especialidad: "",
    medicoId: "",
    fecha: hoyStr(),
    hora: "",
    consultorio: "",
  });
  const [error, setError] = useState<string | null>(null);

  const medicosEsp = medicos.filter((m) => m.especialidad === form.especialidad);
  const medicoSel = medicos.find((m) => m.id === form.medicoId);

  const set = (k: string, v: string) => {
    setForm((p) => ({
      ...p,
      [k]: v,
      ...(k === "especialidad" ? { medicoId: "", consultorio: "" } : {}),
      ...(k === "medicoId" ? { consultorio: medicos.find((m) => m.id === v)?.consultorio || "" } : {}),
    }));
  };

  const submit = () => {
    if (!form.pacienteNombre || !form.cedula || !form.especialidad || !form.medicoId || !form.fecha || !form.hora) {
      setError("Complete los campos obligatorios: nombre, cédula, especialidad, médico, fecha y hora.");
      return;
    }
    const conflicto = citas.find(
      (c) =>
        c.medicoId === form.medicoId &&
        c.fecha === form.fecha &&
        c.hora === form.hora &&
        c.estado !== "Cancelada"
    );
    if (conflicto) {
      setError("Ya existe una cita activa para este médico en la fecha y hora seleccionadas. Elija otro bloque.");
      return;
    }
    const medico = medicos.find((m) => m.id === form.medicoId)!;
    const nueva: Cita = {
      id: `c${Date.now()}`,
      ...form,
      medicoNombre: medico.nombre,
      consultorio: form.consultorio || medico.consultorio,
      estado: "Programada",
      createdAt: new Date().toISOString(),
    };
    onCrear(nueva);
    setError(null);
    setForm({
      pacienteNombre: "",
      cedula: "",
      edad: "",
      telefono: "",
      motivo: "",
      especialidad: "",
      medicoId: "",
      fecha: hoyStr(),
      hora: "",
      consultorio: "",
    });
    alert("Cita agendada correctamente. Puede imprimir el comprobante desde la lista de citas.");
  };

  const field = "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Agendar nueva cita</h2>
        <p className="text-sm text-slate-500">Registre los datos del paciente y de la consulta.</p>
      </div>

      <div className="bg-white border border-slate-200 p-5 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Datos del paciente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Nombre completo *</label>
              <input className={field} value={form.pacienteNombre} onChange={(e) => set("pacienteNombre", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Cédula de identidad *</label>
              <input className={field} value={form.cedula} onChange={(e) => set("cedula", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Edad</label>
              <input className={field} value={form.edad} onChange={(e) => set("edad", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Teléfono</label>
              <input className={field} value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Motivo breve de consulta</label>
              <input className={field} value={form.motivo} onChange={(e) => set("motivo", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Datos de la cita</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Especialidad *</label>
              <select className={field} value={form.especialidad} onChange={(e) => set("especialidad", e.target.value)}>
                <option value="">Seleccione...</option>
                {ESPECIALIDADES.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Médico asignado *</label>
              <select className={field} value={form.medicoId} onChange={(e) => set("medicoId", e.target.value)} disabled={!form.especialidad}>
                <option value="">Seleccione...</option>
                {medicosEsp.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre} — Cons. {m.consultorio}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Fecha *</label>
              <input type="date" className={field} value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Hora (bloques de 30 min) *</label>
              <select className={field} value={form.hora} onChange={(e) => set("hora", e.target.value)}>
                <option value="">Seleccione...</option>
                {HORAS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Consultorio</label>
              <input className={field} value={form.consultorio} onChange={(e) => set("consultorio", e.target.value)} placeholder={medicoSel ? `Default: ${medicoSel.consultorio}` : ""} />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 p-3">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={submit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 transition-colors"
          >
            Agendar cita
          </button>
        </div>
      </div>
    </div>
  );
}

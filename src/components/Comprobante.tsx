import { Cita } from "../types";

const HOSPITAL = 'Hospital General "Dr. Armando Velasquez Mago"';

export function Comprobante({ cita, onClose }: { cita: Cita; onClose: () => void }) {
  const fechaFmt = new Date(cita.fecha + "T00:00:00").toLocaleDateString("es-BO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 print:bg-white print:p-0">
      <div className="bg-white max-w-sm w-full print:max-w-none">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 print:hidden">
          <h3 className="font-semibold text-slate-800">Comprobante de cita</h3>
          <button onClick={onClose} className="text-sm text-slate-400 hover:text-slate-700">
            Cerrar
          </button>
        </div>

        <div className="p-6 font-mono text-sm text-slate-800">
          <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 mb-4">
            <p className="font-bold text-base">{HOSPITAL}</p>
            <p className="text-xs text-slate-500">Comprobante de Cita Médica</p>
            <p className="text-xs text-slate-400 mt-1">N° {cita.id.slice(-6).toUpperCase()}</p>
          </div>

          <div className="space-y-1.5">
            <Line label="Paciente" value={cita.pacienteNombre} />
            <Line label="Cédula" value={cita.cedula} />
            {cita.edad && <Line label="Edad" value={`${cita.edad} años`} />}
            {cita.telefono && <Line label="Teléfono" value={cita.telefono} />}
            {cita.motivo && <Line label="Motivo" value={cita.motivo} />}
          </div>

          <div className="border-t border-dashed border-slate-300 my-4" />

          <div className="space-y-1.5">
            <Line label="Especialidad" value={cita.especialidad} />
            <Line label="Médico" value={cita.medicoNombre} />
            <Line label="Consultorio" value={cita.consultorio} />
            <Line label="Fecha" value={fechaFmt} />
            <Line label="Hora" value={cita.hora} />
            <Line label="Estado" value={cita.estado} />
          </div>

          <div className="border-t border-dashed border-slate-300 my-4" />
          <p className="text-center text-xs text-slate-400">
            Presente este comprobante en recepción el día de su cita.
            <br />¡Gracias por su confianza!
          </p>
        </div>

        <div className="p-4 border-t border-slate-200 print:hidden">
          <button
            onClick={() => window.print()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
          >
            Imprimir / Guardar como PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-500">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

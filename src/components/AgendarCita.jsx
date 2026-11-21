import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ESPECIALIDADES } from "../types";
function hoyStr() {
    return new Date().toISOString().slice(0, 10);
}
const HORAS = (() => {
    const arr = [];
    for (let h = 8; h < 17; h++) {
        arr.push(`${String(h).padStart(2, "0")}:00`);
        arr.push(`${String(h).padStart(2, "0")}:30`);
    }
    return arr;
})();
export function AgendarCita({ citas, medicos, onCrear }) {
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
    const [error, setError] = useState(null);
    const medicosEsp = medicos.filter((m) => m.especialidad === form.especialidad);
    const medicoSel = medicos.find((m) => m.id === form.medicoId);
    const set = (k, v) => {
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
        const conflicto = citas.find((c) => c.medicoId === form.medicoId &&
            c.fecha === form.fecha &&
            c.hora === form.hora &&
            c.estado !== "Cancelada");
        if (conflicto) {
            setError("Ya existe una cita activa para este médico en la fecha y hora seleccionadas. Elija otro bloque.");
            return;
        }
        const medico = medicos.find((m) => m.id === form.medicoId);
        const nueva = {
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
    return (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Agendar nueva cita" }), _jsx("p", { className: "text-sm text-slate-500", children: "Registre los datos del paciente y de la consulta." })] }), _jsxs("div", { className: "bg-white border border-slate-200 p-5 space-y-5", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-700 mb-3", children: "Datos del paciente" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Nombre completo *" }), _jsx("input", { className: field, value: form.pacienteNombre, onChange: (e) => set("pacienteNombre", e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "C\u00E9dula de identidad *" }), _jsx("input", { className: field, value: form.cedula, onChange: (e) => set("cedula", e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Edad" }), _jsx("input", { className: field, value: form.edad, onChange: (e) => set("edad", e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Tel\u00E9fono" }), _jsx("input", { className: field, value: form.telefono, onChange: (e) => set("telefono", e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Motivo breve de consulta" }), _jsx("input", { className: field, value: form.motivo, onChange: (e) => set("motivo", e.target.value) })] })] })] }), _jsxs("div", { className: "border-t border-slate-200 pt-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-700 mb-3", children: "Datos de la cita" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Especialidad *" }), _jsxs("select", { className: field, value: form.especialidad, onChange: (e) => set("especialidad", e.target.value), children: [_jsx("option", { value: "", children: "Seleccione..." }), ESPECIALIDADES.map((e) => (_jsx("option", { value: e, children: e }, e)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "M\u00E9dico asignado *" }), _jsxs("select", { className: field, value: form.medicoId, onChange: (e) => set("medicoId", e.target.value), disabled: !form.especialidad, children: [_jsx("option", { value: "", children: "Seleccione..." }), medicosEsp.map((m) => (_jsxs("option", { value: m.id, children: [m.nombre, " \u2014 Cons. ", m.consultorio] }, m.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Fecha *" }), _jsx("input", { type: "date", className: field, value: form.fecha, onChange: (e) => set("fecha", e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Hora (bloques de 30 min) *" }), _jsxs("select", { className: field, value: form.hora, onChange: (e) => set("hora", e.target.value), children: [_jsx("option", { value: "", children: "Seleccione..." }), HORAS.map((h) => (_jsx("option", { value: h, children: h }, h)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Consultorio" }), _jsx("input", { className: field, value: form.consultorio, onChange: (e) => set("consultorio", e.target.value), placeholder: medicoSel ? `Default: ${medicoSel.consultorio}` : "" })] })] })] }), error && (_jsx("div", { className: "text-sm text-rose-700 bg-rose-50 border border-rose-200 p-3", children: error })), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: submit, className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 transition-colors", children: "Agendar cita" }) })] })] }));
}

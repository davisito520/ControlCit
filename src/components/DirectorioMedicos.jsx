import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ESPECIALIDADES, DIAS_SEMANA } from "../types";
export function DirectorioMedicos({ medicos, onGuardar }) {
    const [editando, setEditando] = useState(null);
    const [nuevo, setNuevo] = useState(false);
    const vacio = {
        id: "",
        nombre: "",
        especialidad: ESPECIALIDADES[0],
        diasConsulta: [],
        consultorio: "",
    };
    const actual = editando || (nuevo ? vacio : null);
    return (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Directorio de m\u00E9dicos" }), _jsx("p", { className: "text-sm text-slate-500", children: "Agregue o edite m\u00E9dicos, especialidad, d\u00EDas y consultorio." })] }), _jsx("button", { onClick: () => {
                            setNuevo(true);
                            setEditando(null);
                        }, className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 text-sm", children: "Nuevo m\u00E9dico" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: medicos.map((m) => (_jsxs("div", { className: "bg-white border border-slate-200 p-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-800", children: m.nombre }), _jsx("p", { className: "text-sm text-emerald-600", children: m.especialidad })] }), _jsx("button", { onClick: () => {
                                        setEditando(m);
                                        setNuevo(false);
                                    }, className: "text-xs text-slate-400 hover:text-emerald-600", children: "Editar" })] }), _jsxs("div", { className: "mt-3 text-xs text-slate-500 space-y-1", children: [_jsxs("p", { children: ["Consultorio: ", _jsx("span", { className: "font-medium text-slate-700", children: m.consultorio })] }), _jsxs("p", { children: ["D\u00EDas: ", _jsx("span", { className: "font-medium text-slate-700", children: m.diasConsulta.join(", ") || "—" })] })] })] }, m.id))) }), actual && (_jsx(ModalMedico, { medico: actual, onClose: () => {
                    setEditando(null);
                    setNuevo(false);
                }, onGuardar: (m) => {
                    onGuardar(m);
                    setEditando(null);
                    setNuevo(false);
                } }))] }));
}
function ModalMedico({ medico, onClose, onGuardar, }) {
    const [form, setForm] = useState({
        ...medico,
        id: medico.id || `m${Date.now()}`,
    });
    const toggleDia = (d) => {
        setForm((p) => ({
            ...p,
            diasConsulta: p.diasConsulta.includes(d)
                ? p.diasConsulta.filter((x) => x !== d)
                : [...p.diasConsulta, d],
        }));
    };
    const field = "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600";
    return (_jsx("div", { className: "fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-200", children: [_jsx("h3", { className: "font-semibold text-slate-800", children: medico.id ? "Editar médico" : "Nuevo médico" }), _jsx("button", { onClick: onClose, className: "text-sm text-slate-400 hover:text-slate-700", children: "Cerrar" })] }), _jsxs("div", { className: "p-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Nombre completo" }), _jsx("input", { className: field, value: form.nombre, onChange: (e) => setForm({ ...form, nombre: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Especialidad" }), _jsx("select", { className: field, value: form.especialidad, onChange: (e) => setForm({ ...form, especialidad: e.target.value }), children: ESPECIALIDADES.map((e) => (_jsx("option", { value: e, children: e }, e))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Consultorio" }), _jsx("input", { className: field, value: form.consultorio, onChange: (e) => setForm({ ...form, consultorio: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "D\u00EDas de consulta" }), _jsx("div", { className: "flex flex-wrap gap-2", children: DIAS_SEMANA.map((d) => (_jsx("button", { onClick: () => toggleDia(d), className: `px-3 py-1.5 text-xs font-medium border transition-colors ${form.diasConsulta.includes(d)
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"}`, children: d }, d))) })] })] }), _jsxs("div", { className: "p-4 border-t border-slate-200 flex justify-end gap-2", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm text-slate-500 hover:bg-slate-100", children: "Cancelar" }), _jsx("button", { onClick: () => {
                                if (!form.nombre || !form.consultorio) {
                                    alert("Complete nombre y consultorio.");
                                    return;
                                }
                                onGuardar(form);
                            }, className: "px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium", children: "Guardar" })] })] }) }));
}

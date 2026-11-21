import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CITAS_INICIALES, MEDICOS_INICIALES } from "../data/seed";
import { useLocalStorage } from "../lib/storage";
import { Shell } from "./Shell";
import { EstadoBadge } from "./Dashboard";
function hoyStr() {
    return new Date().toISOString().slice(0, 10);
}
export function MedicoPanel({ usuario, onLogout }) {
    const [citas, setCitas] = useLocalStorage("hsr_citas", CITAS_INICIALES);
    const [medicos] = useLocalStorage("hsr_medicos", MEDICOS_INICIALES);
    const [medicoSelId, setMedicoSelId] = useState(usuario.medicoId || "");
    const [notaCitaId, setNotaCitaId] = useState(null);
    const [notaTexto, setNotaTexto] = useState("");
    const medicoActual = medicos.find((m) => m.id === medicoSelId);
    const hoy = hoyStr();
    const misCitas = citas.filter((c) => c.medicoId === medicoSelId && c.fecha === hoy);
    const enSala = misCitas.filter((c) => c.estado === "En Sala de Espera");
    const atendidas = misCitas.filter((c) => c.estado === "Atendida");
    const marcarAtendida = (id) => setCitas((p) => p.map((c) => (c.id === id ? { ...c, estado: "Atendida" } : c)));
    const guardarNota = (id) => {
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
        return (_jsx(Shell, { usuario: usuario, onLogout: onLogout, tabs: [], activeTab: "", onTabChange: () => { }, children: _jsxs("div", { className: "max-w-md mx-auto bg-white border border-slate-200 p-6 mt-10", children: [_jsx("h2", { className: "text-xl font-bold text-slate-800 mb-2", children: "Seleccione su nombre" }), _jsx("p", { className: "text-sm text-slate-500 mb-4", children: "Elija su perfil de m\u00E9dico para ver su agenda." }), _jsxs("select", { value: medicoSelId, onChange: (e) => setMedicoSelId(e.target.value), className: "w-full border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-emerald-600", children: [_jsx("option", { value: "", children: "Seleccione..." }), medicos.map((m) => (_jsxs("option", { value: m.id, children: [m.nombre, " \u2014 ", m.especialidad] }, m.id)))] })] }) }));
    }
    return (_jsxs(Shell, { usuario: usuario, onLogout: onLogout, tabs: tabs, activeTab: tab, onTabChange: setTab, children: [_jsxs("div", { className: "mb-5", children: [_jsx("h2", { className: "text-xl font-bold text-slate-800", children: medicoActual?.nombre }), _jsxs("p", { className: "text-sm text-emerald-600", children: [medicoActual?.especialidad, " \u00B7 Consultorio ", medicoActual?.consultorio, " \u00B7", " ", new Date().toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long" })] })] }), tab === "agenda" && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(MiniCard, { label: "Citas hoy", valor: misCitas.length, accent: "text-emerald-700" }), _jsx(MiniCard, { label: "En sala de espera", valor: enSala.length, accent: "text-amber-700" }), _jsx(MiniCard, { label: "Atendidas", valor: atendidas.length, accent: "text-slate-800" })] }), _jsxs("div", { className: "bg-white border border-slate-200 overflow-hidden", children: [_jsx("div", { className: "px-5 py-4 border-b border-slate-200", children: _jsx("h3", { className: "font-semibold text-slate-800", children: "Agenda de hoy" }) }), _jsxs("div", { className: "divide-y divide-slate-100", children: [misCitas.length === 0 && (_jsx("p", { className: "px-5 py-8 text-center text-sm text-slate-400", children: "No tiene citas para hoy." })), misCitas
                                        .sort((a, b) => a.hora.localeCompare(b.hora))
                                        .map((c) => (_jsxs("div", { className: "px-5 py-4 flex flex-wrap items-center gap-3", children: [_jsx("span", { className: "font-mono text-slate-700 w-14 text-sm", children: c.hora }), _jsxs("div", { className: "flex-1 min-w-[140px]", children: [_jsx("p", { className: "font-medium text-slate-800", children: c.pacienteNombre }), _jsxs("p", { className: "text-xs text-slate-400", children: ["CI: ", c.cedula, c.motivo ? ` · ${c.motivo}` : ""] }), c.notaMedica && (_jsxs("p", { className: "text-xs text-slate-500 mt-1 italic", children: ["Nota: ", c.notaMedica] }))] }), _jsx(EstadoBadge, { estado: c.estado }), _jsxs("div", { className: "flex items-center gap-3 text-xs", children: [_jsx("button", { onClick: () => {
                                                            setNotaCitaId(c.id);
                                                            setNotaTexto(c.notaMedica || "");
                                                        }, className: "text-slate-500 hover:text-emerald-600 hover:underline", children: "Nota" }), c.estado !== "Atendida" && c.estado !== "Cancelada" && (_jsx("button", { onClick: () => marcarAtendida(c.id), className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5", children: "Atendida" }))] })] }, c.id)))] })] })] })), tab === "sala" && (_jsxs("div", { className: "space-y-5", children: [_jsx("div", { className: "bg-amber-50 border border-amber-200 p-4", children: _jsx("p", { className: "text-sm text-amber-800", children: "Pacientes esperando consulta. Marque \"Atendida\" cuando finalice." }) }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [enSala.length === 0 && (_jsx("p", { className: "col-span-full text-center text-sm text-slate-400 py-10", children: "No hay pacientes en sala de espera." })), enSala.map((c) => (_jsxs("div", { className: "bg-white border border-amber-200 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-mono text-sm text-slate-500", children: c.hora }), _jsx(EstadoBadge, { estado: c.estado })] }), _jsx("p", { className: "font-semibold text-slate-800", children: c.pacienteNombre }), _jsxs("p", { className: "text-xs text-slate-400", children: ["CI: ", c.cedula] }), c.motivo && _jsx("p", { className: "text-sm text-slate-600 mt-1", children: c.motivo }), _jsxs("div", { className: "flex gap-2 mt-3", children: [_jsx("button", { onClick: () => {
                                                    setNotaCitaId(c.id);
                                                    setNotaTexto(c.notaMedica || "");
                                                }, className: "text-slate-500 text-xs font-medium px-3 py-1.5 border border-slate-200 hover:bg-slate-50", children: "Nota" }), _jsx("button", { onClick: () => marcarAtendida(c.id), className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 ml-auto", children: "Atendida" })] })] }, c.id)))] })] })), notaCitaId && (_jsx("div", { className: "fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white max-w-md w-full", children: [_jsx("div", { className: "p-4 border-b border-slate-200", children: _jsx("h3", { className: "font-semibold text-slate-800", children: "Nota m\u00E9dica" }) }), _jsx("div", { className: "p-5", children: _jsx("textarea", { value: notaTexto, onChange: (e) => setNotaTexto(e.target.value), rows: 5, placeholder: "Escriba una nota breve tras la consulta...", className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600 resize-none" }) }), _jsxs("div", { className: "p-4 border-t border-slate-200 flex justify-end gap-2", children: [_jsx("button", { onClick: () => {
                                        setNotaCitaId(null);
                                        setNotaTexto("");
                                    }, className: "px-4 py-2 text-sm text-slate-500 hover:bg-slate-100", children: "Cancelar" }), _jsx("button", { onClick: () => guardarNota(notaCitaId), className: "px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium", children: "Guardar nota" })] })] }) }))] }));
}
function MiniCard({ label, valor, accent }) {
    return (_jsxs("div", { className: "bg-white border border-slate-200 p-4", children: [_jsx("p", { className: "text-xs text-slate-500", children: label }), _jsx("p", { className: `text-2xl font-bold mt-1 ${accent}`, children: valor })] }));
}

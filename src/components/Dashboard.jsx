import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ESPECIALIDADES } from "../types";
function hoyStr() {
    return new Date().toISOString().slice(0, 10);
}
function Card({ label, valor, accent }) {
    return (_jsxs("div", { className: "bg-white border border-slate-200 p-5", children: [_jsx("p", { className: "text-sm text-slate-500", children: label }), _jsx("p", { className: `text-3xl font-bold mt-1 ${accent}`, children: valor })] }));
}
export function Dashboard({ citas, medicos, filtroEsp, setFiltroEsp, filtroMed, setFiltroMed, }) {
    const hoy = hoyStr();
    const citasHoy = citas.filter((c) => c.fecha === hoy);
    const filtradas = citasHoy.filter((c) => (!filtroEsp || c.especialidad === filtroEsp) && (!filtroMed || c.medicoId === filtroMed));
    const cuenta = (e) => filtradas.filter((c) => c.estado === e).length;
    const medicosFiltrados = filtroEsp
        ? medicos.filter((m) => m.especialidad === filtroEsp)
        : medicos;
    return (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Panel principal" }), _jsxs("p", { className: "text-sm text-slate-500", children: ["Resumen de citas de hoy", " ", new Date().toLocaleDateString("es-BO", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })] })] }), _jsxs("div", { className: "bg-white border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end", children: [_jsx("p", { className: "text-slate-500 text-sm self-center", children: "Filtros:" }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Especialidad" }), _jsxs("select", { value: filtroEsp, onChange: (e) => {
                                    setFiltroEsp(e.target.value);
                                    setFiltroMed("");
                                }, className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600", children: [_jsx("option", { value: "", children: "Todas" }), ESPECIALIDADES.map((e) => (_jsx("option", { value: e, children: e }, e)))] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "M\u00E9dico" }), _jsxs("select", { value: filtroMed, onChange: (e) => setFiltroMed(e.target.value), className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600", children: [_jsx("option", { value: "", children: "Todos" }), medicosFiltrados.map((m) => (_jsx("option", { value: m.id, children: m.nombre }, m.id)))] })] })] }), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(Card, { label: "Citas para hoy", valor: filtradas.length, accent: "text-emerald-700" }), _jsx(Card, { label: "En sala de espera", valor: cuenta("En Sala de Espera"), accent: "text-amber-700" }), _jsx(Card, { label: "Atendidas", valor: cuenta("Atendida"), accent: "text-slate-800" }), _jsx(Card, { label: "Canceladas", valor: cuenta("Cancelada"), accent: "text-rose-700" })] }), _jsxs("div", { className: "bg-white border border-slate-200 overflow-hidden", children: [_jsx("div", { className: "px-5 py-4 border-b border-slate-200", children: _jsx("h3", { className: "font-semibold text-slate-800", children: "Citas de hoy" }) }), _jsxs("div", { className: "divide-y divide-slate-100", children: [filtradas.length === 0 && (_jsx("p", { className: "px-5 py-8 text-center text-sm text-slate-400", children: "No hay citas que coincidan con los filtros." })), filtradas
                                .sort((a, b) => a.hora.localeCompare(b.hora))
                                .map((c) => (_jsxs("div", { className: "px-5 py-3 flex flex-wrap items-center gap-3 text-sm", children: [_jsx("span", { className: "font-mono text-slate-700 w-14", children: c.hora }), _jsx("span", { className: "font-medium text-slate-800 flex-1 min-w-[140px]", children: c.pacienteNombre }), _jsx("span", { className: "text-slate-500 hidden sm:inline", children: c.especialidad }), _jsx("span", { className: "text-slate-500 hidden md:inline", children: c.medicoNombre }), _jsx(EstadoBadge, { estado: c.estado })] }, c.id)))] })] })] }));
}
export function EstadoBadge({ estado }) {
    const map = {
        Programada: "bg-emerald-100 text-emerald-700",
        Confirmada: "bg-emerald-600 text-white",
        "En Sala de Espera": "bg-amber-100 text-amber-700",
        Atendida: "bg-slate-800 text-white",
        Cancelada: "bg-rose-100 text-rose-700",
    };
    return (_jsx("span", { className: `px-2.5 py-1 text-xs font-medium ${map[estado]}`, children: estado }));
}

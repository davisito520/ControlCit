import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MEDICOS_INICIALES } from "../data/seed";
import { useLocalStorage } from "../lib/storage";
const HOSPITAL = 'Hospital General "Dr. Armando Velasquez Mago"';
const FORMULARIO_VACIO = {
    nombre: "",
    rol: "recepcionista",
    medicoId: "",
};
export function Login({ onLogin }) {
    const [usuarios, setUsuarios] = useLocalStorage("hsr_usuarios", []);
    const [seleccion, setSeleccion] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
    const [error, setError] = useState("");
    const agregarUsuario = () => {
        if (!formulario.nombre.trim()) {
            setError("Ingrese el nombre completo del usuario.");
            return;
        }
        if (formulario.rol === "medico" && !formulario.medicoId) {
            setError("Seleccione el médico asociado al usuario.");
            return;
        }
        const usuario = {
            id: `u${Date.now()}`,
            nombre: formulario.nombre.trim(),
            rol: formulario.rol,
            ...(formulario.rol === "medico" ? { medicoId: formulario.medicoId } : {}),
        };
        setUsuarios((actuales) => [...actuales, usuario]);
        setSeleccion(usuario.id);
        setFormulario(FORMULARIO_VACIO);
        setError("");
        setMostrarFormulario(false);
    };
    return (_jsxs("div", { className: "min-h-screen relative flex items-center justify-center p-4 bg-slate-900", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center", style: { backgroundImage: "url('/images/Areas-internas-dle-hospital-de-sarare.jpg')" } }), _jsx("div", { className: "absolute inset-0 bg-slate-950/65" }), _jsxs("div", { className: "relative w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8 text-white", children: [_jsx("div", { className: "inline-block w-2 h-2 rounded-full bg-emerald-400 mb-4" }), _jsx("h1", { className: "font-serif italic text-3xl font-semibold tracking-tight", children: HOSPITAL }), _jsx("p", { className: "text-emerald-200 mt-2", children: "Control de Citas" })] }), _jsxs("div", { className: "bg-white border border-white/50 p-6", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-slate-800", children: "Acceso al sistema" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Seleccione un usuario para ingresar." })] }), _jsx("button", { onClick: () => {
                                            setMostrarFormulario((visible) => !visible);
                                            setError("");
                                        }, className: "text-xs font-medium text-emerald-700 border border-emerald-600 px-3 py-2 hover:bg-emerald-50 whitespace-nowrap", children: mostrarFormulario ? "Cerrar" : "Agregar usuario" })] }), mostrarFormulario && (_jsxs("div", { className: "border border-slate-200 bg-slate-50 p-4 mb-4 space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-700", children: "Nuevo usuario" }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Nombre completo" }), _jsx("input", { value: formulario.nombre, onChange: (e) => setFormulario({ ...formulario, nombre: e.target.value }), className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600", placeholder: "Ej. Mar\u00EDa Rodr\u00EDguez" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "Rol" }), _jsxs("select", { value: formulario.rol, onChange: (e) => setFormulario({ ...formulario, rol: e.target.value, medicoId: "" }), className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600", children: [_jsx("option", { value: "recepcionista", children: "Recepcionista" }), _jsx("option", { value: "medico", children: "M\u00E9dico" })] })] }), formulario.rol === "medico" && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-500 mb-1", children: "M\u00E9dico asociado" }), _jsxs("select", { value: formulario.medicoId, onChange: (e) => setFormulario({ ...formulario, medicoId: e.target.value }), className: "w-full border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-emerald-600", children: [_jsx("option", { value: "", children: "Seleccione..." }), MEDICOS_INICIALES.map((medico) => (_jsxs("option", { value: medico.id, children: [medico.nombre, " \u2014 ", medico.especialidad] }, medico.id)))] })] })), error && _jsx("p", { className: "text-xs text-rose-700", children: error }), _jsx("button", { onClick: agregarUsuario, className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5", children: "Guardar usuario" })] })), usuarios.length === 0 ? (_jsxs("div", { className: "border border-dashed border-slate-300 py-8 text-center", children: [_jsx("p", { className: "text-sm text-slate-500", children: "No hay usuarios registrados." }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Agregue un usuario para comenzar." })] })) : (_jsx("div", { className: "space-y-3", children: usuarios.map((u) => {
                                    const activo = seleccion === u.id;
                                    return (_jsxs("button", { onClick: () => setSeleccion(u.id), className: `w-full p-4 border text-left transition-colors ${activo
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-slate-200 hover:border-emerald-400"}`, children: [_jsx("p", { className: "font-medium text-slate-800 text-sm", children: u.nombre }), _jsx("p", { className: "text-xs text-slate-400", children: u.rol === "recepcionista" ? "Recepcionista" : "Médico" })] }, u.id));
                                }) })), _jsx("button", { disabled: !seleccion, onClick: () => {
                                    const usuario = usuarios.find((x) => x.id === seleccion);
                                    if (usuario)
                                        onLogin(usuario);
                                }, className: "mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium py-3 transition-colors", children: "Ingresar al sistema" })] }), _jsx("p", { className: "text-center text-xs text-white/70 mt-6", children: "Todos los datos se guardan localmente en este navegador." })] })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CITAS_INICIALES, MEDICOS_INICIALES } from "../data/seed";
import { useLocalStorage } from "../lib/storage";
import { Shell } from "./Shell";
import { Dashboard } from "./Dashboard";
import { AgendarCita } from "./AgendarCita";
import { ListaCitas } from "./ListaCitas";
import { DirectorioMedicos } from "./DirectorioMedicos";
export function RecepcionistaPanel({ usuario, onLogout }) {
    const [tab, setTab] = useState("dashboard");
    const [citas, setCitas] = useLocalStorage("hsr_citas", CITAS_INICIALES);
    const [medicos, setMedicos] = useLocalStorage("hsr_medicos", MEDICOS_INICIALES);
    const [filtroEsp, setFiltroEsp] = useState("");
    const [filtroMed, setFiltroMed] = useState("");
    const tabs = [
        { id: "dashboard", label: "Panel principal" },
        { id: "agendar", label: "Agendar cita" },
        { id: "citas", label: "Citas" },
        { id: "medicos", label: "Directorio de médicos" },
    ];
    const cambiarEstado = (id, estado) => setCitas((p) => p.map((c) => (c.id === id ? { ...c, estado } : c)));
    const eliminar = (id) => setCitas((p) => p.filter((c) => c.id !== id));
    const editar = (c) => {
        const nombre = prompt("Editar nombre del paciente:", c.pacienteNombre);
        if (nombre === null)
            return;
        const telefono = prompt("Editar teléfono:", c.telefono);
        const motivo = prompt("Editar motivo:", c.motivo);
        setCitas((p) => p.map((x) => x.id === c.id ? { ...x, pacienteNombre: nombre || x.pacienteNombre, telefono: telefono ?? x.telefono, motivo: motivo ?? x.motivo } : x));
    };
    const guardarMedico = (m) => {
        setMedicos((p) => {
            const existe = p.some((x) => x.id === m.id);
            return existe ? p.map((x) => (x.id === m.id ? m : x)) : [...p, m];
        });
    };
    return (_jsxs(Shell, { usuario: usuario, onLogout: onLogout, tabs: tabs, activeTab: tab, onTabChange: setTab, children: [tab === "dashboard" && (_jsx(Dashboard, { citas: citas, medicos: medicos, filtroEsp: filtroEsp, setFiltroEsp: setFiltroEsp, filtroMed: filtroMed, setFiltroMed: setFiltroMed })), tab === "agendar" && _jsx(AgendarCita, { citas: citas, medicos: medicos, onCrear: (c) => setCitas((p) => [c, ...p]) }), tab === "citas" && (_jsx(ListaCitas, { citas: citas, onCambiarEstado: cambiarEstado, onEliminar: eliminar, onEditar: editar })), tab === "medicos" && _jsx(DirectorioMedicos, { medicos: medicos, onGuardar: guardarMedico })] }));
}

export type Rol = "recepcionista" | "medico";

export type EstadoCita =
  | "Programada"
  | "Confirmada"
  | "En Sala de Espera"
  | "Atendida"
  | "Cancelada";

export interface Usuario {
  id: string;
  nombre: string;
  rol: Rol;
  medicoId?: string;
}

export interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
  diasConsulta: string[];
  consultorio: string;
}

export interface Cita {
  id: string;
  pacienteNombre: string;
  cedula: string;
  edad: string;
  telefono: string;
  motivo: string;
  especialidad: string;
  medicoId: string;
  medicoNombre: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
  consultorio: string;
  estado: EstadoCita;
  notaMedica?: string;
  createdAt: string;
}

export const ESPECIALIDADES: string[] = [
  "Cirugía General",
  "Traumatología",
  "Cardiología",
  "Medicina Interna",
  "Otorrinolaringología (Otorrino)",
  "Niño Sano",
  "Psicología",
  "Psicopedagogía",
  "Ginecobstetricia",
];

export const ESTADOS: EstadoCita[] = [
  "Programada",
  "Confirmada",
  "En Sala de Espera",
  "Atendida",
  "Cancelada",
];

export const DIAS_SEMANA: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

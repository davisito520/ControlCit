import { Cita, ESPECIALIDADES, Medico } from "../types";

export const USUARIOS: { id: string; nombre: string; rol: "recepcionista" | "medico"; medicoId?: string }[] = [
  { id: "u-recp", nombre: "David Lucena", rol: "recepcionista" },
  { id: "u-med1", nombre: "Dra. Patricia Núñez", rol: "medico", medicoId: "m11" },
];

function mkMedicos(): Medico[] {
  const datos: { nombre: string; dias: string[]; cons: string }[][] = [
    [
      { nombre: "Dr. Eduardo Vargas", dias: ["Lunes", "Miércoles", "Viernes"], cons: "101" },
      { nombre: "Dra. Sofía Ramírez", dias: ["Martes", "Jueves"], cons: "102" },
    ],
    [
      { nombre: "Dr. Manuel Castro", dias: ["Lunes", "Jueves"], cons: "201" },
      { nombre: "Dra. Lucía Fernández", dias: ["Martes", "Viernes"], cons: "202" },
    ],
    [
      { nombre: "Dr. Roberto Salinas", dias: ["Lunes", "Miércoles"], cons: "301" },
      { nombre: "Dra. Elena Paz", dias: ["Martes", "Jueves", "Viernes"], cons: "302" },
    ],
    [
      { nombre: "Dr. Javier Mendoza", dias: ["Lunes", "Martes", "Miércoles"], cons: "401" },
      { nombre: "Dra. Carla Quiroga", dias: ["Jueves", "Viernes"], cons: "402" },
    ],
    [
      { nombre: "Dr. Andrés Roca", dias: ["Lunes", "Viernes"], cons: "501" },
      { nombre: "Dra. Mariela Soto", dias: ["Martes", "Jueves"], cons: "502" },
    ],
    [
      { nombre: "Dra. Patricia Núñez", dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], cons: "601" },
      { nombre: "Dr. Hugo Beltrán", dias: ["Lunes", "Martes", "Jueves"], cons: "602" },
    ],
    [
      { nombre: "Lic. Daniela Vera", dias: ["Lunes", "Miércoles", "Viernes"], cons: "701" },
      { nombre: "Lic. Marcos Aguilar", dias: ["Martes", "Jueves"], cons: "702" },
    ],
    [
      { nombre: "Lic. Rosa Lima", dias: ["Lunes", "Martes", "Miércoles"], cons: "801" },
      { nombre: "Lic. Tomás Reyes", dias: ["Jueves", "Viernes"], cons: "802" },
    ],
    [
      { nombre: "Dra. Gabriela Flores", dias: ["Lunes", "Miércoles", "Viernes"], cons: "901" },
      { nombre: "Dr. Sergio Pinto", dias: ["Martes", "Jueves"], cons: "902" },
    ],
  ];

  const medicos: Medico[] = [];
  let id = 1;
  ESPECIALIDADES.forEach((esp, i) => {
    datos[i].forEach((d) => {
      medicos.push({
        id: `m${id}`,
        nombre: d.nombre,
        especialidad: esp,
        diasConsulta: d.dias,
        consultorio: d.cons,
      });
      id += 1;
    });
  });
  return medicos;
}

export const MEDICOS_INICIALES: Medico[] = mkMedicos();

export const CITAS_INICIALES: Cita[] = [];

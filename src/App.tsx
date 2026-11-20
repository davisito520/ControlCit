import { useState } from "react";
import { Usuario } from "./types";
import { Login } from "./components/Login";
import { RecepcionistaPanel } from "./components/RecepcionistaPanel";
import { MedicoPanel } from "./components/MedicoPanel";

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  if (usuario.rol === "recepcionista") {
    return <RecepcionistaPanel usuario={usuario} onLogout={() => setUsuario(null)} />;
  }

  return <MedicoPanel usuario={usuario} onLogout={() => setUsuario(null)} />;
}

export default App;

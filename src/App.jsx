import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Login } from "./components/Login";
import { RecepcionistaPanel } from "./components/RecepcionistaPanel";
import { MedicoPanel } from "./components/MedicoPanel";
function App() {
    const [usuario, setUsuario] = useState(null);
    if (!usuario) {
        return _jsx(Login, { onLogin: setUsuario });
    }
    if (usuario.rol === "recepcionista") {
        return _jsx(RecepcionistaPanel, { usuario: usuario, onLogout: () => setUsuario(null) });
    }
    return _jsx(MedicoPanel, { usuario: usuario, onLogout: () => setUsuario(null) });
}
export default App;

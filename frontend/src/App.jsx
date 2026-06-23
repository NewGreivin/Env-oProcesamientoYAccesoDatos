//VITE_API_URL=http://localhost:4000/api
//VITE_APP_NAME=Parqueo
//VITE_APP_VERSION=1.2.1

//Esto se encuentra dentro de .env de frontend

    //Comando usados para el frontend
      
      //npm create vite@lastest . -- --template react

      //Solucion error: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

      //npm install
      //npm install bootstrap
      //npm install bootstrap-icons
      //npm install react-router-dom

        //Correr: 
          //npm run dev


import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

//PARA POSTMAN {"placa": "123","tipo": "carro", "horas":3, "minutos":6}
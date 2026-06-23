import { useState } from "react";
import ParqueoForm from "../components/ParqueoForm";
import ResultadoCard from "../components/ResultadoCard";

export default function Home() {
  const [resultado, setResultado] = useState(null);

  return (
    <div className="container mt-5">

      <ParqueoForm
        onResultado={setResultado}
      />

      <ResultadoCard
        resultado={resultado}
      />

    </div>
  );
}
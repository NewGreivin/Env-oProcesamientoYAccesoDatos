import { useState } from "react";
import { calcularParqueo } from "../services/parqueoService";

export function useParqueoForm(onResultado) {
  const [form, setForm] = useState({
    placa: "",
    tipo: "carro",
    horas: "",
    minutos: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const resultado = await calcularParqueo(form);
      onResultado(resultado);
    } catch (err) {
      setError(err.message || "Error desconocido");
    }
  };

  return {
    form,
    error,
    handleChange,
    handleSubmit,
  };
}
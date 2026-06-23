const API_URL = `${import.meta.env.VITE_API_URL}/parqueo/calcular`;

async function manejarRespuesta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.error || "Ocurrió un error en la solicitud"
    );

    error.status = response.status;
    error.errores = data?.errores;

    throw error;
  }

  return data;
}

// POST /api/parqueo
export async function calcularParqueo(parqueoData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parqueoData),
  });

  return manejarRespuesta(response);
}
export function calcularCobro(req, res) {
  //Se desfragmenta el objeto JSON que se recibe del front-end, para obtener los valores de PLACA, TIPO, HORA y MINUTO
    const { placa, tipo, horas, minutos } = req.body; 

  //Validaciones para verificar que los valores esten llenos
  if (!placa || placa.trim() === "") {//Si la placa no se encuentra, se devuelve un error 400
    return res.status(400).json({//Si alguno de los valores no se encuentra, se devuelve un error 400
      error: "Falta la placa",
    });
  }

  if (!tipo || (tipo !== "carro" && tipo !== "moto")) {
    return res.status(400).json({
      error: "Falta el dato del tipo o el tipo no es valido debe de ser (carro o moto)",
    });
  }

  if (Number.isNaN(horas) || horas < 0 || horas > 24) {
    return res.status(400).json({
      error: "Falta la hora o la cantidad de horas no es valida rango entre (0 y 24)",
    });
  }

  if (Number.isNaN(minutos) || minutos < 0 || minutos > 59) {
    return res.status(400).json({
      error: "Falta los minutos o los minutos no son validos rango entre (0 y 59)",
    });
  }

  const tarifa = tipo === "carro" ? 1200 : 500; //Se calcula la tarifa del carro o del moto, dependiendo del tipo, si es moto se devuelve 500

  let h = Number(horas);
  let m = Number(minutos);

  if (m > 5) h++;

  const total = h * tarifa;

  res.json({
    placa: placa,
    tipo: tipo,
    tarifa: tarifa,
    tiempoUso: `${horas}:${minutos}`,
    horasCobradas: h,
    total: total,
  });
}

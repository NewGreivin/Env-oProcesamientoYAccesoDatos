export default function ResultadoCard({ resultado }) {
  if (!resultado) return null;

  return (
    <div className="card mt-4 shadow">
      <div className="card-header bg-success text-white">
        Resultado del Cobro
      </div>

      <div className="card-body">

        <p>
          <strong>Placa:</strong> {resultado.placa}
        </p>

        <p>
          <strong>Tipo:</strong> {resultado.tipo}
        </p>

        <p>
          <strong>Tarifa:</strong> ₡{resultado.tarifa}
        </p>

        <p>
          <strong>Tiempo:</strong> {resultado.tiempoUso}
        </p>

        <p>
          <strong>Horas cobradas:</strong> {resultado.horasCobradas}
        </p>

        <h4 className="text-primary">
          Total: ₡{resultado.total}
        </h4>

      </div>
    </div>
  );
}
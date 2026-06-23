import { useParqueoForm } from "../hooks/useParqueoForm";

export default function ParqueoForm({ onResultado }) {
  const {form, error, handleChange, handleSubmit} = useParqueoForm(onResultado);

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 shadow"
    >
      <h3 className="mb-3">
        <i className="bi bi-calculator me-2"></i>
        Calcular Cobro
      </h3>

      <div className="mb-3">
        <label className="form-label">
          Placa
        </label>

        <input
          type="text"
          name="placa"
          className="form-control"
          value={form.placa}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Tipo
        </label>

        <select
          name="tipo"
          className="form-select"
          value={form.tipo}
          onChange={handleChange}
        >
          <option value="carro">
            Carro
          </option>

          <option value="moto">
            Moto
          </option>
        </select>
      </div>

      <div className="row">

        <div className="col-md-6">
          <label className="form-label">
            Horas
          </label>

          <input
            type="number"
            name="horas"
            className="form-control"
            value={form.horas}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Minutos
          </label>

          <input
            type="number"
            name="minutos"
            className="form-control"
            value={form.minutos}
            onChange={handleChange}
          />
        </div>

      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        type="submit"
      >
        <i className="bi bi-send-fill me-2"></i>
        Calcular
      </button>
    </form>
  );
}
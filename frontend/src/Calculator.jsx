import { useState } from "react";

const OPERATIONS = [
  { value: "add", label: "Suma (+)" },
  { value: "sub", label: "Resta (-)" },
  { value: "mul", label: "Multiplicación (×)" },
  { value: "div", label: "División (÷)" },
];

export default function Calculator() {
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setError(null);
    setResult(null);

    if (operandA === "" || operandB === "") {
      setError("Por favor completá ambos campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operand_a: parseFloat(operandA),
          operand_b: parseFloat(operandB),
          operation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Error al calcular.");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Calculadora</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Operando A</label>
        <br />
        <input
          type="number"
          value={operandA}
          onChange={(e) => setOperandA(e.target.value)}
          placeholder="Ej: 10"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Operación</label>
        <br />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          {OPERATIONS.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Operando B</label>
        <br />
        <input
          type="number"
          value={operandB}
          onChange={(e) => setOperandB(e.target.value)}
          placeholder="Ej: 5"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={loading}
        style={{ width: "100%", padding: 10, background: "#0052cc", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
      >
        {loading ? "Calculando..." : "Calcular"}
      </button>

      {result !== null && (
        <div style={{ marginTop: 16, padding: 12, background: "#e3fcef", borderRadius: 4 }}>
          <strong>Resultado:</strong> {result}
        </div>
      )}

      {error && (
        <div style={{ marginTop: 16, padding: 12, background: "#ffebe6", borderRadius: 4, color: "#c00" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

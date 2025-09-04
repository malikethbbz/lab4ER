import { useState, useEffect } from "react";
import "./styles.css"; // importa los estilos

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default function App() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useFetch(
    `https://eldenring.fanapis.com/api/bosses?limit=12&page=${page}`
  );

  return (
    <div className="app">
      <h1 className="title">Elden Ring Bosses</h1>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid">
        {data?.data?.map(boss => (
          <div key={boss.id} className="card">
            <div className="img-container">
              {boss.image ? (
                <img src={boss.image} alt={boss.name} />
              ) : (
                <p className="no-img">Sin imagen</p>
              )}
            </div>
            <h3>{boss.name}</h3>
            <p>{boss.location || "Ubicación desconocida"}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
          ← Anterior
        </button>
        <span>Página {page + 1}</span>
        <button onClick={() => setPage(p => p + 1)}>Siguiente →</button>
      </div>
    </div>
  );
}

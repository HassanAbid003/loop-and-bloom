import { useEffect, useState } from "react";
import { productsApi } from "../lib/api";

export function useProducts(params = {}) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await productsApi.list(params);
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (err) {
        if (!cancelled)
          setState({ data: null, loading: false, error: err.message });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  return state;
}
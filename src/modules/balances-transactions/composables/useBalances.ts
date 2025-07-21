import ApiService from "@/core/services/ApiService";
import type { Balance } from "@/types/belvo";
import { useBalanceStore } from "../stores/balanceStore";
import { useQuery } from "@tanstack/vue-query";

/**
 * Composable para obtener y gestionar los balances usando Tanstack Query.
 */
export function useBalances() {
  const balanceStore = useBalanceStore();

  /**
   * Función para obtener los balances de la API.
   * @returns {Promise<Balance[]>} Una promesa que resuelve con la lista de balances.
   */
  const fetchBalances = async (): Promise<Balance[]> => {
    const { data } = await ApiService.vueInstance.axios.get<Balance[]>(
      "belvo/balances"
    );
    balanceStore.setBalances(data); // Actualiza el store de Pinia
    return data;
  };

  /**
   * Hook de Tanstack Query para consultar los balances.
   */
  const { data, isLoading, isError, error } = useQuery<Balance[], Error>({
    queryKey: ["balances"],
    queryFn: fetchBalances,
  });

  return {
    balances: data,
    isLoading,
    isError,
    error,
    balanceStore, // Exponer el store de Pinia si es necesario
  };
}

import ApiService from "@/core/services/ApiService";
import type { Transaction } from "@/types/belvo";
import { useQuery } from "@tanstack/vue-query";
import { useTransactionStore } from "../stores/transactionStore";

/**
 * Composable para obtener y gestionar las transacciones usando Tanstack Query.
 */
export function useTransactions() {
  const transactionStore = useTransactionStore();

  /**
   * Función para obtener las transacciones de la API.
   * @returns {Promise<Transaction[]>} Una promesa que resuelve con la lista de transacciones.
   */
  const fetchTransactions = async (): Promise<Transaction[]> => {
    const { data } = await ApiService.vueInstance.axios.get<Transaction[]>(
      "belvo/transactions"
    );
    transactionStore.setTransactions(data); // Actualiza el store de Pinia
    return data;
  };

  /**
   * Hook de Tanstack Query para consultar las transacciones.
   */
  const { data, isLoading, isError, error } = useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return {
    transactions: data,
    isLoading,
    isError,
    error,
    transactionStore, // Exponer el store de Pinia si es necesario
  };
}

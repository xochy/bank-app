import ApiService from "@/core/services/ApiService";
import type { Account } from "@/types/belvo";
import { useAccountStore } from "../stores/accountStore";
import { useQuery } from "@tanstack/vue-query";

/**
 * Composable para obtener y gestionar las cuentas usando Tanstack Query.
 */
export function useAccounts() {
  const accountStore = useAccountStore();

  /**
   * Función para obtener las cuentas de la API.
   * @returns {Promise<Account[]>} Una promesa que resuelve con la lista de cuentas.
   */
  const fetchAccounts = async (): Promise<Account[]> => {
    const { data } = await ApiService.vueInstance.axios.get<Account[]>(
      "belvo/accounts"
    );
    accountStore.setAccounts(data); // Actualiza el store de Pinia
    return data;
  };

  /**
   * Hook de Tanstack Query para consultar las cuentas.
   */
  const { data, isLoading, isError, error } = useQuery<Account[], Error>({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  return {
    accounts: data,
    isLoading,
    isError,
    error,
    accountStore, // Exponer el store de Pinia si es necesario
  };
}

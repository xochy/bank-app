import ApiService from "@/core/services/ApiService";
import type { Institution } from "@/types/belvo";
import { useInstitutionStore } from "../stores/institutionStore";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

/**
 * Composable para obtener y gestionar las instituciones usando Tanstack Query.
 */
export function useInstitutions() {
  const institutionStore = useInstitutionStore();
  const queryClient = useQueryClient();

  /**
   * Función para obtener las instituciones de la API.
   * @returns {Promise<Institution[]>} Una promesa que resuelve con la lista de instituciones.
   */
  const fetchInstitutions = async (): Promise<Institution[]> => {
    const { data } = await ApiService.vueInstance.axios.get<Institution[]>(
      "belvo/institutions"
    );
    institutionStore.setInstitutions(data); // Actualiza el store de Pinia
    return data;
  };

  /**
   * Hook de Tanstack Query para consultar las instituciones.
   */
  const { data, isLoading, isError, error } = useQuery<Institution[], Error>({
    queryKey: ["institutions"],
    queryFn: fetchInstitutions,
  });

  const refetchInstitutions = async () =>
    queryClient.invalidateQueries({
      queryKey: ["institutions"],
    });

  return {
    institutions: data,
    isLoading,
    isError,
    error,
    institutionStore, // Exponer el store de Pinia si es necesario acceder directamente a él
    refetchInstitutions, // Función para volver a consultar las instituciones
  };
}

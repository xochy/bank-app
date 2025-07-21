import { defineStore } from "pinia";
import type { Institution } from "@/types/belvo";

interface InstitutionState {
  institutions: Institution[];
}

/**
 * Store de Pinia para gestionar el estado de las instituciones.
 */
export const useInstitutionStore = defineStore("institution", {
  state: (): InstitutionState => ({
    institutions: [],
  }),
  actions: {
    /**
     * Establece la lista de instituciones en el store.
     * @param institutions La lista de instituciones a establecer.
     */
    setInstitutions(institutions: Institution[]) {
      this.institutions = institutions;
    },
  },
  getters: {
    /**
     * Obtiene todas las instituciones del store.
     * @returns {Institution[]} La lista de instituciones.
     */
    getAllInstitutions: (state) => state.institutions,
  },
});

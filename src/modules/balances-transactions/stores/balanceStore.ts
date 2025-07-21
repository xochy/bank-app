import { defineStore } from "pinia";
import type { Balance } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta

interface BalanceState {
  balances: Balance[];
  selectedBalanceId: string | null;
}

/**
 * Store de Pinia para gestionar el estado de los balances.
 */
export const useBalanceStore = defineStore("balance", {
  state: (): BalanceState => ({
    balances: [],
    selectedBalanceId: null,
  }),
  actions: {
    /**
     * Establece la lista de balances en el store.
     * @param balances La lista de balances a establecer.
     */
    setBalances(balances: Balance[]) {
      this.balances = balances;
    },
    /**
     * Establece el ID del balance seleccionado.
     * @param balanceId El ID del balance seleccionado.
     */
    setSelectedBalanceId(balanceId: string | null) {
      this.selectedBalanceId = balanceId;
    },
  },
  getters: {
    /**
     * Obtiene todos los balances del store.
     * @returns {Balance[]} La lista de balances.
     */
    getAllBalances: (state) => state.balances,
    /**
     * Obtiene el balance seleccionado.
     * @returns {Balance | undefined} El balance seleccionado o undefined si no hay ninguno.
     */
    getSelectedBalance: (state) =>
      state.balances.find((balance) => balance.id === state.selectedBalanceId),
  },
});

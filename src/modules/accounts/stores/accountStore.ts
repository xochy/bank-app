import { defineStore } from "pinia";
import type { Account } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta

interface AccountState {
  accounts: Account[];
  selectedAccountId: string | null;
}

/**
 * Store de Pinia para gestionar el estado de las cuentas.
 */
export const useAccountStore = defineStore("account", {
  state: (): AccountState => ({
    accounts: [],
    selectedAccountId: null,
  }),
  actions: {
    /**
     * Establece la lista de cuentas en el store.
     * @param accounts La lista de cuentas a establecer.
     */
    setAccounts(accounts: Account[]) {
      this.accounts = accounts;
    },
    /**
     * Establece el ID de la cuenta seleccionada.
     * @param accountId El ID de la cuenta seleccionada.
     */
    setSelectedAccountId(accountId: string | null) {
      this.selectedAccountId = accountId;
    },
  },
  getters: {
    /**
     * Obtiene todas las cuentas del store.
     * @returns {Account[]} La lista de cuentas.
     */
    getAllAccounts: (state) => state.accounts,
    /**
     * Obtiene la cuenta seleccionada.
     * @returns {Account | undefined} La cuenta seleccionada o undefined si no hay ninguna.
     */
    getSelectedAccount: (state) =>
      state.accounts.find((account) => account.id === state.selectedAccountId),
  },
});

import { defineStore } from "pinia";
import type { Transaction } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta

interface TransactionState {
  transactions: Transaction[];
}

/**
 * Store de Pinia para gestionar el estado de las transacciones.
 */
export const useTransactionStore = defineStore("transaction", {
  state: (): TransactionState => ({
    transactions: [],
  }),
  actions: {
    /**
     * Establece la lista de transacciones en el store.
     * @param transactions La lista de transacciones a establecer.
     */
    setTransactions(transactions: Transaction[]) {
      this.transactions = transactions;
    },
  },
  getters: {
    /**
     * Obtiene todas las transacciones del store.
     * @returns {Transaction[]} La lista de transacciones.
     */
    getAllTransactions: (state) => state.transactions,
    /**
     * Filtra las transacciones por un ID de cuenta específico.
     * @param accountId El ID de la cuenta para filtrar.
     * @returns {Transaction[]} Las transacciones asociadas a la cuenta.
     */
    getTransactionsByAccountId: (state) => (accountId: string) => {
      return state.transactions.filter(
        (transaction) => transaction.account.id === accountId
      );
    },
  },
});

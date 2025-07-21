<template>
  <div class="accounts-container p-4">
    <h1 class="text-2xl font-bold mb-6">Cuentas</h1>

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <p class="ml-2">Cargando cuentas...</p>
    </div>

    <div v-else-if="isError" class="text-center text-red-500">
      <p>Error al cargar las cuentas: {{ error?.message }}</p>
    </div>

    <div
      v-else-if="accounts && accounts.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @select="handleSelectAccount"
      />
    </div>

    <div v-else class="text-center text-gray-600">
      <p>No se encontraron cuentas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAccounts } from "../composables/useAccounts";
import { useAccountStore } from "../stores/accountStore";
import AccountCard from "../components/AccountCard.vue";

const router = useRouter();
const accountStore = useAccountStore();
const { accounts, isLoading, isError, error } = useAccounts();

/**
 * Maneja la selección de una cuenta y redirige a la vista de balances y transacciones.
 * @param accountId El ID de la cuenta seleccionada.
 */
const handleSelectAccount = (accountId: string) => {
  console.log("Cuenta seleccionada:", accountId);
  accountStore.setSelectedAccountId(accountId); // Guarda el ID de la cuenta seleccionada en Pinia
  router.push({ name: "BalancesTransactions" });
};
</script>

<style scoped>
.accounts-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<template>
  <div class="balances-transactions-container p-4">
    <h1 class="text-2xl font-bold mb-6">Balances y Transacciones</h1>

    <div
      v-if="isLoadingBalances || isLoadingTransactions"
      class="flex justify-center items-center h-40"
    >
      <p class="ml-2">Cargando balances y transacciones...</p>
    </div>

    <div
      v-else-if="isErrorBalances || isErrorTransactions"
      class="text-center text-red-500"
    >
      <p>Error al cargar: {{ errorBalances?.message || errorTransactions?.message }}</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sección de Balances -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Balances Disponibles</h2>
        <div v-if="balances && balances.length > 0">
          <el-collapse v-model="activeBalanceId" accordion>
            <el-collapse-item
              v-for="balance in balances"
              :key="balance.id"
              :name="balance.id"
            >
              <template #title>
                <BalanceCard
                  :balance="balance"
                  @select="handleSelectBalance"
                  class="w-full"
                />
              </template>
              <!-- Contenido del collapse: Tabla de Transacciones -->
              <div class="p-4">
                <TransactionTable :transactions="transactions ?? []" />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div v-else class="text-center text-gray-600">
          <p>No se encontraron balances para la cuenta seleccionada.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useBalances } from "../composables/useBalances";
import { useTransactions } from "../composables/useTransactions";
import { useAccountStore } from "@/modules/accounts/stores/accountStore"; // Asegúrate de que la ruta sea correcta
import BalanceCard from "../components/BalanceCard.vue";
import TransactionTable from "../components/TransactionTable.vue";
import { ElButton, ElCollapse, ElCollapseItem } from "element-plus";

const accountStore = useAccountStore();
const {
  balances,
  isLoading: isLoadingBalances,
  isError: isErrorBalances,
  error: errorBalances,
} = useBalances();
const {
  transactions,
  isLoading: isLoadingTransactions,
  isError: isErrorTransactions,
  error: errorTransactions,
} = useTransactions();

const activeBalanceId = ref<string>("");

/**
 * Filtra las transacciones basándose en la cuenta asociada al balance activo.
 * Asume que las transacciones tienen un `account.id` y que los balances también están relacionados a una cuenta.
 * Para simplificar, si un balance se selecciona, mostramos las transacciones de la `account_id` de ese balance.
 */
const filteredTransactions = computed(() => {
  if (!activeBalanceId.value || !transactions.value) {
    return [];
  }
  const selectedBalance = balances.value?.find((b) => b.id === activeBalanceId.value);
  if (selectedBalance) {
    // Filtramos las transacciones por el account_id del balance seleccionado
    return transactions.value.filter((t) => t.account.id === selectedBalance.account_id);
  }
  return [];
});

/**
 * Maneja la selección de un balance, actualizando el ID del balance activo.
 * @param balanceId El ID del balance seleccionado.
 */
const handleSelectBalance = (balanceId: string) => {
  // El `el-collapse` ya maneja `activeBalanceId` automáticamente.
  // Esta función es más para depuración o lógica adicional si fuera necesaria.
  console.log("Balance seleccionado:", balanceId);
};

// Observa el cambio en los balances y si hay uno, lo abre por defecto
watchEffect(() => {
  if (balances.value && balances.value.length > 0 && !activeBalanceId.value) {
    activeBalanceId.value = balances.value[0].id ?? ""; // Abre el primer balance por defecto, asegura string
  }
});
</script>

<style scoped>
.balances-transactions-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Ajustes para que la tarjeta de balance se vea bien dentro del título del collapse */
.el-collapse-item__header {
  height: auto !important; /* Permite que el contenido determine la altura */
  line-height: normal !important; /* Resetea el line-height por defecto */
  padding: 0 !important; /* Elimina padding interno del header */
}

.el-collapse-item__header.is-active {
  border-bottom-color: transparent !important; /* Evita doble borde */
}

.el-collapse-item__wrap {
  border-bottom: 1px solid var(--el-collapse-border-color); /* Mantiene el borde inferior del wrap */
}
</style>

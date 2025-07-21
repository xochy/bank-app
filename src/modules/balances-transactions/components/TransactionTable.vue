<template>
  <div class="transaction-table-container">
    <h3 class="text-xl font-bold mb-4">Transacciones de la Cuenta</h3>
    <el-table :data="transactions" style="width: 100%" border stripe>
      <el-table-column prop="value_date" label="Fecha" width="120"></el-table-column>
      <el-table-column prop="description" label="Descripción"></el-table-column>
      <el-table-column prop="amount" label="Monto" width="120">
        <template #default="scope">
          <span
            :class="{
              'text-green-600': scope.row.type === 'INFLOW',
              'text-red-600': scope.row.type === 'OUTFLOW',
            }"
          >
            {{ scope.row.amount }} {{ scope.row.currency }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Tipo" width="100"></el-table-column>
      <el-table-column prop="category" label="Categoría" width="150"></el-table-column>
      <el-table-column prop="status" label="Estado" width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 'PROCESSED' ? 'success' : 'info'"
            size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="transactions.length === 0" class="text-center text-gray-500 mt-4">
      No hay transacciones para esta cuenta.
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Transaction } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta
import { ElTable, ElTableColumn, ElTag } from "element-plus";

const props = defineProps<{
  transactions: Transaction[];
}>();
</script>

<style scoped>
.transaction-table-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Estilos para el texto de monto */
.text-green-600 {
  color: #28a745; /* Verde para ingresos */
}

.text-red-600 {
  color: #dc3545; /* Rojo para egresos */
}
</style>

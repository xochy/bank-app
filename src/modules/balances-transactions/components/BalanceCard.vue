<template>
  <el-card class="balance-card" shadow="hover" @click="selectBalance">
    <div class="card-content">
      <div class="balance-info">
        <h3>Balance ID: {{ balance.id.substring(0, 8) }}...</h3>
        <p class="text-sm text-gray-600">
          Cuenta ID: {{ balance.account_id.substring(0, 8) }}...
        </p>
        <p class="text-lg font-bold mt-2">
          {{ balance.available }} {{ balance.currency }}
        </p>
        <p class="text-xs text-gray-500">
          Bloqueado: {{ balance.blocked }} {{ balance.currency }}
        </p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Balance } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta
import { ElCard } from "element-plus";

const props = defineProps<{
  balance: Balance;
}>();

const emit = defineEmits(["select"]);

/**
 * Emite un evento cuando la tarjeta del balance es seleccionada.
 */
const selectBalance = () => {
  emit("select", props.balance.id);
};
</script>

<style scoped>
.balance-card {
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

.balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-content {
  padding: 10px;
}

.balance-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1em;
  color: #333;
}

.balance-info p {
  margin: 0;
  line-height: 1.3;
}
</style>

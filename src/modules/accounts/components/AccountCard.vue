<template>
  <el-card class="account-card" shadow="hover" @click="selectAccount">
    <div class="card-content">
      <div class="account-icon">
        <i class="el-icon-bank-card"></i>
        <!-- Icono genérico, puedes usar uno más específico si Element Plus lo tiene -->
      </div>
      <div class="account-details">
        <h3>{{ account.name }}</h3>
        <p class="text-sm text-gray-600">No. {{ account.number }}</p>
        <p class="text-lg font-bold mt-2">
          {{ account.balance.current }} {{ account.currency }}
        </p>
        <p class="text-xs text-gray-500">
          Disponible: {{ account.balance.available }} {{ account.currency }}
        </p>
        <el-tag size="small" class="mt-2"
          >{{ account.category }} - {{ account.type }}</el-tag
        >
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Account } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta
import { ElCard, ElTag } from "element-plus";

const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits(["select"]);

/**
 * Emite un evento cuando la tarjeta de la cuenta es seleccionada.
 */
const selectAccount = () => {
  emit("select", props.account.id);
};
</script>

<style scoped>
.account-card {
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

.account-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: flex-start;
  padding: 15px;
}

.account-icon {
  font-size: 2.5em;
  margin-right: 15px;
}

.account-details {
  flex-grow: 1;
}

h3 {
  margin: 0 0 5px 0;
  font-size: 1.2em;
}

p {
  margin: 0;
  line-height: 1.4;
}
</style>
